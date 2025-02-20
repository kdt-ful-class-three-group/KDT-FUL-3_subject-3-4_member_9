const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  const url = req.url;

  try {
    if (req.method === "GET") {
      console.log(url);
      if (url === "/") {
        const main = fs.readFileSync("./index.html", "utf-8");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(main);
      }
    }
  } catch {}

  if (req.method === "POST") {
  }

  let PORT = 8000;

  server.listen(PORT, function () {
    console.log(`http://localhost:${PORT} 에서 서버 구동 중`);
  });
});
