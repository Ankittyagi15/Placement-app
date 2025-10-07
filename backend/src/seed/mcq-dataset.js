export const mcqDataset = [
  // Quantitative Aptitude
  {
    kind: 'mcq',
    title: 'Percentage Calculation',
    difficulty: 'Easy',
    tags: ['quant', 'percentage'],
    question: 'If 25% of a number is 75, what is 40% of that number?',
    options: ['120', '100', '150', '200'],
    answerIndex: 0,
    explanation: 'If 25% = 75, then 100% = 300. Therefore, 40% of 300 = 120.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Ratio and Proportion',
    difficulty: 'Easy',
    tags: ['quant', 'ratio'],
    question: 'The ratio of boys to girls in a class is 3:2. If there are 30 boys, how many girls are there?',
    options: ['20', '25', '15', '18'],
    answerIndex: 0,
    explanation: 'If boys:girls = 3:2 and boys = 30, then girls = (30 × 2) ÷ 3 = 20.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Time and Work',
    difficulty: 'Medium',
    tags: ['quant', 'time-work'],
    question: 'A can complete a work in 12 days and B can complete it in 18 days. If they work together, how many days will they take?',
    options: ['7.2 days', '6.5 days', '8 days', '9 days'],
    answerIndex: 0,
    explanation: 'A\'s rate = 1/12, B\'s rate = 1/18. Combined rate = 1/12 + 1/18 = 5/36. Time = 36/5 = 7.2 days.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Average Calculation',
    difficulty: 'Easy',
    tags: ['quant', 'average'],
    question: 'The average of 5 numbers is 20. If one number is 15, what is the average of the remaining 4 numbers?',
    options: ['21.25', '20.5', '22', '19.5'],
    answerIndex: 0,
    explanation: 'Total of 5 numbers = 5 × 20 = 100. Sum of remaining 4 = 100 - 15 = 85. Average = 85/4 = 21.25.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Profit and Loss',
    difficulty: 'Medium',
    tags: ['quant', 'profit-loss'],
    question: 'A shopkeeper sells an item at 20% profit. If the cost price is ₹200, what is the selling price?',
    options: ['₹240', '₹220', '₹250', '₹230'],
    answerIndex: 0,
    explanation: 'Profit = 20% of ₹200 = ₹40. Selling price = ₹200 + ₹40 = ₹240.',
    status: 'approved'
  },

  // Logical Reasoning
  {
    kind: 'mcq',
    title: 'Coding-Decoding',
    difficulty: 'Medium',
    tags: ['logical', 'coding'],
    question: 'If CAT is coded as 3120, how is DOG coded?',
    options: ['4157', '4156', '4158', '4159'],
    answerIndex: 0,
    explanation: 'C=3, A=1, T=20. D=4, O=15, G=7. So DOG = 4157.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Blood Relations',
    difficulty: 'Easy',
    tags: ['logical', 'blood-relations'],
    question: 'A is B\'s father. B is C\'s mother. What is A to C?',
    options: ['Grandfather', 'Father', 'Uncle', 'Brother'],
    answerIndex: 0,
    explanation: 'A is B\'s father, B is C\'s mother, so A is C\'s grandfather.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Number Series',
    difficulty: 'Medium',
    tags: ['logical', 'series'],
    question: 'What comes next in the series: 2, 6, 12, 20, 30, ?',
    options: ['42', '40', '44', '46'],
    answerIndex: 0,
    explanation: 'Pattern: +4, +6, +8, +10, +12. So next number is 30 + 12 = 42.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Direction Sense',
    difficulty: 'Easy',
    tags: ['logical', 'direction'],
    question: 'If you are facing North and turn 90° clockwise, which direction are you facing?',
    options: ['East', 'West', 'South', 'North'],
    answerIndex: 0,
    explanation: 'Turning 90° clockwise from North leads to East.',
    status: 'approved'
  },

  // Verbal Ability
  {
    kind: 'mcq',
    title: 'Synonyms',
    difficulty: 'Easy',
    tags: ['verbal', 'synonyms'],
    question: 'What is the synonym of "ABUNDANT"?',
    options: ['Scarce', 'Plentiful', 'Rare', 'Limited'],
    answerIndex: 1,
    explanation: 'Abundant means existing in large quantities; plentiful.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Antonyms',
    difficulty: 'Easy',
    tags: ['verbal', 'antonyms'],
    question: 'What is the antonym of "TRANSPARENT"?',
    options: ['Clear', 'Opaque', 'Visible', 'Bright'],
    answerIndex: 1,
    explanation: 'Transparent means see-through; opaque means not transparent.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Reading Comprehension',
    difficulty: 'Medium',
    tags: ['verbal', 'comprehension'],
    question: 'According to the passage: "Technology has revolutionized communication, making it faster and more accessible." What is the main idea?',
    options: ['Technology is expensive', 'Communication has improved due to technology', 'People don\'t communicate anymore', 'Technology is unreliable'],
    answerIndex: 1,
    explanation: 'The passage emphasizes how technology has made communication faster and more accessible.',
    status: 'approved'
  },

  // Technical - Programming
  {
    kind: 'mcq',
    title: 'Data Structures',
    difficulty: 'Easy',
    tags: ['technical', 'dsa'],
    question: 'Which data structure uses FIFO (First In First Out) principle?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    answerIndex: 1,
    explanation: 'Queue follows FIFO principle where the first element added is the first to be removed.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'C Programming',
    difficulty: 'Medium',
    tags: ['technical', 'c'],
    question: 'What will be the output of: printf("%d", sizeof(int));',
    options: ['2', '4', '8', 'Depends on system'],
    answerIndex: 3,
    explanation: 'Size of int depends on the system architecture (16-bit, 32-bit, 64-bit).',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Java Programming',
    difficulty: 'Medium',
    tags: ['technical', 'java'],
    question: 'Which keyword is used to create an object in Java?',
    options: ['create', 'new', 'object', 'instance'],
    answerIndex: 1,
    explanation: 'The "new" keyword is used to create new instances of classes in Java.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Database Management',
    difficulty: 'Easy',
    tags: ['technical', 'dbms'],
    question: 'Which SQL command is used to retrieve data from a database?',
    options: ['INSERT', 'SELECT', 'UPDATE', 'DELETE'],
    answerIndex: 1,
    explanation: 'SELECT is used to retrieve/query data from database tables.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Operating Systems',
    difficulty: 'Medium',
    tags: ['technical', 'os'],
    question: 'Which scheduling algorithm can lead to starvation?',
    options: ['FCFS', 'Round Robin', 'Priority Scheduling', 'Shortest Job First'],
    answerIndex: 2,
    explanation: 'Priority scheduling can cause starvation if low priority processes never get CPU time.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Computer Networks',
    difficulty: 'Easy',
    tags: ['technical', 'networking'],
    question: 'What does HTTP stand for?',
    options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'HyperText Transport Protocol', 'High Transfer Transport Protocol'],
    answerIndex: 0,
    explanation: 'HTTP stands for HyperText Transfer Protocol, used for web communication.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Algorithm Complexity',
    difficulty: 'Hard',
    tags: ['technical', 'algorithms'],
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    answerIndex: 1,
    explanation: 'Binary search has O(log n) time complexity as it eliminates half the search space in each iteration.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Object-Oriented Programming',
    difficulty: 'Medium',
    tags: ['technical', 'oop'],
    question: 'Which OOP principle allows a class to inherit properties from another class?',
    options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
    answerIndex: 1,
    explanation: 'Inheritance allows a class to inherit properties and methods from a parent class.',
    status: 'approved'
  },
  {
    kind: 'mcq',
    title: 'Software Engineering',
    difficulty: 'Easy',
    tags: ['technical', 'software-engineering'],
    question: 'What does SDLC stand for?',
    options: ['Software Development Life Cycle', 'System Development Life Cycle', 'Software Design Life Cycle', 'System Design Life Cycle'],
    answerIndex: 0,
    explanation: 'SDLC stands for Software Development Life Cycle, the process of developing software.',
    status: 'approved'
  }
];
