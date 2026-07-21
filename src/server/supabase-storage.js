import "server-only";
import { supabase } from "@/lib/supabase";

/**
 * Uploads an image buffer to a Supabase Storage bucket.
 * @param {Buffer} buffer The file buffer.
 * @param {string} path The destination file path in the bucket (e.g. "stores/my-store.png").
 * @param {string} contentType The mime type of the file.
 * @returns {Promise<{public_id: string, secure_url: string}>}
 */
export async function uploadImageBufferToSupabase(buffer, path, contentType) {
  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  // Upload file to bucket 'persuekey'
  const { data, error } = await supabase.storage
    .from("persuekey")
    .upload(path, buffer, {
      contentType: contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Supabase Storage upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("persuekey")
    .getPublicUrl(path);

  return {
    public_id: data.path,
    secure_url: urlData.publicUrl,
  };
}
