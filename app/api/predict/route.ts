import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  const mode = formData.get("mode");

  if (!file || !(file instanceof File) || !mode) {
    return NextResponse.json(
      { error: "file and mode are required" },
      { status: 400 }
    );
  }

  const backendForm = new FormData();
  backendForm.append("file", file);
  backendForm.append("mode", String(mode));

  // 👇 This talks to your Python backend
  const res = await fetch("http://localhost:8000/predict", {
    method: "POST",
    body: backendForm,
  });

  const data = await res.json();
  return NextResponse.json(data);
}
