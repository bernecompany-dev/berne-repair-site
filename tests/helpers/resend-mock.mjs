import { createServer } from "node:http";

const messages = [];

const server = createServer((req, res) => {
  res.setHeader("content-type", "application/json");

  if (req.method === "GET" && req.url === "/health") {
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === "GET" && req.url === "/messages") {
    res.end(JSON.stringify(messages));
    return;
  }

  if (req.method === "POST" && req.url === "/emails") {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      const message = JSON.parse(body);
      messages.push(message);
      res.statusCode = 200;
      res.end(JSON.stringify({ id: `mock-${messages.length}` }));
    });
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(3101, "127.0.0.1");
