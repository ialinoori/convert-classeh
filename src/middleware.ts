import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.url;
  const pathname = request.nextUrl.pathname;
  let cookie = request.cookies.get("token")?.value;
  console.log(cookie);


  if (pathname === "/login" && !request.nextUrl.searchParams.get("AppName")) {
    
    const newUrl = new URL(url);
    newUrl.searchParams.set("AppName", "mohammadfarhadi.classeh.ir");
    return NextResponse.redirect(newUrl.href);
  }

 
  if (pathname === "/" && !cookie) {
    return NextResponse.redirect(new URL("/login", url));
  }

  if (pathname === "/dashboard" && !cookie) {
    return NextResponse.redirect(new URL("/login", url));
  }
  if (pathname === "/dashboard/profile" && !cookie) {
    return NextResponse.redirect(new URL("/login", url));
  }
}
