import { serve } from "bun";

const BACKEND_URL = `http://layerhire-api.railway.internal:${process.env.PORT}`; // Use your internal URL

serve({
  port: process.env.PORT || 8080,
  async fetch(req) {
    const url = new URL(req.url);

    // 1. Proxy API requests
    if (url.pathname.startsWith("/api")) {
      const targetUrl = `${BACKEND_URL}${url.pathname}${url.search}`;
      
      // 1. Prepare headers (important for CORS and Content-Type)
      const headers = new Headers(req.headers);
      
      // 2. Build the proxy request
      const proxyReq = {
        method: req.method,
        headers: headers,
        body: req.body, // Pipe the stream directly
      };

      // 3. GET/HEAD cannot have a body in Fetch API
      if (req.method === "GET" || req.method === "HEAD") {
        delete (proxyReq as any).body;
      }

      try {
        const backendResponse = await fetch(targetUrl, proxyReq);
        
        // 4. Return the response while preserving headers (especially Set-Cookie!)
        return new Response(backendResponse.body, {
          status: backendResponse.status,
          headers: backendResponse.headers,
        });
      } catch (error) {
        console.error("Proxy Error:", error);
        return new Response("Backend Unavailable", { status: 502 });
      }
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