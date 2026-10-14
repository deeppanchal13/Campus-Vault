import { AcademicResource, SubjectModule, DeptRep } from '../types';

export const INITIAL_RESOURCES: AcademicResource[] = [
  {
    id: 'res-1',
    title: 'Relational Database Management Systems: Complete Normalization (1NF to BCNF) with Solved University Questions',
    subject: 'DBMS',
    subjectCode: 'CS402',
    semester: 4,
    type: 'notes',
    isVerified: true,
    verifierName: 'Prof. R. Sharma',
    facultyDept: 'Dept. of CSE',
    dateUploaded: 'Yesterday',
    fileSize: '2.4 MB PDF',
    pages: 28,
    downloadsCount: 1420,
    description: 'Comprehensive derivation of Functional Dependencies, Armstrong axioms, 1NF, 2NF, 3NF, and Boyce-Codd Normal Form with step-by-step canonical cover computations.',
    keyTopics: ['Functional Dependencies', 'Canonical Cover', '1NF & 2NF Decomposition', '3NF Synthesis Algorithm', 'BCNF Lossless Join & Dependency Preservation'],
    sampleContentSnippet: `Unit 3: Relational Schema Design & Decomposition
1. Functional Dependency (FD) Definition:
Let R be a relation schema, α ⊆ R and β ⊆ R. The functional dependency α → β holds on R if and only if for any valid instance r(R), for all pairs of tuples t1, t2 in r, if t1[α] = t2[α], then t1[β] = t2[β].

2. Boyce-Codd Normal Form (BCNF):
A relation schema R is in BCNF with respect to a set F of functional dependencies if, for all functional dependencies in F+ of the form α → β, where α ⊆ R and β ⊆ R, at least one of the following holds:
  • α → β is a trivial functional dependency (i.e., β ⊆ α)
  • α is a superkey for R.`
  },
  {
    id: 'res-2',
    title: 'Operating Systems: CPU Scheduling Algorithms (SJF, Round Robin) & Deadlock Handout',
    subject: 'Operating Systems',
    subjectCode: 'CS403',
    semester: 4,
    type: 'notes',
    isVerified: true,
    verifierName: 'Dr. Ananya Sen',
    facultyDept: 'Dept. of IT',
    dateUploaded: '14 Apr 2025',
    fileSize: '3.8 MB PDF',
    pages: 34,
    downloadsCount: 1890,
    description: 'Lecture notes covering CPU scheduling criteria, Gantt charts, Average Waiting Time calculations for Preemptive SJF & Round Robin, followed by Banker\'s Deadlock Avoidance algorithm.',
    keyTopics: ['Preemptive & Non-Preemptive SJF', 'Round Robin with Context Switch Overhead', 'Priority Inversion', 'Coffman Conditions', 'Banker\'s Safety Algorithm'],
    sampleContentSnippet: `Section 4.2: CPU Scheduling
Gantt Chart Evaluation Matrix:
Turnaround Time (TAT) = Completion Time - Arrival Time
Waiting Time (WT) = Turnaround Time - Burst Time

Banker's Algorithm State Vectors:
Available[m]: vector of length m indicating available instances of resource type Rj.
Max[n][m]: maximum demand of thread Ti.
Allocation[n][m]: resources currently allocated to thread Ti.
Need[n][m] = Max[n][m] - Allocation[n][m].`
  },
  {
    id: 'res-3',
    title: 'End-Semester Examination Question Paper 2024 (Solved with Scheme)',
    subject: 'Data Structures & Algorithms',
    subjectCode: 'CS301',
    semester: 3,
    type: 'pyq',
    isVerified: true,
    verifierName: 'Prof. Vikram Joshi',
    facultyDept: 'Dept. of CSE',
    dateUploaded: '12 Apr 2025',
    fileSize: '1.9 MB PDF',
    pages: 16,
    year: 2024,
    examType: 'End-Semester',
    hasSolutions: true,
    downloadsCount: 3120,
    description: 'Official university question paper for December 2024 end-semester examination with step-by-step marking rubrics and code solutions in C++/Java.',
    keyTopics: ['AVL Tree Rotations', 'Dijkstra Shortest Path Proof', 'Topological Sort using Kahn\'s Algo', 'Dynamic Programming Coin Change', 'QuickSelect Time Complexity'],
    sampleContentSnippet: `End-Semester Examination Dec 2024
Course: Data Structures & Algorithms [CS301]
Total Marks: 100 | Duration: 3 Hours

Question 1(a) [10 Marks]:
Construct an AVL tree by inserting the following keys sequentially:
15, 20, 24, 10, 13, 7, 30, 36, 25.
Show the tree configuration after each insertion and specify any single or double rotations (LL, RR, LR, RL) applied to restore balance factor balance.`
  },
  {
    id: 'res-4',
    title: 'Computer Networks: Subnetting, CIDR, and TCP Congestion Control Explained',
    subject: 'Computer Networks',
    subjectCode: 'CS501',
    semester: 5,
    type: 'notes',
    isVerified: true,
    verifierName: 'Dr. P. Venkatraman',
    facultyDept: 'Dept. of CSE',
    dateUploaded: '10 Apr 2025',
    fileSize: '4.1 MB PDF',
    pages: 42,
    downloadsCount: 1650,
    description: 'Detailed numerical guide to Classless Inter-Domain Routing (CIDR), Variable Length Subnet Masking (VLSM), TCP slow start, congestion avoidance, fast retransmit, and Reno vs Tahoe state machines.',
    keyTopics: ['IPv4 CIDR Prefix Calculation', 'VLSM Allocation Table', 'TCP Congestion Window Dynamics', 'AIMD (Additive Increase Multiplicative Decrease)', 'Fast Recovery & TCP SACK'],
    sampleContentSnippet: `Chapter 5: Network & Transport Layer Mechanics
Subnetting Exercise:
An organization is granted block 192.168.1.0/24. The administrator wishes to allocate subnets to 4 departments:
Dept A: 60 hosts
Dept B: 30 hosts
Dept C: 12 hosts
Dept D: 12 hosts

Step 1: Sort by decreasing host demand: Dept A (60) requires 2^6 - 2 = 62 available IPs (/26).
Subnet A: 192.168.1.0/26 (Range: 192.168.1.0 to 192.168.1.63)`
  },
  {
    id: 'res-5',
    title: 'Discrete Mathematics: Graph Theory Theorems & Recurrence Relations Summary',
    subject: 'Discrete Math',
    subjectCode: 'MA302',
    semester: 3,
    type: 'notes',
    isVerified: true,
    verifierName: 'Prof. Sunita Deshmukh',
    facultyDept: 'Dept. of Applied Mathematics',
    dateUploaded: '08 Apr 2025',
    fileSize: '1.6 MB PDF',
    pages: 22,
    downloadsCount: 1290,
    description: 'Concise formula sheet and mathematical proof outlines for Euler graphs, Hamiltonian paths, Kuratowski\'s planarity theorem, generating functions, and homogeneous linear recurrences.',
    keyTopics: ['Eulerian Path and Circuit Criteria', 'Dirac\'s & Ore\'s Theorems', 'Planar Graph Euler Formula (V - E + F = 2)', 'Solving Characteristic Equations', 'Pigeonhole Principle Applications'],
    sampleContentSnippet: `Theorem (Handshaking Lemma):
In any undirected graph G = (V, E), the sum of the degrees of all vertices is twice the number of edges:
∑ deg(v) = 2|E|
Corollary: An undirected graph has an even number of vertices of odd degree.

Theorem (Euler's Formula for Connected Planar Graphs):
For any connected planar simple graph with v vertices, e edges, and f faces:
v - e + f = 2`
  },
  {
    id: 'res-6',
    title: 'Theory of Computation: Chomsky Hierarchy & Turing Decidability Cheat Sheet',
    subject: 'Theory of Computation',
    subjectCode: 'CS502',
    semester: 5,
    type: 'cheatsheet',
    isVerified: true,
    verifierName: 'Prof. K. N. Rao',
    facultyDept: 'Dept. of CSE',
    dateUploaded: '05 Apr 2025',
    fileSize: '1.2 MB PDF',
    pages: 6,
    downloadsCount: 2450,
    description: 'High-yield two-page reference sheet comparing Regular, Context-Free, Context-Sensitive, and Recursively Enumerable languages across closure properties and pumping lemmas.',
    keyTopics: ['Chomsky 4-tier Classification', 'Pumping Lemma for Regular Languages', 'Closure Properties Grid', 'Rice\'s Theorem Proof Skeleton', 'Halting Problem Reduction'],
    sampleContentSnippet: `Chomsky Classification Reference Matrix:
Type 0 (Unrestricted): Turing Machine (Recognizes RE languages)
Type 1 (Context-Sensitive): Linear Bounded Automaton (αAβ → αγβ where |γ| >= |A|)
Type 2 (Context-Free): Non-deterministic Pushdown Automaton (A → α)
Type 3 (Regular): Finite State Automaton (A → aB or A → a)`
  },
  {
    id: 'res-7',
    title: 'Software Engineering: System Design Patterns & UML 2.0 Exam Revision Capsule',
    subject: 'Software Engineering & DevOps',
    subjectCode: 'CS601',
    semester: 6,
    type: 'cheatsheet',
    isVerified: true,
    verifierName: 'Dr. Meera Iyer',
    facultyDept: 'Dept. of IT',
    dateUploaded: '02 Apr 2025',
    fileSize: '2.1 MB PDF',
    pages: 18,
    downloadsCount: 980,
    description: 'Visual diagrams of Creational (Factory, Singleton), Structural (Adapter, Composite), and Behavioral (Observer, Strategy) design patterns along with CI/CD pipeline architectural schemas.',
    keyTopics: ['GoF Design Patterns', 'Class & Sequence Diagrams', 'Clean Architecture & SOLID Principles', 'GitLab CI/CD Stages', 'Docker & Kubernetes Basics'],
    sampleContentSnippet: `Design Pattern Reference:
Observer Pattern:
Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
Subject interface: registerObserver(o), removeObserver(o), notifyObservers()
Observer interface: update(state)`
  },
  {
    id: 'res-8',
    title: 'Mid-Semester Examination Question Paper 2023 with Professor Solved Scheme',
    subject: 'Operating Systems',
    subjectCode: 'CS403',
    semester: 4,
    type: 'pyq',
    isVerified: true,
    verifierName: 'Dr. Ananya Sen',
    facultyDept: 'Dept. of IT',
    dateUploaded: '28 Mar 2025',
    fileSize: '1.4 MB PDF',
    pages: 8,
    year: 2023,
    examType: 'Mid-Semester',
    hasSolutions: true,
    downloadsCount: 1540,
    description: 'Mid-term evaluation covering processes, POSIX threads, fork() tree tracing questions, Peterson\'s algorithmic solution, and semaphore implementation problems.',
    keyTopics: ['Process State Lifecycle', 'fork() Execution Tracing', 'Peterson Solution Critical Section', 'Producer-Consumer Semaphore Code', 'Dining Philosophers Problem'],
    sampleContentSnippet: `Mid-Semester Assessment October 2023
Course: Operating Systems [CS403]
Time: 90 Minutes | Total Marks: 50

Q2. [8 Marks] Consider the code snippet:
for (int i = 0; i < 3; i++) {
    fork();
}
printf("Hello\\n");
Draw the complete process creation tree and state how many total "Hello" outputs are printed.`
  },
  {
    id: 'res-9',
    title: 'Database Systems: SQL & PL/SQL Laboratory Manual with Triggers and Procedures',
    subject: 'DBMS',
    subjectCode: 'CS408L',
    semester: 4,
    type: 'lab',
    isVerified: true,
    verifierName: 'Prof. R. Sharma',
    facultyDept: 'Dept. of CSE',
    dateUploaded: '22 Mar 2025',
    fileSize: '3.1 MB PDF',
    pages: 45,
    downloadsCount: 1120,
    description: 'Complete 10-experiment laboratory syllabus with PostgreSQL / Oracle schemas, trigger examples, stored procedure syntax, and ACID isolation level test scripts.',
    keyTopics: ['DDL / DML Queries', 'Complex Nested Joins', 'PL/SQL Cursors', 'Row-level and Statement-level Triggers', 'ACID Concurrency Experiments'],
    sampleContentSnippet: `Experiment 5: Stored Procedures & Triggers
Objective: Create an audit log table that automatically tracks changes to Employee salary records via an AFTER UPDATE trigger.

CREATE OR REPLACE FUNCTION log_salary_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.salary <> NEW.salary THEN
    INSERT INTO SalaryAudit (emp_id, old_val, new_val, updated_at)
    VALUES (OLD.id, OLD.salary, NEW.salary, NOW());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`
  }
];

export const SUBJECT_MODULES: SubjectModule[] = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    semester: 3,
    description: 'Trees, Graphs, Sorting, Dynamic Programming',
    iconName: 'account_tree',
    notesCount: 42,
    pyqsCount: 14,
    pyqYears: '2018–2024',
    topics: ['Arrays & Linked Lists', 'Stacks & Queues', 'Binary Trees & BSTs', 'AVL & Red-Black Trees', 'Graph Algorithms', 'Dynamic Programming', 'Greedy Algorithms'],
    syllabusUnits: [
      { unit: 1, title: 'Linear Data Structures', topics: ['Singly & Doubly Linked Lists', 'Circular Queues', 'Stack Applications (Infix to Postfix)'] },
      { unit: 2, title: 'Non-Linear Trees', topics: ['Binary Search Trees', 'AVL Tree Balancing & Rotations', 'B-Trees & B+ Trees in Disks'] },
      { unit: 3, title: 'Graphs and Traversals', topics: ['BFS and DFS', 'Dijkstra & Bellman-Ford Shortest Paths', 'Prim & Kruskal MST'] },
      { unit: 4, title: 'Advanced Algorithm Design', topics: ['Divide and Conquer (Merge, Quick)', 'Dynamic Programming (Knapsack, LCS)', 'Backtracking (N-Queens)'] }
    ]
  },
  {
    id: 'dbms',
    name: 'Database Management Systems',
    code: 'CS402',
    semester: 4,
    description: 'SQL, Relational Algebra, Indexing, Transactions',
    iconName: 'database',
    notesCount: 38,
    pyqsCount: 11,
    pyqYears: '2019–2024',
    topics: ['ER Modeling', 'Relational Algebra', 'SQL Queries & Subqueries', 'Normalization (1NF-BCNF)', 'Indexing & B-Trees', 'ACID Transactions', 'Concurrency Control'],
    syllabusUnits: [
      { unit: 1, title: 'Data Models and ER Schemas', topics: ['Entity-Relationship Diagrams', 'Weak Entity Sets', 'Extended ER Features'] },
      { unit: 2, title: 'Relational Query Languages', topics: ['Tuple Relational Calculus', 'Relational Algebra Operators', 'Aggregations and Subqueries'] },
      { unit: 3, title: 'Normalization & Dependencies', topics: ['Closure of Attribute Sets', 'Lossless Decomposition', '3NF vs BCNF Tradeoffs'] },
      { unit: 4, title: 'Transaction Management', topics: ['Serializability & Precedence Graphs', 'Two-Phase Locking (2PL)', 'ARIES Recovery Algorithm'] }
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems',
    code: 'CS403',
    semester: 4,
    description: 'Concurrency, Memory Paging, Virtual Memory, Linux',
    iconName: 'memory',
    notesCount: 35,
    pyqsCount: 12,
    pyqYears: '2018–2024',
    topics: ['Process Management & Fork', 'CPU Scheduling Schemes', 'Deadlock Detection & Avoidance', 'Memory Management & Paging', 'Virtual Memory & Page Replacement', 'File System Architecture'],
    syllabusUnits: [
      { unit: 1, title: 'Processes & Threads', topics: ['Process Control Block (PCB)', 'Context Switching', 'User vs Kernel Threads'] },
      { unit: 2, title: 'Synchronization & Deadlocks', topics: ['Critical Section Problem', 'Semaphores & Mutexes', 'Banker\'s Algorithm'] },
      { unit: 3, title: 'Memory Architecture', topics: ['Paging & Segmentation', 'TLB Structure', 'FIFO, LRU, Optimal Page Replacement'] },
      { unit: 4, title: 'File & Disk Subsystems', topics: ['Inode Structure in UNIX', 'Disk Scheduling (SSTF, SCAN, C-LOOK)', 'RAID Configurations'] }
    ]
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    code: 'CS501',
    semester: 5,
    description: 'OSI Model, Routing Protocols, Sockets, Security',
    iconName: 'hub',
    notesCount: 29,
    pyqsCount: 9,
    pyqYears: '2019–2024',
    topics: ['OSI 7 Layers & TCP/IP', 'Data Link Framing & CRC', 'CIDR & Subnetting', 'Distance Vector & Link State', 'TCP Congestion Mechanisms', 'DNS, HTTP/2, TLS'],
    syllabusUnits: [
      { unit: 1, title: 'Physical & Data Link Layers', topics: ['Channel Capacity (Nyquist & Shannon)', 'Sliding Window Protocols (Go-Back-N, Selective Repeat)', 'CSMA/CD & Ethernet'] },
      { unit: 2, title: 'Network Layer Routing', topics: ['IPv4 and IPv6 Addressing', 'OSPF and BGP Routing Protocols', 'NAT & ICMP Diagnostics'] },
      { unit: 3, title: 'Transport Layer Reliability', topics: ['UDP Datagram Format', 'TCP Three-Way Handshake', 'Congestion Window Management'] },
      { unit: 4, title: 'Application Protocols & Security', topics: ['DNS Hierarchical Name Resolution', 'HTTPS and RSA Encryption', 'Firewalls & IPSec'] }
    ]
  },
  {
    id: 'toc',
    name: 'Theory of Computation',
    code: 'CS502',
    semester: 5,
    description: 'Automata, CFG, Turing Machines, Decidability',
    iconName: 'calculate',
    notesCount: 26,
    pyqsCount: 10,
    pyqYears: '2018–2024',
    topics: ['DFA and NFA Conversion', 'Regular Expressions & Pumping Lemma', 'Context-Free Grammars', 'Pushdown Automata (PDA)', 'Turing Machines', 'Decidability & Halting Problem'],
    syllabusUnits: [
      { unit: 1, title: 'Regular Languages & Finite Automata', topics: ['DFA / NFA Equivalence', 'Myhill-Nerode Theorem', 'Pumping Lemma for Regular Languages'] },
      { unit: 2, title: 'Context-Free Languages', topics: ['Chomsky Normal Form (CNF)', 'CYK Parsing Algorithm', 'Pushdown Automata Acceptance by Empty Stack'] },
      { unit: 3, title: 'Turing Machines', topics: ['Standard & Multi-tape Turing Machines', 'Church-Turing Thesis', 'Universal Turing Machine'] },
      { unit: 4, title: 'Undecidability & Complexity', topics: ['Post Correspondence Problem (PCP)', 'Rice\'s Theorem', 'Class P, NP, and NP-Complete Reductions'] }
    ]
  },
  {
    id: 'se',
    name: 'Software Engineering & DevOps',
    code: 'CS601',
    semester: 6,
    description: 'Agile, CI/CD pipelines, UML, Design Patterns',
    iconName: 'terminal',
    notesCount: 22,
    pyqsCount: 7,
    pyqYears: '2020–2024',
    topics: ['Agile Scrum & Kanban', 'Requirement Engineering (SRS)', 'UML Structural & Behavioral Models', 'Design Patterns (GoF)', 'Software Testing (Unit, Integration, CI/CD)', 'DevOps & Containers'],
    syllabusUnits: [
      { unit: 1, title: 'Process Models & Requirements', topics: ['Waterfall vs Agile Lifecycles', 'IEEE 830 SRS Specification Standard', 'User Stories & Sprint Estimation'] },
      { unit: 2, title: 'Software Architecture & Design', topics: ['Coupling and Cohesion Metrics', 'SOLID Design Principles', 'Architectural Styles (Microservices, Monolith)'] },
      { unit: 3, title: 'Verification & Testing', topics: ['Black-box Equivalence Partitioning', 'White-box Basis Path Testing & Cyclomatic Complexity', 'Automated TDD with Jest/JUnit'] },
      { unit: 4, title: 'DevOps & Continuous Delivery', topics: ['Git Branching Strategies', 'GitHub Actions / Jenkins Pipelines', 'Containerization with Docker'] }
    ]
  }
];

export const DEPT_REPS: DeptRep[] = [
  {
    name: 'Prof. R. Sharma',
    role: 'Head Faculty Curator (CSE)',
    department: 'Computer Science & Engineering',
    email: 'r.sharma.cse@campusvault.edu.in',
    room: 'CS Block, Room 304',
    officeHours: 'Mon, Wed 2:00 PM – 4:00 PM'
  },
  {
    name: 'Dr. Ananya Sen',
    role: 'Associate Dean of Curriculum (IT)',
    department: 'Information Technology',
    email: 'ananya.sen@campusvault.edu.in',
    room: 'IT Department, Cabin 12',
    officeHours: 'Tue, Thu 11:00 AM – 1:00 PM'
  },
  {
    name: 'Prof. Vikram Joshi',
    role: 'Exam Archive Coordinator',
    department: 'Computer Science & Engineering',
    email: 'v.joshi@campusvault.edu.in',
    room: 'Academic Complex, Room 108',
    officeHours: 'Friday 3:00 PM – 5:00 PM'
  },
  {
    name: 'Arjun Mehta',
    role: 'Lead Student Representative',
    department: 'CSE Sem IV Class Representative',
    email: 'arjun.mehta2022@campusvault.edu.in',
    room: 'Student Senate Lounge',
    officeHours: 'Daily 4:00 PM – 5:30 PM'
  }
];

export const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Artificial Intelligence & DS',
  'Mechanical Engineering',
  'Electrical Engineering'
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
