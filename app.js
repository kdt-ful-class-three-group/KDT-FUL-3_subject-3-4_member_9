import { createServer } from "http";
import { readFileSync } from "fs";
import { parse } from "querystring";

let docList = [];
const server = createServer((req, res) => {
  const url = req.url;

  try {
    if (req.method === "GET") {
      console.log(url);
      if (url === "/") {
        const main = readFileSync("./index.html", "utf-8");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(main);
      } else if (url.endsWith(".js")) {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        const script = readFileSync(`./${url}`);
        res.end(script);
      } else if (url.endsWith(".css")) {
        res.writeHead(200, { "Content-Type": "text/css" });
        const css = readFileSync(`./${url}`);
        res.end(css);
      } else if (url === "/docList") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(docList));
      }
    }
  } catch {
    console.error("오류");
  }
  if (req.method === "POST") {
    let content = "";

    req.on("data", (chunk) => {
      content += chunk;
    });

    req.on("end", () => {
      const data = parse(content);

      if (url === "/writeNewdocument") {
        console.log("글 요청");
        let list = [];

        req.on("data", (frag) => {
          list += frag; //배열에 stack하는 용도
        });

        if (list) {
          const doc = parse(list);
          doc.date = new Date().toISOString();
          console.log("받은 글", doc);

          docList.push(doc);
          console.log("새 글 추가", doc);
        }
        res.writeHead(302, { Location: "/" }); // 입력 후 루트로 새로고침
        res.end();
      }
    });
  } else if (url === "/editDocument") {
    console.log("수정하기 불러옴");

    let newDoc = [];
    for (let i = 0; i < docList.length; i++) {
      let doc = docList[i];

      if (doc.title === data.oldTitle) {
        doc = {
          title: data.newTitle,
          write: data.newWrite,
          date: new Date().toISOString()
        };
      }
      newDoc.push(doc);
    }

    docList = newDoc;
    console.log("수정된 글", docList);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true }));

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const updateDoc = parse(data);
      const index = docList.findIndex(
        (doc) => doc.title === updateDoc.oldTitle
      );
    });
  }
});

let PORT = 8000;

server.listen(PORT, function () {
  console.log(`http://localhost:${PORT} 에서 서버 구동 중`);
});
