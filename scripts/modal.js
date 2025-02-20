function editModal(editdata) {
  const modal = document.getElementById("readModal");
  document.getElementById("edit").value;
  modalContent.textContent = text;
  document.getElementById("editModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

function readModal(title, content) {
  document.getElementById("modal_title").innerText = title;
  document.getElementById("modal_content").innerText = content;
  document.getElementById("readWriteModal").style.display = "block";
}

function writeModal() {
  document.getElementById("writeModal").style.display = "block";
}

// 모달 닫기
function closeModal() {
  document.getElementById("readWriteModal").style.display = "none";
}
