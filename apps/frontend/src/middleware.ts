
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/better-auth/auth";

export async function getMiddlewareSession() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session;
}

export async function middleware(req: NextRequest) {
  const session = (await getMiddlewareSession())!;
  const pathname = req.nextUrl.pathname;
  const url = req.url;

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (session.user.role === "admin") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/dashboard/new-orders", url));
  }

  if (pathname.startsWith("/api/v1/webhook")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/v1")) {
    if (session) {
      return NextResponse.next();
    }

    return NextResponse.json(
      {
        title: "Unauthorized access attempt detected.",
        action: "access_protected_resource",
        requiredPermission: "user",
        receivedPermission: "unauthorized",
      },
      { status: 401 }
    );
  }

  if (pathname.startsWith("/admin")) {
    if (session) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/sign-in", url));
  }

  if (pathname.startsWith("/dashboard")) {
    if (session) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/sign-in", url));
  }

  if (pathname.startsWith("/sign-")) {
    if (!session) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/dashboard", url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
