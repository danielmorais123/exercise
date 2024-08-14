import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res) {
  const cookieStore = cookies();

  const body = await req.json();
  console.log(body)
  if (body) {
    cookieStore.set("email", body);
    return NextResponse.json({ sucess: true });
  }

  return NextResponse.json({ sucess: false });
}
