export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email) {
      return Response.json(
        {
          success: false,
          message: "Name and email are required",
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Data received successfully",
        data: {
          name: body.name,
          email: body.email,
        },
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      {
        success: false,
        message: "Request body must be valid JSON",
      },
      { status: 400 },
    );
  }
}
