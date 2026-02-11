/* eslint-disable */
import { generateResponse } from "@/lib/services/species-chat";
import { NextResponse } from "next/server";

// TODO: Implement this file
export async function POST(req: Request) {
  // 400 is for invalid or missing body and 502 is for upstream provider error
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("message" in body) ||
    typeof (body as { message: unknown }).message !== "string"
  ) {
    return NextResponse.json({ error: "Request body must be { message: string }." }, { status: 400 });
  }

  const message = (body as { message: string }).message.trim();
  if (message.length === 0) {
    return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  }

  try {
    const response = await generateResponse(message);
    return NextResponse.json({ response }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Upstream provider error." }, { status: 502 });
  }
}
