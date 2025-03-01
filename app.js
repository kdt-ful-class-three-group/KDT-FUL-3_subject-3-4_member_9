import { createServer } from "http";
import { readFileSync } from "fs";
import { parse } from "querystring";
import { express } from "express";
import bodyParser from 'body-parser';

const app = express();
app.use(express.static('./'));

let docList = [];

apa.get("/", function (req, res) {
  const main = readFileSync("./index.html", "utf-8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(main);
});

app.get("/docList", (req, res) => {
  res.json(docList);
});

app.post("/writeNewdocument", (req, res) => {
  console.log("글 요청");
  const data = req.body;
  data.date = new Date().toISOString();
  docList.push(data);
  console.log("새 글 추가", docList);
  res.redirect("/");
});

app.post("/editDocument", (req, res) => {
  console.log("수정 요청");
  const data = req.body;

    let newDoc = [];
    for (let i = 0; i < docList.length; i++) {
        let doc = docList[i];

        if (doc.title === data.oldTitle) {
            doc = {
            title: data.newTitle,
            write: data.newWrite,
            date: new Date().toLocaleString()
            };
        }
        newDoc.push(doc);
    }
    docList = newDoc;
    console.log("수정된 글", docList);
    res.redirect("/");
} );

app.post("/deleteDocument", (req, res) => {
    console.log("삭제 요청");
    const data = req.body;
    const beforeDel = docList.length;
    docList = docList.filter((doc) => doc.title !== data.title);
    const deleted = beforeDel !== docList.length;
    console.log("삭제 후 글 리스트", docList);
    res.json({ success: deleted });
});

app.use((req, res) => {
    try{
        res.status(404).send(readFileSync('./404.html', 'utf-8'));
    } catch(error){
        console.error("404 error",error);
        res.status(404).send("404 페이지를 찾을 수 없습니다.");

    }
})


  let PORT = 8000;

    createServer(app).listen(PORT, () => {
        console.log(`http://localhost:${PORT} 에서 서버 구동 중`);
    });