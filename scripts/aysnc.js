function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
async function newDoc() {
  try {
    const res = await fetch("/docList");
    const docList = await res.json();

    console.log("서버에서 받아온 데이터", docList);

    const doclist = document.getElementById("postContainer");
    doclist.innerHTML = "";

    docList.forEach((item) => {
      const list = document.createElement("div");
      list.classList.add("post");
      list.setAttribute(
        "style",
        "border-bottom: 1px solid black; margin-bottom: 10px; padding-bottom: 5px; margin-top: 10px; cursor:pointer"
      );
      list.innerHTML = `<div onclick="readWriteModal('${item.title}')">
  ${item.title} - ${formatDate(item.Date)}
</div>`;
      doclist.appendChild(list);
    });
  } catch (error) {
    console.error("데이터 못 불러옴 ");
  }
}

window.onload = newDoc;
