export async function GET() {
  return Response.json({
    success: true,
    message: "Next.js backend is working",
    timestamp: new Date().toISOString(),
  });
}
