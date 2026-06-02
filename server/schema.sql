
-- 1. Table: personal_info
CREATE TABLE IF NOT EXISTS personal_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    avatar VARCHAR(255) DEFAULT '',
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    location VARCHAR(150) NOT NULL,
    github VARCHAR(255) DEFAULT '',
    linkedin VARCHAR(255) DEFAULT '',
    leetcode VARCHAR(255) DEFAULT '',
    resume_url VARCHAR(255) DEFAULT '',
    roles TEXT NOT NULL, -- Stored as JSON array or comma-separated string
    experience_years VARCHAR(20) DEFAULT '1+',
    projects_count VARCHAR(20) DEFAULT '6+',
    leetcode_solved VARCHAR(20) DEFAULT '50+'
);

-- 2. Table: education
CREATE TABLE IF NOT EXISTS education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school VARCHAR(200) NOT NULL,
    degree VARCHAR(200) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    location VARCHAR(150) NOT NULL,
    cgpa VARCHAR(20) NOT NULL
);

-- 3. Table: skills
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    tags TEXT NOT NULL -- Stored as JSON array string
);

-- 4. Table: projects
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(50) PRIMARY KEY, -- Using client-generated ID
    title VARCHAR(150) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    tags TEXT NOT NULL, -- Stored as JSON array string
    link VARCHAR(255) DEFAULT '',
    link_label VARCHAR(100) DEFAULT ''
);

-- 5. Table: experience
CREATE TABLE IF NOT EXISTS experience (
    id VARCHAR(50) PRIMARY KEY, -- Using client-generated ID
    role VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    location VARCHAR(150) NOT NULL,
    bullets TEXT NOT NULL -- Stored as JSON array string of bullet points
);

-- Seed Data (Delete existing data first to prevent duplicate seeding)
TRUNCATE TABLE personal_info;
TRUNCATE TABLE education;
TRUNCATE TABLE skills;
TRUNCATE TABLE projects;
TRUNCATE TABLE experience;

-- Insert Personal Info
INSERT INTO personal_info (
    name, bio, avatar, email, phone, location, github, linkedin, leetcode, resume_url, roles, experience_years, projects_count, leetcode_solved
) VALUES (
    'Shubham Kumar',
    'Full Stack Developer specializing in robust PHP backend solutions and modern MERN Stack applications. I design and build scalable, user-centric web applications from concept to deployment.',
    '',
    'shubhamwork700@gmail.com',
    '+917372849408',
    'Begusarai, Bihar, India',
    'https://github.com/shubham7372',
    'https://www.linkedin.com/in/shubham-kumar-suman/',
    'https://leetcode.com/u/shubham_032//',
    '/Shubham_Kumar_Resume.pdf',
    '["PHP Developer", "MERN Stack Developer", "Full Stack Engineer"]',
    '1+',
    '6+',
    '50+'
);

-- Insert Education
INSERT INTO education (school, degree, duration, location, cgpa)
VALUES (
    'Centurion University of Technology and Management',
    'B.Tech in Computer Science and Engineering',
    '2021 – 2025',
    'Odisha, India',
    '8.01'
);

-- Insert Skills
INSERT INTO skills (category, description, tags) VALUES 
(
    'Frontend Development',
    'Building responsive, interactive, and visually stunning web interfaces. Focused on user experience, modern typography, grid systems, and clean animations.',
    '["React.js", "Redux", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Bootstrap"]'
),
(
    'Backend & Database',
    'Designing scalable backend logic, relational/non-relational database schemas, security rules, and RESTful APIs to power complex web applications.',
    '["PHP", "Laravel", "Node.js", "Express.js", "MongoDB", "MySQL", "REST APIs"]'
),
(
    'Tools & Frameworks',
    'Leveraging professional development toolchains, design mockups, and standard workflow managers to build, debug, test, and release clean projects.',
    '["Git & GitHub", "VS Code", "Figma", "Postman", "C Programming", "Java"]'
);

-- Insert Projects
INSERT INTO projects (id, title, type, description, tags, link, link_label) VALUES
(
    'proj-1',
    'Social Media Profile Dashboard',
    'UI/UX Figma Design',
    'Designed a comprehensive social media dashboard UI using Figma. Houses all linked accounts in one sleek, intuitive interface. Focused on modern typography, clean layouts, and responsive elements.',
    '["Figma", "UI Design", "Wireframing", "Prototyping"]',
    'https://www.figma.com/proto/ZJDQWmOtMVIhaJKgKMAOh0/Social-Media-Profile-Dashboard?node-id=1-326&t=3iFnWk4P4TNv0ucq-1',
    'View Figma Proto'
),
(
    'proj-2',
    'Mandi Website (Sell & Buy)',
    'MERN Web Application',
    'Developed a web platform connecting farmers and buyers directly for listing agricultural products and managing transactions. Built responsive UI, intuitive search/filters, and smooth routing.',
    '["React.js", "Redux", "Tailwind CSS", "Node.js", "MongoDB"]',
    'https://mandi-app.vercel.app/',
    'Live Demo'
),
(
    'proj-3',
    'CSaR Club Website',
    'PHP & MySQL Full Stack',
    'A multi-page database website designed and developed for the college CSaR Club to automate manual tasks like event registration, attendance tracking, member updates, and data logging.',
    '["HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP", "MySQL"]',
    'https://csarcutm.infinityfreeapp.com/',
    'Live Website'
),
(
    'proj-4',
    'E-Commerce REST API & Backend',
    'Backend REST API',
    'Built a secure and optimized Laravel REST API for a digital store. Features JWT user authentication, flexible product categorizations, orders processing pipelines, and Stripe integration.',
    '["PHP", "Laravel", "MySQL", "REST API", "Stripe"]',
    '',
    'Backend Architecture'
),
(
    'proj-5',
    'Real-time Chat Application',
    'MERN & Socket.io App',
    'Designed a live chatting platform featuring group rooms, instant messaging syncing, status circles (online/offline), typing triggers, and secure user profiles management.',
    '["React.js", "Node.js", "Express.js", "Socket.io", "MongoDB"]',
    '',
    'Real-time Websockets'
),
(
    'proj-6',
    'Productivity Task Kanban Board',
    'Productivity Dashboard',
    'Created a task manager with card drag-and-drop actions, user task grouping, completion percentages, tagging, priorities (Low, Medium, High), and persistence using Redux state.',
    '["React.js", "Redux", "Tailwind CSS", "HTML5/CSS3"]',
    '',
    'State Sync'
);

-- Insert Experience
INSERT INTO experience (id, role, company, duration, location, bullets) VALUES
(
    'exp-1',
    'PHP Developer (Full Stack)',
    'KMS Technologies (Full-Time)',
    'Jan 2026 – Present',
    'Greater Noida, India',
    '["Developed and maintained web applications using Laravel, PHP, MySQL, HTML, CSS, JavaScript.","Built responsive UI and managed backend logic, APIs, and database integration.","Optimized performance, implemented SEO, and handled debugging, testing, and deployment."]'
),
(
    'exp-2',
    'MERN Stack Intern',
    'Lamantix (Internship)',
    'Jun 2025 – Dec 2025',
    'Bengaluru, Karnatka',
    '["Built web applications using MongoDB, Express.js, React.js, Node.js (MERN).","Developed REST APIs, backend logic, and responsive UI components.","Implemented CRUD operations, database management, and Git workflows."]'
);
