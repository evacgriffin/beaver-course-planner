const courses = {
  CS161: {
    name: "Introduction to Computer Science I",
    prereq: [],
    core: true,
  },
  CS162: {
    name: "Introduction to Computer Science II",
    prereq: ["CS161"],
    core: true,
  },
  CS225: {
    name: "Discrete Structures in Computer Science",
    prereq: [],
    core: true,
  },
  CS261: {
    name: "Data Structures",
    prereq: ["CS225", "CS261"],
    core: true,
  },
  CS271: {
    name: "Computer Architecture and Assembly Language",
    prereq: ["CS161"],
    core: true,
  },
  CS290: {
    name: "Web Development",
    prereq: ["CS162"],
    core: true,
  },
  CS325: {
    name: "Analysis of Algorithms",
    prereq: ["CS261", "CS225"],
    core: true,
  },
  CS340: {
    name: "Introduction to Databases",
    prereq: ["CS290"],
    core: true,
  },
  CS361: {
    name: "Software Engineering 1",
    prereq: ["CS261"],
    core: true,
  },
  CS362: {
    name: "Software Egnineering 2",
    prereq: ["CS261"],
    core: true,
  },
  CS374: {
    name: "Operating Systems 1",
    prereq: ["CS261", "CS271"],
    core: true,
  },
  CS467: {
    name: "Online Capstone Project",
    prereq: ["CS361", "CS362", "CS374"],
    core: true,
  },
  CS321: {
    name: "Introduction to Theory of Computation",
    prereq: ["CS261", "CS225"],
    core: false,
  },
  CS352: {
    name: "Introduction to Usability Engineering",
    prereq: ["CS161"],
    core: false,
  },
  CS370: {
    name: "Introduction to Security",
    prereq: ["CS374"],
    core: false,
  },
  CS372: {
    name: "Introduction to Computer Networks",
    prereq: ["CS261", "CS271"],
    core: false,
  },
  CS373: {
    name: "Defense Against the Dark Arts",
    prereq: ["CS340", "CS374", "CS372"],
    core: false,
  },
  CS381: {
    name: "Programming Language Fundamentals",
    prereq: ["CS261", "CS225"],
    core: false,
  },
  CS391: {
    name: "Social and Ethical Issues in Computer Science",
    prereq: [],
    core: false,
  },
  CS399: {
    name: "Intro to Applied Data Science with Programming",
    prereq: [],
    core: false,
  },
  CS427: {
    name: "Cryptography",
    prereq: ["CS261"],
    core: false,
  },
  CS444: {
    name: "Operating Systems 2",
    prereq: ["CS374", "CS271"],
    core: false,
  },
  CS450: {
    name: "Introduction to Computer Graphics",
    prereq: ["CS261"],
    core: false,
  },
};
