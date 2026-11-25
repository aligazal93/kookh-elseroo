import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export class ImageUploadError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ImageUploadError";
  }
}

function detectImageExtension(bytes: Uint8Array) {
  const startsWith = (signature: number[]) =>
    signature.every((byte, index) => bytes[index] === byte);

  if (startsWith([0xff, 0xd8, 0xff])) return "jpg";
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "png";
  if (startsWith([0x47, 0x49, 0x46, 0x38])) return "gif";
  if (
    startsWith([0x52, 0x49, 0x46, 0x46]) &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }

  return null;
}

export async function saveUploadedImage(file: File) {
  if (!allowedMimeTypes.has(file.type)) {
    throw new ImageUploadError("Only JPG, PNG, WEBP and GIF images are allowed", 415);
  }

  if (file.size === 0) {
    throw new ImageUploadError("The selected image is empty", 400);
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new ImageUploadError("Image size must not exceed 5 MB", 413);
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const extension = detectImageExtension(bytes);

  if (!extension) {
    throw new ImageUploadError("The file content is not a supported image", 415);
  }

  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDirectory, { recursive: true });

  const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
  await writeFile(path.join(uploadDirectory, fileName), bytes, { flag: "wx" });

  return {
    url: `/uploads/${fileName}`,
    fileName,
    size: file.size,
    mimeType: file.type,
  };
}
