const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.get("/sse", (req, res) => {
  // Set response headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Send SSE data at regular intervals
  const intervalId = setInterval(() => {
    const data = new Date().toLocaleTimeString();
    res.write(`data: ${data}\n\n`);
  }, 1000);

  // End the SSE connection on client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
