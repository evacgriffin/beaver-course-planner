const flipCards = document.querySelectorAll(".flip-card");
for (const flipcard of flipCards) {
  flipcard.addEventListener("click", () => {
    flipcard.classList.toggle("flipped");
  });
}
