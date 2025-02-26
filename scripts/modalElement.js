function modalElement() {
  return {
    modal: document.getElementById("editModal"),
    titleInput: document.getElementById("editTitle"),
    writeInput: document.getElementById("editWrite"),
    saveButton: document.getElementById("saveEdit")
  };
}

export { modalElement };
