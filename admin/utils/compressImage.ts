import imageCompression from "browser-image-compression";

const MAX_COMPRESSED_SIZE_MB = 4.5;

/** Compresses images in the browser while keeping their original dimensions. */
export async function compressImageForUpload(file: File) {
  // SVG is vector and WebP is already the target format, so neither needs a
  // format conversion. JPG/JPEG/PNG and other raster images become WebP.
  if (file.type === "image/svg+xml" || file.type === "image/webp") return file;

  const compressed = await imageCompression(file, {
    maxSizeMB: MAX_COMPRESSED_SIZE_MB,
    maxWidthOrHeight: 10000,
    initialQuality: 0.82,
    useWebWorker: true,
    fileType: "image/webp",
  });

  return new File([compressed], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
    type: "image/webp",
    lastModified: file.lastModified,
  });
}
