function editModal(editdata) {
  const modal = document.getElementById("readModal");
  document.getElementById("edit").value;
  modalContent.textContent = text;
  document.getElementById("editModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

function readModal(text) {
  const modal = document.getElementById("readModal");
  const modalContent = modal.querySelector("div");
  modalContent.innerHTML = `<p>${text}</p>`;

  modal.style.display = "block";
}

function closeReadModal() {
  document.getElementById("readModal").style.display = "none";
}

function writeModal() {
  document.getElementById("writeModal").style.display = "block";
}

function closeWriteModal() {
  document.getElementById("writeModal").style.display = "none";
}
