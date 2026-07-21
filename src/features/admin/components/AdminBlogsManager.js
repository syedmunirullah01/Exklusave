"use client";

import { useEffect, useState } from "react";
import { ConfirmModal } from "@/components/ui/AppModal";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

const initialForm = {
  title: "",
  slug: "",
  category: "Shopping Guide",
  author: "Persuekey Editorial",
  readTime: "4 min read",
  image: "",
  shortDescription: "",
  content: "",
  status: "Published",
};

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" className="stroke-current opacity-25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" className="stroke-current" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminBlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const response = await fetch("/api/blogs", { cache: "no-store" });
      const payload = await response.json();
      setBlogs(payload.data || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    let active = true;

    async function hydrate() {
      try {
        const response = await fetch("/api/blogs", { cache: "no-store" });
        const payload = await response.json();
        if (active) {
          setBlogs(payload.data || []);
        }
      } catch (e) {
        console.error(e);
      }
    }

    hydrate();

    return () => {
      active = false;
    };
  }, []);

  function handleOpenCreate() {
    setEditingBlog(null);
    setForm(initialForm);
    setError("");
    setOpen(true);
  }

  function handleOpenEdit(blog) {
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      slug: blog.slug,
      category: blog.category || "Shopping Guide",
      author: blog.author || "Persuekey Editorial",
      readTime: blog.readTime || "4 min read",
      image: blog.image || "",
      shortDescription: blog.shortDescription || "",
      content: blog.content || "",
      status: blog.status || "Published",
    });
    setError("");
    setOpen(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const nextState = { ...form, [name]: value };

    if (name === "title" && !editingBlog) {
      nextState.slug = slugify(value);
    }

    setForm(nextState);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const endpoint = editingBlog ? `/api/blogs/${editingBlog.slug}` : "/api/blogs";
    const method = editingBlog ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error || "Unable to save blog post.");
      setIsSubmitting(false);
      return;
    }

    await loadData();
    setOpen(false);
    setForm(initialForm);
    setEditingBlog(null);
    setIsSubmitting(false);
  }

  async function handleDeleteConfirmed() {
    if (!deleteTarget) return;

    setIsDeleting(true);
    const response = await fetch(`/api/blogs/${deleteTarget.slug}`, { method: "DELETE" });

    if (!response.ok) {
      setIsDeleting(false);
      return;
    }

    setDeleteTarget(null);
    setIsDeleting(false);
    await loadData();
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CardTitle>Blogs Management</CardTitle>
            <CardDescription>Create, edit, and publish promotional articles and shopping guides.</CardDescription>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-0"
              onClick={loadData}
              aria-label="Refresh blogs"
            >
              <RefreshIcon />
            </Button>
            <Button type="button" onClick={handleOpenCreate} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 shadow-xs">
              + Create New Blog
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50/80 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800">
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Blog Article</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Category</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Author</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Read Time</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">Status</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id || blog.slug} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition border-b border-zinc-100 dark:border-zinc-800/60">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-2xs">
                        {blog.image ? (
                          <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xs font-black text-zinc-600 dark:text-zinc-400">BLOG</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-900 dark:text-white text-xs truncate max-w-sm">{blog.title}</p>
                        <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">/{blog.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-block rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {blog.category || "General"}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {blog.author || "Editorial"}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    {blog.readTime || "3 min read"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        blog.status === "Published"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                      }`}
                    >
                      {blog.status || "Published"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 hover:border-emerald-600 transition"
                        onClick={() => handleOpenEdit(blog)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
                        onClick={() => setDeleteTarget(blog)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!blogs.length ? (
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 px-5 py-6 text-xs text-center text-zinc-500 dark:text-zinc-400">
              No blog articles created yet. Click "+ Create New Blog" to publish your first article.
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-zinc-900 dark:text-white">{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            <DialogDescription className="text-zinc-600 dark:text-zinc-400">Publish guides and savings tips to boost storefront SEO.</DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <label className="grid gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold md:col-span-2">
              Article Title
              <Input name="title" value={form.title} onChange={handleChange} placeholder="Top 10 Shopping Tips to Save Big in 2026" className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white" />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
              URL Slug
              <Input name="slug" value={form.slug} onChange={handleChange} placeholder="top-10-shopping-tips-2026" className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-mono" />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
              Category
              <Input name="category" value={form.category} onChange={handleChange} placeholder="Shopping Guide" className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white" />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
              Author
              <Input name="author" value={form.author} onChange={handleChange} placeholder="Persuekey Editorial" className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white" />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
              Read Time
              <Input name="readTime" value={form.readTime} onChange={handleChange} placeholder="5 min read" className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white" />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold md:col-span-2">
              Featured Cover Image URL
              <Input name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white" />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold md:col-span-2">
              Short Description / Teaser Summary
              <textarea
                name="shortDescription"
                rows={3}
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white outline-none transition placeholder:text-zinc-400 focus:border-emerald-600"
                placeholder="Short summary for the blog card on homepage."
              />
            </label>
            <label className="grid gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
              Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 text-xs text-zinc-900 dark:text-white outline-none focus:border-emerald-600"
              >
                <option>Published</option>
                <option>Draft</option>
              </select>
            </label>
            {error ? <p className="text-xs text-rose-600 md:col-span-2">{error}</p> : null}
            <div className="flex gap-3 md:col-span-2 md:justify-end pt-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" leadingIcon={isSubmitting ? <Spinner /> : null}>
                {isSubmitting ? "Publishing..." : editingBlog ? "Update Blog" : "Publish Blog"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete blog article"
        description={deleteTarget ? `Delete "${deleteTarget.title}" permanently?` : ""}
        confirmLabel="Delete Article"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirmed}
        isSubmitting={isDeleting}
      />
    </>
  );
}
