import "server-only";
import { readCollection, writeCollection } from "@/server/database/json-store";

const FILE_NAME = "blogs.json";

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeBlog(input, currentBlog) {
  const now = new Date().toISOString();
  const title = String(input.title || "").trim();
  const slug = slugify(input.slug || title);

  return {
    id: currentBlog?.id || input.id || `blog_${slug}`,
    title,
    slug,
    category: String(input.category || "General").trim(),
    author: String(input.author || "Persuekey Editorial").trim(),
    readTime: String(input.readTime || "3 min read").trim(),
    image: String(input.image || "").trim(),
    shortDescription: String(input.shortDescription || "").trim(),
    content: String(input.content || "").trim(),
    status: input.status === "Draft" ? "Draft" : "Published",
    createdAt: currentBlog?.createdAt || input.createdAt || now,
    updatedAt: now,
  };
}

export async function getAllBlogs() {
  const blogs = await readCollection(FILE_NAME, []);
  return [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getBlogBySlug(slug) {
  const blogs = await getAllBlogs();
  return blogs.find((blog) => blog.slug === slug) || null;
}

export async function createBlog(payload) {
  const blogs = await getAllBlogs();
  const blog = normalizeBlog(payload);

  if (blogs.some((item) => item.slug === blog.slug)) {
    throw new Error("A blog post with this slug already exists.");
  }

  const nextBlogs = [blog, ...blogs];
  await writeCollection(FILE_NAME, nextBlogs);
  return blog;
}

export async function updateBlog(slug, payload) {
  const blogs = await getAllBlogs();
  const currentBlog = blogs.find((item) => item.slug === slug);

  if (!currentBlog) {
    return null;
  }

  const merged = normalizeBlog({ ...currentBlog, ...payload }, currentBlog);

  if (blogs.some((item) => item.slug === merged.slug && item.id !== currentBlog.id)) {
    throw new Error("Another blog post already uses this slug.");
  }

  const nextBlogs = blogs.map((item) => (item.id === currentBlog.id ? merged : item));
  await writeCollection(FILE_NAME, nextBlogs);
  return merged;
}

export async function deleteBlog(slug) {
  const blogs = await getAllBlogs();
  const nextBlogs = blogs.filter((item) => item.slug !== slug);

  if (nextBlogs.length === blogs.length) {
    return false;
  }

  await writeCollection(FILE_NAME, nextBlogs);
  return true;
}
