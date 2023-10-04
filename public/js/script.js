function toggleTaskCompletion(index) {
  // Send an HTTP request to mark the task as completed on the server
  fetch(`/complete/${index}`, { method: "POST" })
    .then(() => {
      // Update the class to apply a line-through style
      const taskElement = document.querySelector(`li:nth-child(${index + 1})`);
      taskElement.classList.toggle("completed");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
