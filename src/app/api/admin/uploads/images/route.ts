import { NextRequest, NextResponse } from "next/server";

import {
  ImageUploadError,
  saveUploadedImage,
} from "@/features/uploads/image-upload.service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { success: false, message: "An image file is required" },
        { status: 400 },
      );
    }

    const data = await saveUploadedImage(image);
    return NextResponse.json(
      { success: true, message: "Image uploaded", data },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ImageUploadError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status },
      );
    }

    console.error("Image upload failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to upload image" },
      { status: 500 },
    );
  }
}
