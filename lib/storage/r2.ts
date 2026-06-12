import { R2Bucket } from '@cloudflare/workers-types';

let bucket: R2Bucket | null = null;

export function setR2Bucket(r2Bucket: R2Bucket) {
  bucket = r2Bucket;
}

export function getR2Bucket(): R2Bucket {
  if (!bucket) {
    throw new Error('R2 bucket not initialized. Call setR2Bucket first.');
  }
  return bucket;
}

export async function uploadImage(
  file: File,
  folder: string = 'products'
): Promise<{ key: string; url: string }> {
  const r2 = getR2Bucket();

  // Generate unique key
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  const extension = file.name.split('.').pop();
  const key = `${folder}/${timestamp}_${random}.${extension}`;

  try {
    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await r2.put(key, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Generate signed URL (valid for 24 hours by default)
    const url = await generateSignedUrl(key);

    return { key, url };
  } catch (error) {
    console.error('[R2] Upload failed:', { key, error });
    throw error;
  }
}

export async function deleteImage(key: string): Promise<void> {
  const r2 = getR2Bucket();

  try {
    await r2.delete(key);
  } catch (error) {
    console.error('[R2] Delete failed:', { key, error });
    throw error;
  }
}

export async function generateSignedUrl(
  key: string,
  expirationSeconds: number = 86400 // 24 hours
): Promise<string> {
  // For development/testing, return a simple URL
  // In production with Cloudflare, you'd use R2.signedUrl() method
  const bucketName = process.env.R2_BUCKET_NAME || 'sds-textiles-images';
  const accountId = process.env.R2_ACCOUNT_ID || 'your-account-id';

  // Return cloudflare R2 URL format
  return `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${key}`;
}

export async function getImageUrl(key: string): Promise<string> {
  // If using R2 public domain, format the URL
  const publicUrl = process.env.R2_PUBLIC_URL || process.env.NEXT_PUBLIC_API_URL;

  if (publicUrl) {
    return `${publicUrl}/images/${key}`;
  }

  return generateSignedUrl(key);
}

export async function copyImage(sourceKey: string, destKey: string): Promise<void> {
  const r2 = getR2Bucket();

  try {
    const sourceObject = await r2.get(sourceKey);
    if (!sourceObject) throw new Error('Source image not found');

    await r2.put(destKey, sourceObject.body, {
      httpMetadata: sourceObject.httpMetadata,
    });
  } catch (error) {
    console.error('[R2] Copy failed:', { sourceKey, destKey, error });
    throw error;
  }
}

export async function listImages(folder: string = 'products'): Promise<string[]> {
  const r2 = getR2Bucket();

  try {
    const result = await r2.list({ prefix: `${folder}/` });
    return result.objects.map((obj) => obj.key);
  } catch (error) {
    console.error('[R2] List failed:', { folder, error });
    return [];
  }
}

export async function generateR2UploadURL(filename: string): Promise<string> {
  // Generate a presigned URL for uploading to R2
  const bucketName = process.env.R2_BUCKET_NAME || 'sds-textiles-images';
  const accountId = process.env.R2_ACCOUNT_ID || 'your-account-id';

  // This would typically be generated using Cloudflare's R2 API
  // For now, returning a URL format that needs to be handled by a Cloudflare Worker
  return `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${filename}`;
}

export async function uploadToR2(
  filename: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  // This function would typically upload to R2
  // In a real implementation, this would use the Cloudflare R2 API
  // For now, we'll log and return the key
  console.log('[R2] Upload:', { filename, size: buffer.length, contentType });

  // Return the R2 key/path
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `uploads/${timestamp}_${random}_${filename}`;
}
