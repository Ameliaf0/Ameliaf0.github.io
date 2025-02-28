const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Announcements", href: "/announcements" },
  { name: "Assignments", href: "/assignments" },
  { name: "Discussions", href: "/discussion_topics" },
  { name: "Grades", href: "/grades" },
  { name: "People", href: "/users" },
  { name: "Syllabus", href: "/assignments/syllabus" },
  { name: "Modules", href: "/modules" },
  { name: "NameCoach", href: "/external_tools/1681" },
  { name: "CU Boulder Libraries", href: "/external_tools/3759" },
  { name: "My Course Materials", href: "/external_tools/33321" },
];



const recentAnnouncements = [
  "Announcement 3",
  "Announcement 2",
  "Announcement 1",
];

const courseModules = [
  {
    name: "Week 1 (1/13–1/19)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  },
  {
    name: "Week 2 (1/20–1/26)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 3 (1/27–2/2)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 4 (2/3–2/9)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 5 (2/10–2/16)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 6 (2/17–2/23)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 7 (2/24–3/2)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 8 (3/3–3/9)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 9 (3/10–3/16)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 10 (3/17–3/23)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  },
  {
    name: "Week 11 (3/24–3/30)",
    children: ["Item 1"],
  },
  {
    name: "Week 12 (3/31–4/6)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 13 (4/7–4/13)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 14 (4/14–4/20)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 15 (4/21–4/27)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 16 (4/28–4/30)",
    children: ["Item 1"],
  },
];

const todoItems = [
  "Todo 1",
  "Todo 2",
  "Todo 3",
  "Todo 4",
  "Todo 5",
  "Todo 6",
  "Todo 7",
];



// Populate navigation
const nav = document.querySelector('nav');
const navList = document.createElement('ul');
navigationLinks.forEach(link => {
  const listItem = document.createElement('li');
  const anchor = document.createElement('a');
  anchor.href = link.href;
  anchor.textContent = link.name;
  listItem.appendChild(anchor);
  navList.appendChild(listItem);
  listItem.style.padding = "10px";
  navList.style.listStyleType = "none";
});
nav.appendChild(navList);

// Populate buttons
const h3 = document.createElement('h3');
h3.textContent = ("To Do")

const courseStream = document.createElement('button');
courseStream.textContent = 'View Course Stream';
const calendar = document.createElement('button');
calendar.textContent = 'View Course Calendar';
const notifs = document.createElement('button');
notifs.textContent = 'View Course Notifications';
const aside = document.querySelector('aside');
const todoList = document.createElement('ul');
aside.appendChild(courseStream)
aside.appendChild(calendar)
aside.appendChild(notifs)
aside.appendChild(h3)
// Populate to do list
todoItems.forEach(todo => {
  const listItem = document.createElement('li');
  listItem.textContent = todo;
  listItem.style.padding = "5px";
  todoList.appendChild(listItem);
});
aside.appendChild(todoList);
todoList.style.listStyleType = "none";
todoList.style.padding = 0


// Populate announcements
const mainList = document.querySelector('main');
const h2 = document.createElement('h2');
h2.textContent = "Recent Announcements"
mainList.appendChild(h2)
recentAnnouncements.forEach(announcement => {
  const listItem = document.createElement('li');
  listItem.textContent = announcement;
  mainList.appendChild(listItem);
  listItem.style.padding = "15px"
  listItem.style.borderBottom = "1px solid black";
});



// Populate modules
mainList.style.listStyleType = "none";
courseModules.forEach(module => {
  const moduleItem = document.createElement('li');
  const moduleHeader = document.createElement('div');
  moduleHeader.textContent = module.name;
  moduleHeader.style.cursor = "pointer";
  moduleHeader.style.fontWeight = "bold";
  moduleHeader.style.border = "1px solid black";
  moduleHeader.style.padding = "10px";
  moduleHeader.style.background = "lightgrey"
  
  const childrenList = document.createElement('ul');
  childrenList.style.listStyleType = "none";
  childrenList.style.padding = "0";
  
  module.children.forEach(child => {
    const childItem = document.createElement('li');
    childItem.textContent = child;
    childrenList.appendChild(childItem);
    childItem.style.border = "1px solid black";
    childItem.style.padding = "10px";
  });
  
  moduleItem.appendChild(moduleHeader);
  moduleItem.appendChild(childrenList);
  mainList.appendChild(moduleItem);
  
  // Expand/collapse 
  moduleHeader.addEventListener('click', () => {
    const isExpanded = childrenList.style.display !== "none";
    childrenList.style.display = isExpanded ? "none" : "block";
  });
  
  // Default to expanded state
  childrenList.style.display = "block";
});


