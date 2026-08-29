import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Compresses an image file in the browser using HTML5 Canvas
 * Reduces large 5MB+ photos down to ~150-250KB JPEG/WEBP
 */
export async function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file); // fallback to original
          return;
        }

        // Smooth image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Uploads a memory photo to Supabase Storage Bucket ('couple-memories')
 * or returns a compressed Base64 data URL for offline / local mode.
 */
export async function uploadMemoryPhoto(
  file: File,
  coupleId = 'demo-couple'
): Promise<string> {
  try {
    const compressedBlob = await compressImage(file);

    // If Supabase is configured, upload to bucket
    if (isSupabaseConfigured) {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${coupleId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('couple-memories')
        .upload(fileName, compressedBlob, {
          contentType: 'image/jpeg',
          cacheControl: '3600',
          upsert: false,
        });

      if (!error && data) {
        const { data: publicData } = supabase.storage
          .from('couple-memories')
          .getPublicUrl(fileName);
        return publicData.publicUrl;
      }
    }

    // Graceful offline fallback: convert compressed blob to Base64 data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(compressedBlob);
    });
  } catch (err) {
    console.warn('Image upload fallback triggered:', err);
    // Return placeholder
    return URL.createObjectURL(file);
  }
}
