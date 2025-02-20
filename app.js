const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  const url = req.url;

  let docList = [];

  try {
    if (req.method === "GET") {
      console.log(url);
      if (url === "/") {
        const main = fs.readFileSync("./index.html", "utf-8");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(main);
      } else if (url.endsWith(".js")) {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        const script = fs.readFileSync(`./${url}`);
        res.end(script);
      } else if (url.endsWith(".css")) {
        res.writeHead(200, { "Content-Type": "text/css" });
        const css = fs.readFileSync(`./${url}`);
        res.end(css);
      } else if (url === "/docList") {
        console.log("글 요청");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(docList));
      }
    }
  } catch {
    console.error("오류");
  }
  if (req.method === "POST") {
    if (url === "/writeNewdocument") {
      let list = [];

      req.on("data", (frag) => {
        list += frag;
      });

      req.on("end", () => {
        if (list) {
          const doc = qs.parse(list);
          console.log("받은 글", doc);

          docList.push(doc);
          console.log("새 글 추가", doc);
        }
        res.writeHead(302, { Location: "/" }); // 입력 후 루트로 새로고침
        res.end();
      });

      return;
    }
  }
});

let PORT = 8000;

server.listen(PORT, function () {
  console.log(`http://localhost:${PORT} 에서 서버 구동 중`);
});
