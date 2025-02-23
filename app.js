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
      const data = parse(content); //qs 데이터를 객체로 변환

      if (url === "/writeNewdocument") {
        console.log("글 요청");
        data.date = new Date().toISOString(); // 날짜 추가
        console.log("글 등록", data);
        docList.push(data);
        console.log("새 글 추가", docList);

        res.writeHead(302, { Location: "/" });
        res.end();
      }

      if (url === "/editDocument") {
        console.log("수정하기 불러옴");

        let newDoc = [];
        for (let i = 0; i < docList.length; i++) {
          let doc = docList[i];

          if (doc.title === data.oldTitle) {
            // 기존 제목과 일치하는 doc을 찾아서 있으면 수정하기
            doc = {
              // 문서 구조 만들기, date는 고정으로 date()를 사용하되 알맞는 형식으로 가공함
              title: data.newTitle,
              write: data.newWrite,
              date: new Date().toLocaleString()
            };
          }
          newDoc.push(doc); // 수정된 doc을 새 배열에 추가하기
        }

        docList = newDoc;
        console.log("수정된 글", docList);

        res.writeHead(
          200,
          { "Content-Type": "application/json" },
          res.writeHead(302, { Location: "/" })
        );
        res.end(JSON.stringify({ success: true }));
      }
    });
  }
});

let PORT = 8000;

server.listen(PORT, function () {
  console.log(`http://localhost:${PORT} 에서 서버 구동 중`);
});
