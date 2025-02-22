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
      list.innerHTML = `
        <div onclick="readWriteModal('${item.title}', '${item.write}')">
          <strong>${item.title}</strong> - ${formatDate(item.date)}
          <button onclick="editPost(event, '${item.title}', '${
        item.write
      }')">수정</button>
          <button onclick="deletePost(event, '${item.title}')">삭제</button>
        </div>
      `;

      doclist.appendChild(list);
    });
  } catch (error) {
    console.error("데이터 못 불러옴 ", error);
  }
}

// 수정모달 보여주기
async function editPost(event, oldTitle, oldWrite) {
  event.stopPropagation();

  const modal = document.getElementById("editModal");
  const titleInput = document.getElementById("editTitle");
  const writeInput = document.getElementById("editWrite");
  const saveButton = document.getElementById("saveEdit");

  titleInput.value = oldTitle;
  writeInput.value = oldWrite;

  let newTitle = titleInput.value;
  let newWrite = writeInput.value;

  if (newTitle && newWrite) {
    await fetch("/editDocument", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `oldTitle=${encodeURIComponent(
        oldTitle
      )}&newTitle=${encodeURIComponent(newTitle)}&newWrite=${encodeURIComponent(
        newWrite
      )}`
    });
    newDoc();
    modal.style.display = "none";
  }
  modal.style.display = "block";
}

// async function deletePost(event, title) {
//   event.stopPropagation();
//   if (confirm("정말 삭제하시겠습니까?")) {
//     await fetch("/deleteDocument", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: `title=${title}`
//     });

//     newDoc();
//   }
// }

window.onload = newDoc;
