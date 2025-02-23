function editModal(editdata) {
  const modal = document.getElementById("readModal");
  const titleInput = document.getElementById("editTitle");
  const writeInput = document.getElementById("writeTitle");
  const saveButton = document.getElementById("saveEdit");

  titleInput.value = title;
  writeInput.value = write;

  saveButton.onclick = async function () {
    const newTitle = titleInput.value;
    const newWrite = writeInput.value;

    if (newTitle && newWrite) {
      await fetch("/editDocument", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `oldTitle=${encodeURIComponent(
          title
        )}&newTitle=${encodeURIComponent(
          newTitle
        )}&newWrite=${encodeURIComponent(newWrite)}`
      });
      newDoc();
      modal.style.display = "none";
    }
  };

  modal.style.display = "block";
}
function readWriteModal(title, write) {
  const modal = document.getElementById("readWriteModal");
  const modalContent = modal.querySelector("div");

  modalContent.innerHTML = `
    <h2>${title}</h2>
    <p>${write}</p>
  `;

  modal.style.display = "block";
}

function writeModal() {
  document.getElementById("writeModal").style.display = "block";
}

// 모달 닫기
function closeModal() {
  const readWriteModal = document.getElementById("readWriteModal");
  const writeModal = document.getElementById("writeModal");

  if (readWriteModal) {
    readWriteModal.style.display = "none";
  }

  if (writeModal) {
    writeModal.style.display = "none";
  }
}
