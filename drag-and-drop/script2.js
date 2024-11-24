// Get all draggable cards and droppable areas
const draggableCards = document.querySelectorAll(".flip-card");
const droppableAreas = document.querySelectorAll(".drop-zone");

// Add drag-and-drop functionality to cards
draggableCards.forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    isDragging = true;
    card.style.opacity = "0.5";
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    isDragging = false;
    card.style.opacity = "1";
    card.classList.remove("dragging");
  });
});

// Add drag-and-drop functionality to droppable areas
droppableAreas.forEach((area) => {
  area.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allow dropping
    area.classList.add("over"); // Visual feedback
  });

  area.addEventListener("dragleave", () => {
    area.classList.remove("over"); // Remove visual feedback
  });

  area.addEventListener("drop", (e) => {
    e.preventDefault();
    area.classList.remove("over"); // Remove visual feedback

    // Get the dragged card's ID
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedCard = document.getElementById(draggedId);

    // Append the dragged card to the droppable area
    area.appendChild(draggedCard);
  });
});
