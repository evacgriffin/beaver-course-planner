const initialInstructions = `Drop classes here...`;

const quarterMap = {
  Winter: 1,
  Spring: 2,
  Summer: 3,
  Fall: 4,
};
function saveTermCardData() {
  const termCards = document.querySelectorAll(".term-card");
  const termCardData = [];

  termCards.forEach((card) => {
    const term = card.querySelector(".dropdown .dropbtn").textContent;
    const quarter = quarterMap[term];
    const year = card.querySelectorAll(".dropdown .dropbtn")[1].textContent;
    const plannedCourses = [];

    const courses = card.querySelector(".drop-zone").children;
    for (const course of courses) {
      plannedCourses.push(course.id.split("-")[1]);
    }
    termCardData.push({ term, quarter, year, plannedCourses });
  });
  localStorage.setItem("termCards", JSON.stringify(termCardData));
}

function loadTermCardData() {
  const termCardData = JSON.parse(localStorage.getItem("termCards") || "[]");

  termCardData.forEach((data) => {
    createTermCard(data.term, data.year, data.plannedCourses);
  });
}

const cardDragHandler = (e) => {
  e.dataTransfer.setData("text", e.target.id);
};

const prereqCheck = (courseId, e) => {
  const dropZone = e.target.parentElement;
  const thisTerm = dropZone.getAttribute("data-term");
  const thisYear = dropZone.getAttribute("data-year");
  courseId = courseId.slice(-3);

  const termCardData = JSON.parse(localStorage.getItem("termCards") || "[]");

  const plannedPriorYears = termCardData.filter(
    (termCard) => termCard.year < thisYear
  );

  const plannedPriorTerms = termCardData
    .filter((termCard) => termCard.year == thisYear)
    .filter((termCard) => termCard.quarter < thisTerm);

  const plan1 = plannedPriorYears.map((obj) => obj.plannedCourses);
  const plan2 = plannedPriorTerms.map((obj) => obj.plannedCourses);
  const combinedPlan = plan1.concat(plan2).flat();
  const plannedCourses = new Set(combinedPlan);

  let prereqs = courses[courseId].prereq;
  for (let prereq of prereqs) {
    if (!plannedCourses.has(prereq.toString())) {
      return false;
    }
  }
  return true;
};

const termMapping = {
  1: "Wi",
  2: "Sp",
  3: "Su",
  4: "Fa",
};

const termOfferedCheck = (courseId, term) => {
  // Check if a course is offered that term
  const offeredTerms = courses[courseId].terms;
  const termStr = termMapping[term];
  return offeredTerms.includes(termStr);
};

const courseAlreadyAdded = (courseId) => {
  const termCardData = JSON.parse(localStorage.getItem("termCards") || "[]");
  const plannedCourses = termCardData.map((obj) => obj.plannedCourses).flat();
  const courseSet = new Set(plannedCourses);
  return courseSet.has(courseId.toString());
};

const cardDropHandler = (e) => {
  e.preventDefault();
  const elementId = e.dataTransfer.getData("text");
  const originalElement = document.getElementById(elementId);
  const prereqMet = prereqCheck(elementId, e);

  const currentTerm = e.target.parentElement.getAttribute("data-term");
  const currentYear = e.target.parentElement.getAttribute("data-year");

  const isOfferedThisTerm = termOfferedCheck(elementId.slice(-3), currentTerm);
  const alreadyAdded = courseAlreadyAdded(elementId.slice(-3));

  if (prereqMet && isOfferedThisTerm) {
    if (
      originalElement &&
      originalElement.classList.contains("selected-card")
    ) {
      originalElement.setAttribute("data-term", currentTerm);
      originalElement.setAttribute("data-year", currentYear);
      e.target.appendChild(originalElement);
    } else {
      if (!alreadyAdded) {
        const courseCopy = createCourseCopy(elementId);
        e.target.appendChild(courseCopy, currentTerm, currentYear);
      }
    }
  }

  saveTermCardData();
  updateDropzoneInstruction();
  updateCourseCounts();
};

const updateDropzoneInstruction = () => {
  const dropZones = document.querySelectorAll(".drop-zone");
  for (const dropZone of dropZones) {
    const isEmpty = dropZone.childElementCount === 0;
    if (isEmpty) {
      dropZone.innerText = initialInstructions;
    } else {
      while (
        dropZone.firstChild &&
        dropZone.firstChild.nodeType === Node.TEXT_NODE
      ) {
        dropZone.removeChild(dropZone.firstChild);
      }
    }
  }
};

const createCourseCopy = (elementId, dataTerm, dataYear) => {
  if (!elementId) return;
  const originalElement = document.getElementById(elementId);
  const elementCopy = document.createElement("div");
  elementCopy.id = `selected-${elementId}`;
  elementCopy.classList.add("selected-card", "draggable");
  elementCopy.setAttribute("draggable", true);
  elementCopy.setAttribute("data-term", dataTerm);
  elementCopy.setAttribute("data-year", dataYear);
  elementCopy.id = `selected-${originalElement.id}`;
  elementCopy.innerText = originalElement.id;
  elementCopy.addEventListener("dragstart", cardDragHandler);
  elementCopy.addEventListener("dragover", (e) => e.stopPropagation());
  return elementCopy;
};

const allowDrop = (e) => {
  e.preventDefault();
};

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
let currentTerm;

if (currentMonth >= 8 && currentMonth <= 11) {
  currentTerm = "Fall";
} else if (currentMonth >= 0 && currentMonth <= 3) {
  currentTerm = "Winter";
} else if (currentMonth >= 4 && currentMonth <= 5) {
  currentTerm = "Spring";
} else if (currentMonth >= 6 && currentMonth <= 7) {
  currentTerm = "Summer";
}

// Increment next new card to next term
let nextTerm = currentTerm;
let nextYear = currentYear;

function getNextTermAndYear(currentTerm, currentYear) {
  const terms = ["Fall", "Winter", "Spring", "Summer"];
  const currentIndex = terms.indexOf(currentTerm);
  const nextIndex = (currentIndex + 1) % terms.length;
  const nextTerm = terms[nextIndex];
  const updatedYear = nextTerm === "Winter" ? currentYear + 1 : currentYear;

  return { nextTerm, updatedYear };
}

function createTermCard(
  initialTerm = nextTerm,
  initialYear = nextYear,
  courses = []
) {
  const nextValues = getNextTermAndYear(nextTerm, nextYear);
  nextTerm = nextValues.nextTerm;
  nextYear = nextValues.updatedYear;

  const termCard = document.createElement("div");
  termCard.className = "term-card";
  const thisTerm = quarterMap[initialTerm];
  const thisYear = initialYear;
  termCard.setAttribute("data-term", quarterMap[initialTerm]);
  termCard.setAttribute("data-year", initialYear);

  termCard.courses = [];

  const termDropdown = document.createElement("div");
  termDropdown.className = "dropdown";

  const termButton = document.createElement("button");
  termButton.className = "dropbtn";
  termButton.textContent = initialTerm;
  termButton.addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("show");
  });

  const termDropdownContent = document.createElement("div");
  termDropdownContent.className = "dropdown-content";

  const terms = ["Fall", "Winter", "Spring", "Summer"];
  terms.forEach((term) => {
    const termOption = document.createElement("p");
    termOption.textContent = term;
    termOption.addEventListener("click", function () {
      termButton.textContent = this.textContent;
      termDropdownContent.classList.remove("show");
      saveTermCardData();
    });
    termDropdownContent.appendChild(termOption);
  });

  termDropdown.appendChild(termButton);
  termDropdown.appendChild(termDropdownContent);

  const yearDropdown = document.createElement("div");
  yearDropdown.className = "dropdown";

  const yearButton = document.createElement("button");
  yearButton.className = "dropbtn";
  yearButton.textContent = initialYear;
  yearButton.addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("show");
  });

  const yearDropdownContent = document.createElement("div");
  yearDropdownContent.className = "dropdown-content";

  const range = 10;
  for (let year = currentYear + range; year >= currentYear - range; year--) {
    const yearOption = document.createElement("p");
    yearOption.textContent = year;
    yearOption.addEventListener("click", function () {
      yearButton.textContent = this.textContent;
      yearDropdownContent.classList.remove("show");
      saveTermCardData();
    });
    yearDropdownContent.appendChild(yearOption);
  }

  yearDropdown.appendChild(yearButton);
  yearDropdown.appendChild(yearDropdownContent);

  const dropZone = document.createElement("div");
  dropZone.className = "drop-zone";
  dropZone.innerText = initialInstructions;
  dropZone.addEventListener("drop", cardDropHandler);
  dropZone.addEventListener("dragover", allowDrop);

  // Add all the planned courses
  for (const course of courses) {
    dropZone.appendChild(createCourseCopy(course, thisTerm, thisYear));
  }

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete Card";
  deleteButton.addEventListener("click", function () {
    termCard.remove();
    saveTermCardData();
    updateCourseCounts();
  });

  termCard.appendChild(termDropdown);
  termCard.appendChild(yearDropdown);
  termCard.appendChild(dropZone);
  termCard.appendChild(deleteButton);

  document.getElementById("term-card-container").appendChild(termCard);

  updateCourseCounts();
  updateDropzoneInstruction();
}

function updateCourseCounts() {
  let requiredCount = 0;
  let electiveCount = 0;

  const termCards = document.querySelectorAll(".term-card");
  termCards.forEach((termCard) => {
    const courseCards = termCard.querySelectorAll(".selected-card");
    courseCards.forEach((courseCard) => {
      const courseId = courseCard.innerText;
      const courseData = courses[courseId];
      if (courseData) {
        if (courseData.core) {
          requiredCount++;
        } else {
          electiveCount++;
        }
      }
    });
  });

  document.getElementById(
    "required-courses"
  ).textContent = `Required Courses: ${requiredCount} / 12`;
  document.getElementById(
    "elective-courses"
  ).textContent = `Electives: ${electiveCount} / 3`;
}

function termDropDown() {
  document.getElementById("dropdownItems").classList.toggle("show");
}

function yearDropDown() {
  document.getElementById("dropdownYearItems").classList.toggle("show");
}

window.onclick = function (event) {
  if (event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var dropdown = dropdowns[i];
      if (dropdown.previousElementSibling !== event.target) {
        dropdown.classList.remove("show");
      }
    }
  } else {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
};

function selectItem(element) {
  const button = document.getElementById("dropdown-term-button");
  button.textContent = element.textContent;
  document.getElementById("dropdownItems").classList.remove("show");
}

function selectYearItem(element) {
  const button = document.getElementById("dropdown-year-button");
  if (button && element) {
    button.textContent = element.textContent;
  } else {
    console.error("Error: Button or element is null");
  }
  document.getElementById("dropdownYearItems").classList.remove("show");
}

function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const dropdownYearItems = document.getElementById("dropdownYearItems");
  if (dropdownYearItems) {
    dropdownYearItems.innerHTML = "";
  }

  const range = 10;
  for (let year = currentYear + range; year >= currentYear - range; year--) {
    const yearOption = document.createElement("p");
    yearOption.textContent = year;
    yearOption.style.margin = "5px 0";
    yearOption.style.cursor = "pointer";

    yearOption.addEventListener("click", function () {
      selectYearItem(yearOption);
    });
    if (dropdownYearItems) {
      dropdownYearItems.appendChild(yearOption);
    }
  }
}

function generateCards() {
  const coreContainer = document.getElementById("core-cards-container");
  const electiveContainer = document.getElementById("elective-cards-container");

  for (const courseId in courses) {
    const course = courses[courseId];

    const flipCard = document.createElement("div");
    flipCard.id = courseId;
    flipCard.setAttribute("draggable", true);
    flipCard.classList.add("flip-card", "draggable");

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");

    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");

    const courseIdElem = document.createElement("h3");
    courseIdElem.textContent = courseId;
    flipCardFront.appendChild(courseIdElem);

    const courseNameElem = document.createElement("h4");
    courseNameElem.textContent = course.name;

    const termsElem = document.createElement("p");
    termsElem.textContent = course.terms.join(", ");

    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    if (course.core) {
      coreContainer.appendChild(flipCard);
    } else {
      electiveContainer.appendChild(flipCard);
    }
  }
}

const dropTrashHandler = (e) => {
  e.preventDefault();

  const draggedId = e.dataTransfer.getData("text");
  const draggedElement = document.getElementById(draggedId);
  if (draggedElement.classList.contains("selected-card")) {
    const courseId = draggedId.slice(-3);
    draggedElement.remove();

    updateCourseCounts();

    saveTermCardData();

    updateDropzoneInstruction();
  }
};

function dragDropSetup() {
  const cards = document.getElementsByClassName("flip-card");

  for (let card of cards) {
    card.addEventListener("dragstart", cardDragHandler);
    card.addEventListener("dragover", allowDrop);
  }

  const trash = document.getElementById("trash");
  trash.addEventListener("drop", dropTrashHandler);
  trash.addEventListener("dragover", allowDrop);
}

window.onload = function () {
  loadTermCardData();
  generateYearOptions();
  dragDropSetup();
};

document.addEventListener("DOMContentLoaded", generateCards);
