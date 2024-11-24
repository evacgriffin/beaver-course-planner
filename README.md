# Beaver Course Planner

## Table of Contents

- [Description](#description)
- [Run the App](#run-the-app)
- [Usage](#usage)
- [License](#license)
- [Roadmap](#roadmap)

## Description

We created this web app to help our community of OSU computer science post-bacc students plan out their courses for the program.
Students can create new term cards and drag + drop course cards into the terms.
The plan is saved in local storage.
The app enforces course prerequisites and whether a course is offered for a chosen term.

## Run the App

The app is deployed on GitHub Pages: [Beaver Course Planner](https://evacgriffin.github.io/beaver-course-planner/).

## Usage

Students can click "Add Term Card" to add a new term to their course plan.

Students can select a core class or elective class card by dragging + dropping the card into a term.

Prerequisites: The app enforces prerequisites. If a student tries to drop a card but 
prerequisites are not met in pervious terms, the card will not be dropped into that term.

Terms: The app enforces terms during which courses are offered. If a student tries to drop a course into a term
during which the course is not offered, the course card will not be dropped.

To remove a course from a term, students can drag and drop a card onto the trash can icon.

All changes made are saved in the local storage. The changes are preserved when the page is refreshed.

## Screenshots
![beaver-planner](https://github.com/user-attachments/assets/4813ef89-56e1-4eb6-bce1-fc3f6c64273b)

<img width="1465" alt="Screenshot 2024-11-24 at 2 14 06 PM" src="https://github.com/user-attachments/assets/257b4fe8-8ebe-46a2-a733-30dd3c3b3382">

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Roadmap

We wanted to incorporate several more features that we did not get to during the hackathon.

Here is a Roadmap for future work on this project:

- [ ] Prevent term cards for duplicate term/year from being created   
- [ ] Make design more responsive for different size screens
- [ ] Add an animation or pop up notification when total course count is met
- [ ] When a term card is deleted, automatically fill the missing term slot when the next new term card is created
- [ ] Add more information on hover to the course cards, such as course title, description, terms offered information
