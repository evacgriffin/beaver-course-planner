const cards = document.getElementsByClassName("card");
const selectedCards = document.getElementsByClassName("selected-card");
const dropzones = document.getElementsByClassName("drop-zone");

const cardDragHandler = (e) => {
  e.dataTransfer.setData("text", e.target.id);
  console.log(e.target.id);
};

const cardDropHandler = (e) => {
  e.preventDefault();
  let elementId = e.dataTransfer.getData("text");
  const originalElement = document.getElementById(elementId);
  console.log(originalElement);
  if (originalElement && originalElement.classList.contains("selected")) {
    e.target.appendChild(originalElement);
  } else {
    e.target.appendChild(createCourseCopy(elementId));
  }
};

const createCourseCopy = (elementId) => {
  const originalElement = document.getElementById(elementId);
  const elementCopy = document.createElement("div");
  elementCopy.id = `selected-${elementId}`;
  elementCopy.classList.add("selected-card");
  elementCopy.setAttribute("draggable", true);
  elementCopy.innerText = originalElement.innerText;
  return elementCopy;
};
const allowDrop = (e) => {
  e.preventDefault();
};

for (let card of cards) {
  card.addEventListener("dragstart", cardDragHandler);
  card.addEventListener("dragover", allowDrop);
}

for (let dropzone of dropzones) {
  dropzone.addEventListener("drop", cardDropHandler);
  dropzone.addEventListener("dragover", allowDrop);
}

for (let selectedCard of selectedCards) {
  selectedCard.addEventListener("dragstart", cardDragHandler);
  selectedCard.addEventListener("dragover", allowDrop);
}
