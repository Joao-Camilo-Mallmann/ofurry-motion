import { serve } from "bun";
import fs from "fs";
import path from "path";

const PORT = 3001;

serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const html = fs.readFileSync(path.join(process.cwd(), "public/index.html"), "utf8");
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 OFurry Script-to-Motion UI running at: http://localhost:${PORT}`);
