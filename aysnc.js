async function newDoc() {
  try {
    const res = await fetch("/docList");
    const docList = await res.json();

    const doclist = document.getElementById("postContainer");
    doclist.innerHTML = "";

    docList.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `<div onclick="readModal('${item.write}')">${item.write}</div>`;
      datalist.appendChild(row);
    });
  } catch (error) {
    console.error("데이터 못 불러옴 ");
  }
}

window.onload = newDoc;
