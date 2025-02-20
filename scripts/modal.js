function editModal(editdata) {
  const modal = document.getElementById("readModal");
  document.getElementById("edit").value;
  modalContent.textContent = text;
  document.getElementById("editModal").style.display = "block";
}

function readWriteModal() {
  const modal = document.getElementById("readWriteModal");
  const modalContent = modal.querySelector("div");

  const title = document.getElementById("title").value;
  const write = document.getElementById("write").value;
  modalContent.innerHTML = `<h2>${title}<h2>`;
  modalContent.textContent = title;
  modalContent.textContent = write;

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
