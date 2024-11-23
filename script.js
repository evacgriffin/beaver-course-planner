// Function to save term card data to localStorage
function saveTermCardData() {
    const termCards = document.querySelectorAll(".term-card");
    const termCardData = [];

    termCards.forEach(card => {
        const term = card.querySelector(".dropdown .dropbtn").textContent;
        const year = card.querySelectorAll(".dropdown .dropbtn")[1].textContent;
        const instructions = card.querySelector(".drop-zone").textContent;

        termCardData.push({ term, year, instructions });
    });

    localStorage.setItem("termCards", JSON.stringify(termCardData)); // Save to localStorage
    console.log("Term cards saved:", termCardData);
}

// Function to load term card data from localStorage
function loadTermCardData() {
    const termCardData = JSON.parse(localStorage.getItem("termCards") || "[]");

    termCardData.forEach(data => {
        createTermCard(data.term, data.year, data.instructions);
    });

    console.log("Term cards loaded:", termCardData);
}

function createTermCard(initialTerm = "Select Term", initialYear = "Select Year", initialInstructions = "Drop classes here...") {
    const termCard = document.createElement("div");
    termCard.className = "term-card";

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
    terms.forEach(term => {
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

    const currentYear = new Date().getFullYear();
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
    dropZone.textContent = initialInstructions;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete Card";
    deleteButton.addEventListener("click", function () {
        // Remove card from the DOM
        termCard.remove();

        // Re-save the data to localStorage after removing the card
        saveTermCardData();
    });

    termCard.appendChild(termDropdown);
    termCard.appendChild(yearDropdown);
    termCard.appendChild(dropZone);
    termCard.appendChild(deleteButton);

    document.getElementById("term-card-container").appendChild(termCard);
}

/* When the user clicks on the dropdown button,
toggle between hiding and showing the dropdown content */
function termDropDown() {
    document.getElementById("dropdownItems").classList.toggle("show");
  }

function yearDropDown() {
    document.getElementById("dropdownYearItems").classList.toggle("show");
}
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 

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
        console.log("Selected year:", element.textContent); // Debugging
        button.textContent = element.textContent; // Update button text
    } else {
        console.error("Error: Button or element is null");
    }
    document.getElementById("dropdownYearItems").classList.remove("show"); // Close dropdown
}

function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const dropdownYearItems = document.getElementById("dropdownYearItems");
    dropdownYearItems.innerHTML = ""; // Clear existing options

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

        dropdownYearItems.appendChild(yearOption);
    }

    console.log("Year options generated."); // Debugging
}

// On page load, load saved term card data and generate years for drop down
window.onload = function() {
    loadTermCardData();
    generateYearOptions();
  };