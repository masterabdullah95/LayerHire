import { serve } from "bun";

const BACKEND_URL = `http://layerhire-api.railway.internal:${process.env.PORT}`; // Use your internal URL

serve({
  port: process.env.PORT || 8080,
  async fetch(req) {
    const url = new URL(req.url);

    // 1. Proxy API requests
    if (url.pathname.startsWith("/api")) {
      const targetUrl = `${BACKEND_URL}${url.pathname}${url.search}`;
      
      // Forward the request to the private backend
      return fetch(targetUrl, {
        method: req.method,
        headers: req.headers,
        body: req.body,
      });
    }

    // 2. Serve Static Frontend Files
    // (Assuming your build is in the 'dist' folder)
    const filePath = "./dist" + (url.pathname === "/" ? "/index.html" : url.pathname);
    const file = Bun.file(filePath);
    
    if (await file.exists()) {
      return new Response(file);
    }

    // Fallback to index.html for SPA routing (React Router)
    return new Response(Bun.file("./dist/index.html"));
  },
});