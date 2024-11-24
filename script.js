const initialInstructions = `Drop classes here...`;

const quarterMap = {
  Winter: 1,
  Spring: 2,
  Summer: 3,
  Fall: 4,
};
// Function to save term card data to localStorage
function saveTermCardData() {
  const termCards = document.querySelectorAll(".term-card");
  const termCardData = [];

  termCards.forEach((card) => {
    const term = card.querySelector(".dropdown .dropbtn").textContent;
    const quarter = quarterMap[term];
    const year = card.querySelectorAll(".dropdown .dropbtn")[1].textContent;
    // const instructions = card.querySelector(".drop-zone").textContent;
    const plannedCourses = [];

    const courses = card.querySelector(".drop-zone").children;
    for (const course of courses) {
      plannedCourses.push(course.id.split("-")[1]);
    }
    termCardData.push({ term, quarter, year, plannedCourses });
  });
  localStorage.setItem("termCards", JSON.stringify(termCardData)); // Save to localStorage
}

// Function to load term card data from localStorage
function loadTermCardData() {
  const termCardData = JSON.parse(localStorage.getItem("termCards") || "[]");

  termCardData.forEach((data) => {
    createTermCard(data.term, data.year, data.plannedCourses);
  });

  //   console.log("Term cards loaded:", termCardData);
}

const cardDragHandler = (e) => {
  e.dataTransfer.setData("text", e.target.id);
};

const prereqCheck = (courseId, e) => {
  courseId = courseId.slice(-3);
  // Get all planned courses from local storage
  let plannedCourses = new Set();
  const termCardData = JSON.parse(localStorage.getItem("termCards") || []);
  termCardData.forEach(
    (data) =>
      (plannedCourses = new Set([...plannedCourses, ...data["plannedCourses"]]))
  );

  // TODO: Check if courses planned are in prior terms
  // Get the term and year of the current dropzone
  // Check all planned courses in prior term and year
  const prereqs = courses[courseId].prereq;
  for (const prereq of prereqs) {
    if (!plannedCourses.has(prereq.toString())) {
      return false;
    }
  }
  return true;
};

const cardDropHandler = (e) => {
  e.preventDefault();
  const elementId = e.dataTransfer.getData("text");
  const originalElement = document.getElementById(elementId);
  const prereqMet = prereqCheck(elementId, e);

  const currentTerm = e.target.parentElement.getAttribute("data-term");
  const currentYear = e.target.parentElement.getAttribute("data-year");

  if (prereqMet) {
    if (
      originalElement &&
      originalElement.classList.contains("selected-card")
    ) {
      originalElement.setAttribute("data-term", currentTerm);
      originalElement.setAttribute("data-year", currentYear);
      e.target.appendChild(originalElement);
    } else {
      const courseCopy = createCourseCopy(elementId);
      //   courseCopy.setAttribute("data-term", currentTerm);
      //   courseCopy.setAttribute("data-year", currentYear);
      e.target.appendChild(courseCopy, currentTerm, currentYear);
      saveTermCardData();
    }
  }

  // Go through all drop-zones and check if they are empty
  updateDropzoneInstruction();

  // Update course counts
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

// Set the current year as the default
const currentYear = new Date().getFullYear();

// Set default term based on current month
const currentMonth = new Date().getMonth(); // Get the current month (0-11)
let currentTerm;

if (currentMonth >= 8 && currentMonth <= 11) {
  // September (8) to December (11)
  currentTerm = "Fall";
} else if (currentMonth >= 0 && currentMonth <= 3) {
  // January (0) to April (3)
  currentTerm = "Winter";
} else if (currentMonth >= 4 && currentMonth <= 5) {
  // May (4) to June (5)
  currentTerm = "Spring";
} else if (currentMonth >= 6 && currentMonth <= 7) {
  // July (6) to August (8)
  currentTerm = "Summer";
}

// Increment next new card to next term
let nextTerm = currentTerm;
let nextYear = currentYear;

function getNextTermAndYear(currentTerm, currentYear) {
  const terms = ["Fall", "Winter", "Spring", "Summer"];
  const currentIndex = terms.indexOf(currentTerm);
  const nextIndex = (currentIndex + 1) % terms.length; // Circular increment
  const nextTerm = terms[nextIndex];

  // Increment year if transitioning to Winter
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

  // Store the courses in this term card (initially an empty array)
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
      saveTermCardData(); // Save changes to localStorage
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
      saveTermCardData(); // Save changes to localStorage
    });
    yearDropdownContent.appendChild(yearOption);
  }

  yearDropdown.appendChild(yearButton);
  yearDropdown.appendChild(yearDropdownContent);

  // Empty drop zone for course cards to be dropped into
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
    // Remove card from the DOM
    termCard.remove();

    // Re-save the data to localStorage after removing the card
    saveTermCardData();

    // Update course counts
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

// This function will be called to update the counts of required and elective courses
function updateCourseCounts() {
  let requiredCount = 0;
  let electiveCount = 0;

  // Get all term cards
  const termCards = document.querySelectorAll(".term-card");

  // Loop through each term card
  termCards.forEach((termCard) => {
    // Get all courses within the current term card
    const courseCards = termCard.querySelectorAll(".selected-card");

    // Loop through each course card
    courseCards.forEach((courseCard) => {
      // Extract the course ID from the innerText of the course card
      const courseId = courseCard.innerText;

      // Get the course details from the courses object
      const courseData = courses[courseId];

      if (courseData) {
        // Check if the course is required (core: true) or elective (core: false)
        if (courseData.core) {
          requiredCount++;
        } else {
          electiveCount++;
        }
      }
    });
  });

  // Update the course counts in the box header
  document.getElementById(
    "required-courses"
  ).textContent = `Required Courses: ${requiredCount} / 12`;
  document.getElementById(
    "elective-courses"
  ).textContent = `Electives: ${electiveCount} / 3`;
}

// Toggle showing options
function termDropDown() {
  document.getElementById("dropdownItems").classList.toggle("show");
}

function yearDropDown() {
  document.getElementById("dropdownYearItems").classList.toggle("show");
}

// Close the dropdown menu if the user clicks anywhere outside the menu
window.onclick = function (event) {
  // Check if the clicked element is a dropbtn
  if (event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var dropdown = dropdowns[i];
      if (dropdown.previousElementSibling !== event.target) {
        // If the dropdown belongs to a different dropbtn, hide it
        dropdown.classList.remove("show");
      }
    }
  } else {
    // If clicked outside of any dropbtn, hide all dropdowns
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
};

// Update the button text with the selected item's text
function selectItem(element) {
  const button = document.getElementById("dropdown-term-button");
  button.textContent = element.textContent; // Update button text
  document.getElementById("dropdownItems").classList.remove("show"); // Close dropdown
}

// Update the button text with the selected year
function selectYearItem(element) {
  const button = document.getElementById("dropdown-year-button");
  if (button && element) {
    // console.log("Selected year:", element.textContent); // Debugging
    button.textContent = element.textContent; // Update button text
  } else {
    console.error("Error: Button or element is null");
  }
  document.getElementById("dropdownYearItems").classList.remove("show"); // Close dropdown
}

function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const dropdownYearItems = document.getElementById("dropdownYearItems");
  if (dropdownYearItems) {
    dropdownYearItems.innerHTML = ""; // Clear existing options
  }

  const range = 10; // Number of years before and after the current year
  for (let year = currentYear + range; year >= currentYear - range; year--) {
    const yearOption = document.createElement("p");
    yearOption.textContent = year;
    yearOption.style.margin = "5px 0"; // Add spacing for better visibility
    yearOption.style.cursor = "pointer"; // Make it clear that this is clickable

    // Attach event listener directly to avoid closure issues
    yearOption.addEventListener("click", function () {
      selectYearItem(yearOption); // Pass the clicked element
    });
    if (dropdownYearItems) {
      dropdownYearItems.appendChild(yearOption);
    }
  }
}

function generateCards() {
  const coreContainer = document.getElementById("core-cards-container");
  const electiveContainer = document.getElementById("elective-cards-container");

  // Loop through the courses object and generate the flip cards
  for (const courseId in courses) {
    const course = courses[courseId];

    // Create the flip card structure
    const flipCard = document.createElement("div");
    flipCard.id = courseId;
    flipCard.setAttribute("draggable", true);
    flipCard.classList.add("flip-card", "draggable");

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");

    // Front of the card
    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");

    const courseIdElem = document.createElement("h3");
    courseIdElem.textContent = courseId;
    flipCardFront.appendChild(courseIdElem);

    const courseNameElem = document.createElement("h4");
    courseNameElem.textContent = course.name;
    // flipCardFront.appendChild(courseNameElem);

    const termsElem = document.createElement("p");
    termsElem.textContent = course.terms.join(", ");
    // flipCardFront.appendChild(termsElem);

    // Back of the card
    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    // flipCardBack.textContent = course.description;

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    // Append to the appropriate container based on 'core' property
    if (course.core) {
      coreContainer.appendChild(flipCard);
    } else {
      electiveContainer.appendChild(flipCard);
    }
  }
}

const dropTrashHandler = (e) => {
  e.preventDefault();

  // Get the ID of the dragged element
  const draggedId = e.dataTransfer.getData("text");
  const draggedElement = document.getElementById(draggedId);
  if (draggedElement.classList.contains("selected-card")) {
    const courseId = draggedId.slice(-3);
    draggedElement.remove();

    // Update course counts
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

// On page load, load saved term card data and generate years for drop down
window.onload = function () {
  loadTermCardData();
  generateYearOptions();
  dragDropSetup();
};

document.addEventListener("DOMContentLoaded", generateCards);
