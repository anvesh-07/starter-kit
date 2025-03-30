import errorHandler from "@/lib/error/handler.error";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/v1");

app.onError(errorHandler);

app.get("/test", async (c) => c.text("Hello", 200));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
