async function newDoc() {
  try {
    const res = await fetch("/docList");
    const docList = await res.json();

    const doclist = document.getElementById("postContainer");
    doclist.innerHTML = "";

    docList.forEach((item) => {
      const list = document.createElement("div");
      list.innerHTML = `<div onclick="readModal('${item.title}')">${item.title}</div>`;
      doclist.append(list);
    });
  } catch (error) {
    console.error("데이터 못 불러옴 ");
  }
}

window.onload = newDoc;
