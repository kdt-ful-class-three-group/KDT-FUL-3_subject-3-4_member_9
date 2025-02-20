function editModal(editdata) {
  const modal = document.getElementById("readModal");
  document.getElementById("edit").value;
  modalContent.textContent = text;
  document.getElementById("editModal").style.display = "block";
}

function readWriteModal(text) {
  const modal = document.getElementById("readWriteModal");
  const modalContent = modal.querySelector("div");
  modalContent.innerHTML = `<p>${text}</p>`;

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
