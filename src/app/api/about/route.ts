import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.aboutKookh.findMany();
  return  NextResponse.json({
  success: true,
  message: "Data Fetched",
  data: items,
});
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      !body.locale ||
      !body.title ||
      !body.text ||
      !body.description ||
      !body.image
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "كل الحقول المطلوبة لازم تتبعت",
        },
        { status: 400 },
      );
    }

    const item = await prisma.aboutKookh.create({
      data: {
        locale: body.locale,
        title: body.title,
        text: body.text,
        description: body.description,
        image: body.image,
        videoYoutube: body.videoYoutube || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data Created",
        data: item,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "يوجد محتوى بهذه اللغة بالفعل",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ أثناء إضافة البيانات",
      },
      { status: 500 },
    );
  }
}