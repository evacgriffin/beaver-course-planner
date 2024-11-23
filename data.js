const courses = {
    161: {
      name: "Introduction to Computer Science I",
      description: "Overview of fundamental concepts of computer science. Introduction to problem solving, software engineering, and object-oriented programming. Includes algorithm design and program development.",
      prereq: [],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    162: {
      name: "Introduction to Computer Science II",
      description: "Provides an overview of the fundamental concepts of computer science. Studies basic data structures, computer programming techniques and application of software engineering principles. Introduces analysis of programs.",
      prereq: [161],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    225: {
      name: "Discrete Structures in Computer Science",
      description: "An introduction to the discrete mathematics of computer science, including logic, set and set operations, methods of proof, recursive definitions, combinatorics, and graph theory.",
      prereq: [],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    261: {
      name: "Data Structures",
      description: "Abstract data types, dynamic arrays, linked lists, trees and graphs, binary search trees, hash tables, storage management, complexity analysis of data structures.",
      prereq: [225, 261],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    271: {
      name: "Computer Architecture and Assembly Language",
      description: "Introduces functional organization and operation of digital computers. Coverage of assembly language; addressing, stacks, argument passing, arithmetic operations, decisions, macros, modularization, linkers, and debuggers.",
      prereq: [161],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    290: {
      name: "Web Development",
      description: "How to design and implement a multi-tier application using web technologies: Creation of extensive custom client- and server-side code, consistent with achieving a high-quality software architecture. ",
      prereq: [162],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    325: {
      name: "Analysis of Algorithms",
      description: "Recurrence relations, combinatorics, recursive algorithms, proofs of correctness.",
      prereq: [261, 225],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    340: {
      name: "Introduction to Databases",
      description: "Design and implementation of relational databases, including data modeling with ER or UML, diagrams, relational schema, SQL queries, relational algebra, user interfaces, and administration. ",
      prereq: [290],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    361: {
      name: "Software Engineering I",
      description: "Introduction to the 'front end' of the software engineering lifecycle; requirements analysis and specification; design techniques; project management.",
      prereq: [261],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    362: {
      name: "Software Egnineering II",
      description: "Introduction to the 'back end' of the software engineering lifecycle implementation; verification and validation; debugging; maintenance.",
      prereq: [261],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    374: {
      name: "Operating Systems I",
      description: "Introduction to operating systems using UNIX as the case study. Emphasizes system calls and utilities, fundamentals of processes, and interprocess communication.",
      prereq: [261, 271],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    467: {
      name: "Online Capstone Project",
      description: "Real-world team-based experience with the software engineering design and delivery cycle, including requirements analysis and specification, design techniques, and requirements and final project written documentation.",
      prereq: [361, 362, 374],
      core: true,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    321: {
      name: "Introduction to Theory of Computation",
      description: "Survey of models of computation including finite automata, formal grammars, and Turing machines.",
      prereq: [261, 225],
      core: false,
      terms: ["Fa", "Sp"]
    },
    352: {
      name: "Introduction to Usability Engineering",
      description: "Explores basic principles of usability engineering methods for the design and evaluation of software systems. Includes the study of human-machine interactions, user interface characteristics and design strategies, software evaluation methods, and related guidelines and standards.",
      prereq: [161],
      core: false,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    370: {
      name: "Introduction to Security",
      description: "Introductory course on computer security with the objective to introduce concepts and principles of computer systems security. Notions of security, basic crytographic primitives and their application, basics of authentication and access control, basics of key-management, basics of malware and software security.",
      prereq: [374],
      core: false,
      terms: ["Fa", "Sp", "Su"]
    },
    372: {
      name: "Introduction to Computer Networks",
      description: "Computer network principles, fundamental networking concepts, packet-switching and circuit switching, TCP/IP protocol layers, reliable data transfer, congestion control, flow control, packet forwarding and routing, MAC addressing, multiple access techniques.",
      prereq: [261, 271],
      core: false,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    373: {
      name: "Defense Against the Dark Arts",
      description: "Introduction to the current state of the art in anti-malware, computer forensics, and networking, messaging, and web security. Broad introduction to the field of computer security.",
      prereq: [340, 374, 372],
      core: false,
      terms: ["Fa", "Su"]
    },
    381: {
      name: "Programming Language Fundamentals",
      description: "An introduction to the concepts found in a variety of programming languages. Programming languages as tools for problem solving. A brief introduction to languages from a number of different paradigms.",
      prereq: [261, 225],
      core: false,
      terms: ["Fa", "Sp"]
    },
    391: {
      name: "Social and Ethical Issues in Computer Science",
      description: "In-depth exploration of the social, psychological, political, and ethical issues surrounding the computer industry and the evolving information society.",
      prereq: [],
      core: false,
      terms: ["Fa", "Wi", "Sp", "Su"]
    },
    399: {
      name: "Intro to Applied Data Science with Programming",
      description: "Description unavailable",
      prereq: [],
      core: false,
      terms: ["Wi"]
    },
    427: {
      name: "Cryptography",
      description: "Introduction to the theory and practice of modern cryptography. Fundamental primitives including pseudorandom generators, block ciphers, hash functions. Symmetric-key cryptography for privacy and authenticity. Public-key cryptography based on number-theoretic problems. ",
      prereq: [261],
      core: false,
      terms: ["Wi", "Su"]
    },
    444: {
      name: "Operating Systems II",
      description: "Explores principles of computer operating systems: concurrent processes, memory management, job scheduling, multiprocessing, file systems, performance evaluation, and networking.",
      prereq: [374, 271],
      core: false,
      terms: ["Sp"]
    },
    450: {
      name: "Introduction to Computer Graphics",
      description: "Theoretical and practical treatment of 3D computer graphics using OpenGL: geometric modeling, transformations, viewing, lighting, texture mapping, shading, rendering, and animation.",
      prereq: [261],
      core: false,
      terms: ["Fa"]
    },
    457: {
        name: "Computer Graphics Shaders",
        description: "Emphasizes theoretical and practical treatment of computer graphics shaders, including both RenderMan and GPU shaders. Explores programming in both RenderMan and OpenGL shading languages.",
        prereq: [261],
        core: false,
        terms: ["Wi"]
      },
      475: {
        name: "Introduction to Parallel Programming",
        description: "Theoretical and practical survey of parallel programming, including a discussion of parallel architectures, parallel programming paradigms, and parallel algorithms. Programming one or more parallel computers in a higher-level parallel language. ",
        prereq: [261],
        core: false,
        terms: ["Sp"]
      },
      464: {
        name: "Open Source Software",
        description: "Provides a theoretical foundation of the history, key concepts, technologies, and practices associated with modern Free and Open Source Software (FOSS) projects, and gives students an opportunity to explore and make contributions to FOSS projects with some mentoring and guidance. ",
        prereq: [261, 361],
        core: false,
        terms: ["Fa", "Wi", "Sp", "Su"]
      },
      493: {
        name: "Cloud Application Development",
        description: "Covers developing RESTful cloud services, an approach based on representational state transfer technology, an architectural style and approach to communications used in modern cloud services development.",
        prereq: [290, 340, 372],
        core: false,
        terms: ["Fa", "Sp"]
      },
      477: {
        name: "Introduction to Digital Forensics",
        description: "Introduces concepts related to digital forensics, its role and importance, and tools and techniques for collecting and curating digital evidence. Discusses the role of evidence in the justice system and related legal aspects pertaining to digital forensics. Introduces tools and techniques for digital forensics.",
        prereq: [374],
        core: false,
        terms: ["Wi"]
      },
      492: {
        name: "Mobile Software Development",
        description: "Introduction to concepts and techniques for developing mobile applications. Become familiar with modern mobile structure, implementation, development tools, and workflow.",
        prereq: [374],
        core: false,
        terms: ["Wi", "Su"]
      },
      478: {
        name: "Network Security",
        description: "Basic concepts and techniques in network security, risks and vulnerabilities, applied cryptography and various network security protocols. Coverage of high-level concepts such as authentication, confidentiality, integrity, and availability applied to networking systems. Fundamental techniques including authentication protocols, group key establishment and management, trusted intermediaries, public key infrastructures, SSL/TLS, IPSec, firewalls and intrusion detection.",
        prereq: [372],
        core: false,
        terms: ["Wi", "Sp"]
      },
  };