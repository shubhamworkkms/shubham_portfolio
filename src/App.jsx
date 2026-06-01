import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code2,
  Server,
  Cpu,
  GraduationCap,
  Menu,
  X,
  Briefcase,
  Calendar,
  Send,
  CheckCircle,
  FileText,
  Database,
  MessageSquare,
  Layout,
  Lock,
  Unlock,
  Settings,
  Sliders,
  Plus,
  Trash2,
  Save,
  RefreshCw
} from 'lucide-react';
import './App.css';
import profileImg from './assets/profile.jpg';

// Custom SVG components for brand icons since Lucide v0.400+ removed them
const Github = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Initial/default portfolio data based on resume
const DEFAULT_PORTFOLIO_DATA = {
  personal: {
    name: "Shubham Kumar",
    roles: ["PHP Developer", "MERN Stack Developer", "Full Stack Engineer"],
    bio: "Full Stack Developer specializing in robust PHP backend solutions and modern MERN Stack applications. I design and build scalable, user-centric web applications from concept to deployment.",
    avatar: "", // falls back to local profileImg
    email: "shubhamwork700@gmail.com",
    phone: "+917372849408",
    location: "Begusarai, Bihar, India",
    github: "https://github.com/shubham7372",
    linkedin: "https://www.linkedin.com/in/shubham-kumar-suman/",
    leetcode: "https://leetcode.com/u/shubham_032//",
    resumeUrl: "/Shubham_Kumar_Resume.pdf"
  },
  stats: {
    experience: "1+",
    projects: "6+",
    leetcodeSolved: "50+"
  },
  education: {
    school: "Centurion University of Technology and Management",
    degree: "B.Tech in Computer Science and Engineering",
    duration: "2021 – 2025",
    location: "Odisha, India",
    cgpa: "8.01"
  },
  skills: [
    {
      category: "Frontend Development",
      description: "Building responsive, interactive, and visually stunning web interfaces. Focused on user experience, modern typography, grid systems, and clean animations.",
      tags: ["React.js", "Redux", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Bootstrap"]
    },
    {
      category: "Backend & Database",
      description: "Designing scalable backend logic, relational/non-relational database schemas, security rules, and RESTful APIs to power complex web applications.",
      tags: ["PHP", "Laravel", "Node.js", "Express.js", "MongoDB", "MySQL", "REST APIs"]
    },
    {
      category: "Tools & Frameworks",
      description: "Leveraging professional development toolchains, design mockups, and standard workflow managers to build, debug, test, and release clean projects.",
      tags: ["Git & GitHub", "VS Code", "Figma", "Postman", "C Programming", "Java"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Social Media Profile Dashboard",
      type: "UI/UX Figma Design",
      description: "Designed a comprehensive social media dashboard UI using Figma. Houses all linked accounts in one sleek, intuitive interface. Focused on modern typography, clean layouts, and responsive elements.",
      tags: ["Figma", "UI Design", "Wireframing", "Prototyping"],
      link: "https://www.figma.com/proto/ZJDQWmOtMVIhaJKgKMAOh0/Social-Media-Profile-Dashboard?node-id=1-326&t=3iFnWk4P4TNv0ucq-1",
      linkLabel: "View Figma Proto"
    },
    {
      id: "proj-2",
      title: "Mandi Website (Sell & Buy)",
      type: "MERN Web Application",
      description: "Developed a web platform connecting farmers and buyers directly for listing agricultural products and managing transactions. Built responsive UI, intuitive search/filters, and smooth routing.",
      tags: ["React.js", "Redux", "Tailwind CSS", "Node.js", "MongoDB"],
      link: "https://mandi-app.vercel.app/",
      linkLabel: "Live Demo"
    },
    {
      id: "proj-3",
      title: "CSaR Club Website",
      type: "PHP & MySQL Full Stack",
      description: "A multi-page database website designed and developed for the college CSaR Club to automate manual tasks like event registration, attendance tracking, member updates, and data logging.",
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP", "MySQL"],
      link: "https://csarcutm.infinityfreeapp.com/",
      linkLabel: "Live Website"
    },
    {
      id: "proj-4",
      title: "E-Commerce REST API & Backend",
      type: "Backend REST API",
      description: "Built a secure and optimized Laravel REST API for a digital store. Features JWT user authentication, flexible product categorizations, orders processing pipelines, and Stripe integration.",
      tags: ["PHP", "Laravel", "MySQL", "REST API", "Stripe"],
      link: "",
      linkLabel: "Backend Architecture"
    },
    {
      id: "proj-5",
      title: "Real-time Chat Application",
      type: "MERN & Socket.io App",
      description: "Designed a live chatting platform featuring group rooms, instant messaging syncing, status circles (online/offline), typing triggers, and secure user profiles management.",
      tags: ["React.js", "Node.js", "Express.js", "Socket.io", "MongoDB"],
      link: "",
      linkLabel: "Real-time Websockets"
    },
    {
      id: "proj-6",
      title: "Productivity Task Kanban Board",
      type: "Productivity Dashboard",
      description: "Created a task manager with card drag-and-drop actions, user task grouping, completion percentages, tagging, priorities (Low, Medium, High), and persistence using Redux state.",
      tags: ["React.js", "Redux", "Tailwind CSS", "HTML5/CSS3"],
      link: "",
      linkLabel: "State Sync"
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "PHP Developer (Full Stack)",
      company: "KMS Technologies (Full-Time)",
      duration: "Jan 2026 – Present",
      location: "Greater Noida, India",
      bullets: [
        "Developed and maintained web applications using Laravel, PHP, MySQL, HTML, CSS, JavaScript.",
        "Built responsive UI and managed backend logic, APIs, and database integration.",
        "Optimized performance, implemented SEO, and handled debugging, testing, and deployment."
      ]
    },
    {
      id: "exp-2",
      role: "MERN Stack Intern",
      company: "Lamantix (Internship)",
      duration: "Jun 2025 – Dec 2025",
      location: "Bengaluru, Karnatka",
      bullets: [
        "Built web applications using MongoDB, Express.js, React.js, Node.js (MERN).",
        "Developed REST APIs, backend logic, and responsive UI components.",
        "Implemented CRUD operations, database management, and Git workflows."
      ]
    }
  ]
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Data State loaded from MySQL backend
  const [portfolioData, setPortfolioData] = useState(DEFAULT_PORTFOLIO_DATA);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  // Admin Modal States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('general');
  const [adminSuccessMsg, setAdminSuccessMsg] = useState('');

  // Editable forms buffer states
  const [editPersonal, setEditPersonal] = useState({ ...portfolioData.personal });
  const [editStats, setEditStats] = useState({ ...portfolioData.stats });
  const [editEducation, setEditEducation] = useState({ ...portfolioData.education });
  const [editSkills, setEditSkills] = useState(JSON.parse(JSON.stringify(portfolioData.skills)));
  const [editProjects, setEditProjects] = useState(JSON.parse(JSON.stringify(portfolioData.projects)));
  const [editExperience, setEditExperience] = useState(JSON.parse(JSON.stringify(portfolioData.experience)));

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', or null
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch data from backend on component mount
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portfolio');
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const resData = await res.json();
      setPortfolioData(resData);
      setLoadingError(null);
    } catch (err) {
      console.error("Failed to load portfolio data from MySQL:", err);
      setLoadingError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Sync edits buffer when portfolioData changes
  useEffect(() => {
    setEditPersonal({ ...portfolioData.personal });
    setEditStats({ ...portfolioData.stats });
    setEditEducation({ ...portfolioData.education });
    setEditSkills(JSON.parse(JSON.stringify(portfolioData.skills)));
    setEditProjects(JSON.parse(JSON.stringify(portfolioData.projects)));
    setEditExperience(JSON.parse(JSON.stringify(portfolioData.experience)));
  }, [portfolioData]);

  useEffect(() => {
    // Handle scroll events for sticky header & active nav highlights
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in viewport
      const sections = ['home', 'services', 'about', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cycle role titles in hero dynamically
  const heroRoles = portfolioData.personal.roles && portfolioData.personal.roles.length > 0
    ? portfolioData.personal.roles
    : ["PHP Developer", "MERN Stack Developer", "Full Stack Engineer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroRoles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request send
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Clear status after 5s
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1500);
  };

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Admin panel handlers
  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthorized(true);
      setPasscodeError(false);
      setPasscode('');
    } else {
      setPasscodeError(true);
    }
  };

  const handleSaveAdminChanges = () => {
    const updatedData = {
      personal: { ...editPersonal },
      stats: { ...editStats },
      education: { ...editEducation },
      skills: JSON.parse(JSON.stringify(editSkills)),
      projects: JSON.parse(JSON.stringify(editProjects)),
      experience: JSON.parse(JSON.stringify(editExperience))
    };

    setAdminSuccessMsg('Saving changes to MySQL database...');

    // Send payload to backend server
    fetch('/api/portfolio/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Database transaction failed on backend.');
        return res.json();
      })
      .then(resData => {
        setPortfolioData(updatedData);
        setAdminSuccessMsg('Changes saved to MySQL database successfully!');
        setTimeout(() => setAdminSuccessMsg(''), 4000);
      })
      .catch(err => {
        console.error('Error saving portfolio data to server:', err);
        // Fallback to updating state locally
        setPortfolioData(updatedData);
        setAdminSuccessMsg('Server save failed. State updated locally only.');
        setTimeout(() => setAdminSuccessMsg(''), 4000);
      });
  };

  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all data in MySQL to original defaults?")) {
      setAdminSuccessMsg('Resetting database...');

      fetch('/api/portfolio/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(DEFAULT_PORTFOLIO_DATA)
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to reset database defaults.');
          return res.json();
        })
        .then(() => {
          setPortfolioData(DEFAULT_PORTFOLIO_DATA);
          setAdminSuccessMsg('Database successfully reset to defaults.');
          setTimeout(() => {
            setAdminSuccessMsg('');
            setIsAdminOpen(false);
            setIsAuthorized(false);
          }, 1500);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
          console.error(err);
          // Fallback locally
          setPortfolioData(DEFAULT_PORTFOLIO_DATA);
          setIsAdminOpen(false);
          setIsAuthorized(false);
        });
    }
  };

  const handleLogOut = () => {
    setIsAuthorized(false);
    setIsAdminOpen(false);
  };

  // Helpers for Projects CRUD inside Admin Panel
  const handleAddProject = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: 'New Project Title',
      type: 'Web Application',
      description: 'Describe your project here...',
      tags: ['React', 'CSS'],
      link: '',
      linkLabel: 'Live Demo'
    };
    setEditProjects(prev => [...prev, newProj]);
  };

  const handleRemoveProject = (id) => {
    setEditProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleProjectFieldChange = (index, field, value) => {
    const updated = [...editProjects];
    if (field === 'tags') {
      updated[index][field] = value.split(',').map(t => t.trim());
    } else {
      updated[index][field] = value;
    }
    setEditProjects(updated);
  };

  // Helpers for Experience CRUD inside Admin Panel
  const handleAddExperience = () => {
    const newExp = {
      id: 'exp-' + Date.now(),
      role: 'Software Engineer',
      company: 'Company Name',
      duration: 'Date Period',
      location: 'City, Country',
      bullets: [
        "Responsibility description bullet..."
      ]
    };
    setEditExperience(prev => [...prev, newExp]);
  };

  const handleRemoveExperience = (id) => {
    setEditExperience(prev => prev.filter(e => e.id !== id));
  };

  const handleExperienceFieldChange = (index, field, value) => {
    const updated = [...editExperience];
    if (field === 'bullets') {
      updated[index][field] = value.split('\n').filter(b => b.trim() !== '');
    } else {
      updated[index][field] = value;
    }
    setEditExperience(updated);
  };

  // Helpers for Skills categories tags change
  const handleSkillTagsChange = (index, value) => {
    const updated = [...editSkills];
    updated[index].tags = value.split(',').map(t => t.trim());
    setEditSkills(updated);
  };

  const handleSkillFieldChange = (index, field, value) => {
    const updated = [...editSkills];
    updated[index][field] = value;
    setEditSkills(updated);
  };

  // Dynamic project icon mapping
  const getProjectIcon = (type, title) => {
    const lowType = (type || '').toLowerCase();
    const lowTitle = (title || '').toLowerCase();
    if (lowType.includes('figma') || lowType.includes('design') || lowTitle.includes('figma') || lowTitle.includes('dashboard')) {
      return <FileText size={48} />;
    } else if (lowType.includes('api') || lowType.includes('backend') || lowTitle.includes('api')) {
      return <Database size={48} />;
    } else if (lowType.includes('chat') || lowType.includes('message') || lowTitle.includes('chat')) {
      return <MessageSquare size={48} />;
    } else if (lowType.includes('board') || lowType.includes('kanban') || lowType.includes('task') || lowTitle.includes('task') || lowTitle.includes('kanban')) {
      return <Layout size={48} />;
    } else if (lowType.includes('mern') || lowType.includes('react') || lowTitle.includes('mandi') || lowTitle.includes('react')) {
      return <Code2 size={48} />;
    } else if (lowType.includes('php') || lowType.includes('server') || lowTitle.includes('csar') || lowTitle.includes('club')) {
      return <Server size={48} />;
    }
    return <Cpu size={48} />;
  };

  // Loading Screen Wrapper
  if (loading) {
    return (
      <div className="portfolio-loading-screen animate-fade-in">
        <div className="loader-container">
          <div className="loader-spinner"></div>
          <h2>Loading Shubham's Universe</h2>
          <p>Connecting to MySQL database...</p>
        </div>
      </div>
    );
  }

  // Database Connection Error Screen (includes offline demo fallback!)
  if (loadingError) {
    return (
      <div className="portfolio-loading-screen error animate-fade-in">
        <div className="loader-container error-card">
          <div className="error-icon-box">
            <X size={32} />
          </div>
          <h2>Database Connection Failed</h2>
          <p className="error-desc">Error details: <code>{loadingError}</code></p>
          <p className="error-help">
            Please make sure that MySQL server is active, your credentials in <code>server/.env</code> are correct, and the database has been initialized using <code>server/schema.sql</code>.
          </p>
          <div className="error-actions">
            <button className="btn-primary" onClick={fetchPortfolio}>
              <RefreshCw size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Retry Connection
            </button>
            <button className="btn-secondary" onClick={() => {
              // Bypass to offline demo mode
              setPortfolioData(DEFAULT_PORTFOLIO_DATA);
              setLoadingError(null);
            }}>
              Run in Offline Demo Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-app">
      {/* Header Navigation */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
            SHUBHAM<span>.</span>
          </a>

          {/* Navigation Links */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <a
                href="#home"
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
              >
                Services & Skills
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              >
                About Me
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              >
                Contact
              </a>
            </li>
          </ul>

          <button
            className="btn-hire d-none d-md-block"
            onClick={() => handleNavClick('contact')}
          >
            Hire Me
          </button>

          {/* Mobile Menu Icon */}
          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="bg-glow-spot" style={{ top: '10%', left: '10%' }}></div>
        <div className="bg-glow-spot" style={{ bottom: '20%', right: '10%', background: 'radial-gradient(circle, var(--secondary-glow) 0%, rgba(0,0,0,0) 70%)' }}></div>

        <div className="container hero-grid">
          <div className="hero-content-left animate-fade-in-up">
            <span className="hero-greeting">Welcome to my universe</span>
            <h1 className="hero-name">Hi I am <br /><span className="gradient-text">{portfolioData.personal.name}</span></h1>

            <div className="hero-title-wrapper">
              <div className="hero-title-scroller">
                <div className="hero-title">{heroRoles[currentRoleIndex]}</div>
              </div>
            </div>

            <p className="hero-desc">
              {portfolioData.personal.bio}
            </p>

            <div className="hero-socials">
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
                <Github size={20} />
              </a>
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={portfolioData.personal.leetcode} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Leetcode">
                <Code2 size={20} />
              </a>
              <a href={`mailto:${portfolioData.personal.email}`} className="social-icon-btn" title="Email">
                <Mail size={20} />
              </a>
            </div>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => handleNavClick('contact')}>
                Hire Me
              </button>
              <a href={portfolioData.personal.resumeUrl} download="Shubham_Kumar_Resume.pdf" className="btn-secondary">
                <Download size={18} /> Download CV
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">{portfolioData.stats.experience}</div>
                <div className="stat-label">Years Exp</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">{portfolioData.stats.projects}</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">{portfolioData.stats.leetcodeSolved}</div>
                <div className="stat-label">Leetcode Solved</div>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper animate-float">
            <div className="hero-image-bg"></div>
            <div className="profile-img-container pulse-glow">
              <img src={portfolioData.personal.avatar || profileImg} alt={portfolioData.personal.name} className="profile-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Services & Skills Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">My Expertise</span>
            <h2 className="section-title">Services & Technical Skills</h2>
            <p className="section-desc">What I bring to the table. Modern, responsive, and performance-optimized digital products.</p>
          </div>

          <div className="services-grid">
            {portfolioData.skills.map((skill, index) => {
              const icons = [<Code2 size={24} />, <Server size={24} />, <Cpu size={24} />];
              return (
                <div className="service-card" key={index}>
                  <div className="service-icon">
                    {icons[index % icons.length]}
                  </div>
                  <h3 className="service-title">{skill.category}</h3>
                  <p className="service-desc">{skill.description}</p>
                  <div className="skills-list">
                    {skill.tags.map((tag, tIndex) => (
                      <span className="skill-tag" key={tIndex}>{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Who I Am</span>
            <h2 className="section-title">About Me</h2>
            <p className="section-desc">A brief introduction to my background, education, and credentials.</p>
          </div>

          <div className="about-grid">
            <div className="about-left">
              <div className="about-photo-frame">
                <img src={portfolioData.personal.avatar || profileImg} alt={`${portfolioData.personal.name} profile`} className="about-photo" />
              </div>
            </div>

            <div className="about-right-content">
              <h3 className="gradient-text" style={{ fontSize: '24px', marginBottom: '16px' }}>PHP & MERN Stack Web Developer</h3>
              <p className="about-info-text">
                {portfolioData.personal.bio}
              </p>

              <div className="about-meta">
                <div className="about-meta-item">
                  <span className="about-meta-label">Location</span>
                  <span className="about-meta-value">{portfolioData.personal.location}</span>
                </div>
                <div className="about-meta-item">
                  <span className="about-meta-label">Education</span>
                  <span className="about-meta-value">{portfolioData.education.degree}</span>
                </div>
                <div className="about-meta-item">
                  <span className="about-meta-label">Email</span>
                  <span className="about-meta-value">{portfolioData.personal.email}</span>
                </div>
                <div className="about-meta-item">
                  <span className="about-meta-label">Employment</span>
                  <span className="about-meta-value">Full-time (KMS Technologies)</span>
                </div>
              </div>

              <div className="education-box">
                <h4 className="edu-title">
                  <GraduationCap size={20} /> Education Details
                </h4>
                <div className="edu-school">{portfolioData.education.school}</div>
                <div className="edu-row">
                  <span>{portfolioData.education.degree}</span>
                  <span>{portfolioData.education.duration}</span>
                </div>
                <div className="edu-row">
                  <span>{portfolioData.education.location}</span>
                  <span className="edu-cgpa">CGPA: {portfolioData.education.cgpa} / 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Projects Section */}
      <section id="projects" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">My Work</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-desc">A selection of recent design mockups and fully responsive production websites.</p>
          </div>

          <div className="portfolio-grid">
            {portfolioData.projects.map((project) => (
              <div className="portfolio-card" key={project.id}>
                <div className="portfolio-img-wrapper">
                  <div className="portfolio-placeholder">
                    {getProjectIcon(project.type, project.title)}
                    <span>{project.type}</span>
                  </div>
                </div>
                <div className="portfolio-content">
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="portfolio-desc">{project.description}</p>
                  <div className="portfolio-tags">
                    {project.tags.map((tag, tIndex) => (
                      <span className="portfolio-tag" key={tIndex}>{tag}</span>
                    ))}
                  </div>
                  <div className="portfolio-links">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project-link"
                      >
                        <ExternalLink size={16} /> {project.linkLabel || 'View Project'}
                      </a>
                    ) : (
                      <span className="btn-project-link" style={{ cursor: 'default' }}>
                        {getProjectIcon(project.type, project.title)} {project.linkLabel || 'Architecture Preview'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Career Timeline</span>
            <h2 className="section-title">Work Experience</h2>
            <p className="section-desc">Professional software development positions and internship achievements.</p>
          </div>

          <div className="timeline">
            {portfolioData.experience.map((exp) => (
              <div className="timeline-item" key={exp.id}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <span className="timeline-company">{exp.company}</span>
                    </div>
                    <span className="timeline-date">{exp.duration}</span>
                  </div>
                  <div className="timeline-location">
                    <MapPin size={14} /> {exp.location}
                  </div>
                  <ul className="timeline-desc">
                    {exp.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Let's Connect</span>
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-desc">Have a project in mind, want to collaborate, or just want to chat? Drop me a line.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              {/* Phone */}
              <div className="contact-card">
                <div className="contact-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <a href={`tel:${portfolioData.personal.phone}`}>{portfolioData.personal.phone}</a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-card">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <a href={`mailto:${portfolioData.personal.email}`}>{portfolioData.personal.email}</a>
                </div>
              </div>

              {/* Location */}
              <div className="contact-card">
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>{portfolioData.personal.location}</p>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry"
                    className="form-control"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    className="form-control"
                  ></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-submit">
                  {isSubmitting ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>

                {formStatus === 'success' && (
                  <div className="form-status success">
                    <CheckCircle size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container footer-container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%' }}>
          <div className="logo" style={{ justifySelf: 'start' }}>
            SHUBHAM<span>.</span>
          </div>

          <div className="footer-socials" style={{ justifySelf: 'center', display: 'flex', gap: '16px' }}>
            <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
              <Github size={18} />
            </a>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
              <Linkedin size={18} />
            </a>
            <a href={portfolioData.personal.leetcode} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
              <Code2 size={18} />
            </a>
          </div>

          <div className="footer-right-options" style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <p className="footer-text" style={{ margin: 0 }}>
              © {new Date().getFullYear()} Shubham Kumar.
            </p>
            <button
              className="admin-portal-btn"
              onClick={() => setIsAdminOpen(true)}
              title="Admin Panel"
            >
              <Lock size={15} /> <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Panel Modal Portal Overlay */}
      {isAdminOpen && (
        <div className="admin-overlay animate-fade-in">

          {/* Authorization Screen Gate */}
          {!isAuthorized ? (
            <div className="admin-login-card animate-fade-in-up">
              <div className="login-header">
                <Lock size={32} className="login-icon" />
                <h3>Admin Authorization</h3>
                <p>Please enter the dashboard passcode to manage portfolio content.</p>

              </div>
              <form onSubmit={handlePasscodeSubmit} className="login-form">
                <div className="form-group">
                  <input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Admin Passcode"
                    className={`form-control ${passcodeError ? 'is-invalid' : ''}`}
                    autoFocus
                  />
                  {passcodeError && <span className="error-text">Incorrect passcode, please try again.</span>}
                </div>
                <div className="login-actions">
                  <button type="submit" className="btn-primary">Verify Access</button>
                  <button type="button" className="btn-secondary" onClick={() => setIsAdminOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (

            /* Full Screen Workspace Panel */
            <div className="admin-panel-container animate-fade-in-up">
              <div className="admin-panel-header">
                <div className="admin-panel-title">
                  <Settings size={22} className="title-icon" />
                  <h2>Portfolio Control Center</h2>
                  <span className="live-pill">Live Workspace</span>
                </div>
                <div className="admin-header-actions">
                  <button className="btn-logout" onClick={handleLogOut}>Lock Session</button>
                  <button className="btn-close-modal" onClick={() => setIsAdminOpen(false)}><X size={20} /></button>
                </div>
              </div>

              <div className="admin-panel-body">
                {/* Left tab menu bar */}
                <div className="admin-sidebar">
                  <button
                    className={`admin-tab-btn ${activeAdminTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveAdminTab('general')}
                  >
                    <Sliders size={16} /> General Info
                  </button>
                  <button
                    className={`admin-tab-btn ${activeAdminTab === 'skills' ? 'active' : ''}`}
                    onClick={() => setActiveAdminTab('skills')}
                  >
                    <Cpu size={16} /> Skills Categories
                  </button>
                  <button
                    className={`admin-tab-btn ${activeAdminTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveAdminTab('projects')}
                  >
                    <Layout size={16} /> Project Portfolio
                  </button>
                  <button
                    className={`admin-tab-btn ${activeAdminTab === 'experience' ? 'active' : ''}`}
                    onClick={() => setActiveAdminTab('experience')}
                  >
                    <Briefcase size={16} /> Career Experience
                  </button>
                </div>

                {/* Right content editor fields */}
                <div className="admin-content-pane">

                  {/* General Profile Info Tab */}
                  {activeAdminTab === 'general' && (
                    <div className="admin-form-section">
                      <h3>Personal Details & Metrics</h3>
                      <div className="admin-form-grid">
                        <div className="form-group">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            value={editPersonal.name}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, name: e.target.value }))}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            value={editPersonal.email}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, email: e.target.value }))}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phone Contact</label>
                          <input
                            type="text"
                            value={editPersonal.phone}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, phone: e.target.value }))}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Location (City, State)</label>
                          <input
                            type="text"
                            value={editPersonal.location}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, location: e.target.value }))}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group full-width">
                          <label className="form-label">Sliding Job Titles (Comma-separated)</label>
                          <input
                            type="text"
                            value={editPersonal.roles.join(', ')}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, roles: e.target.value.split(',').map(r => r.trim()) }))}
                            className="form-control"
                            placeholder="MERN Developer, PHP Developer, Full Stack Engineer"
                          />
                        </div>
                        <div className="form-group full-width">
                          <label className="form-label">Hero Introduction / Biography Summary</label>
                          <textarea
                            value={editPersonal.bio}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, bio: e.target.value }))}
                            className="form-control"
                            rows={3}
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Github Profile URL</label>
                          <input
                            type="text"
                            value={editPersonal.github}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, github: e.target.value }))}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">LinkedIn Profile URL</label>
                          <input
                            type="text"
                            value={editPersonal.linkedin}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, linkedin: e.target.value }))}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Leetcode Profile URL</label>
                          <input
                            type="text"
                            value={editPersonal.leetcode}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, leetcode: e.target.value }))}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">CV Download Link Path</label>
                          <input
                            type="text"
                            value={editPersonal.resumeUrl}
                            onChange={(e) => setEditPersonal(prev => ({ ...prev, resumeUrl: e.target.value }))}
                            className="form-control"
                          />
                        </div>

                        <div className="form-group full-width" style={{ marginTop: '10px' }}>
                          <h4 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Statistics Counters</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                            <div>
                              <label className="form-label">Years of Experience</label>
                              <input
                                type="text"
                                value={editStats.experience}
                                onChange={(e) => setEditStats(prev => ({ ...prev, experience: e.target.value }))}
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label className="form-label">Projects Completed</label>
                              <input
                                type="text"
                                value={editStats.projects}
                                onChange={(e) => setEditStats(prev => ({ ...prev, projects: e.target.value }))}
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label className="form-label">Leetcode Problems Solved</label>
                              <input
                                type="text"
                                value={editStats.leetcodeSolved}
                                onChange={(e) => setEditStats(prev => ({ ...prev, leetcodeSolved: e.target.value }))}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group full-width" style={{ marginTop: '10px' }}>
                          <h4 style={{ color: 'var(--primary)', marginBottom: '12px' }}>College Education</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                            <div className="form-group full-width">
                              <label className="form-label">College / University Name</label>
                              <input
                                type="text"
                                value={editEducation.school}
                                onChange={(e) => setEditEducation(prev => ({ ...prev, school: e.target.value }))}
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label className="form-label">Degree Course Title</label>
                              <input
                                type="text"
                                value={editEducation.degree}
                                onChange={(e) => setEditEducation(prev => ({ ...prev, degree: e.target.value }))}
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label className="form-label">Study Duration Years</label>
                              <input
                                type="text"
                                value={editEducation.duration}
                                onChange={(e) => setEditEducation(prev => ({ ...prev, duration: e.target.value }))}
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label className="form-label">College Location</label>
                              <input
                                type="text"
                                value={editEducation.location}
                                onChange={(e) => setEditEducation(prev => ({ ...prev, location: e.target.value }))}
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label className="form-label">CGPA score</label>
                              <input
                                type="text"
                                value={editEducation.cgpa}
                                onChange={(e) => setEditEducation(prev => ({ ...prev, cgpa: e.target.value }))}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Skills / Services Categories Tab */}
                  {activeAdminTab === 'skills' && (
                    <div className="admin-form-section">
                      <h3>Skills Categories & Sub-items</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>
                        Modify services headings, description briefs, and individual skill badge items displayed in your skills grid.
                      </p>
                      {editSkills.map((skill, index) => (
                        <div className="admin-crud-item-card" key={index}>
                          <h4 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Category {index + 1}</h4>
                          <div className="form-group" style={{ marginBottom: '12px' }}>
                            <label className="form-label">Category Title</label>
                            <input
                              type="text"
                              value={skill.category}
                              onChange={(e) => handleSkillFieldChange(index, 'category', e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="form-group" style={{ marginBottom: '12px' }}>
                            <label className="form-label">Category Description</label>
                            <textarea
                              value={skill.description}
                              onChange={(e) => handleSkillFieldChange(index, 'description', e.target.value)}
                              className="form-control"
                              rows={2}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Skill Badges / Tags (Comma-separated)</label>
                            <input
                              type="text"
                              value={skill.tags.join(', ')}
                              onChange={(e) => handleSkillTagsChange(index, e.target.value)}
                              className="form-control"
                              placeholder="React, CSS, Node"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Projects Portfolio Editor Tab */}
                  {activeAdminTab === 'projects' && (
                    <div className="admin-form-section">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3>Manage Portfolio Projects</h3>
                        <button type="button" className="btn-add" onClick={handleAddProject}>
                          <Plus size={16} /> Add New Project
                        </button>
                      </div>

                      {editProjects.map((project, index) => (
                        <div className="admin-crud-item-card" key={project.id}>
                          <div className="admin-crud-header">
                            <h4>Project #{index + 1}: {project.title}</h4>
                            <button
                              type="button"
                              className="btn-delete-item"
                              onClick={() => handleRemoveProject(project.id)}
                              title="Delete Project"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>

                          <div className="admin-form-grid" style={{ marginTop: '15px' }}>
                            <div className="form-group">
                              <label className="form-label">Project Title</label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => handleProjectFieldChange(index, 'title', e.target.value)}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Sub-header / Project Type</label>
                              <input
                                type="text"
                                value={project.type}
                                onChange={(e) => handleProjectFieldChange(index, 'type', e.target.value)}
                                className="form-control"
                                placeholder="MERN Web Application, Figma UI"
                              />
                            </div>
                            <div className="form-group full-width">
                              <label className="form-label">Project Description</label>
                              <textarea
                                value={project.description}
                                onChange={(e) => handleProjectFieldChange(index, 'description', e.target.value)}
                                className="form-control"
                                rows={2}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Project Tags (Comma-separated)</label>
                              <input
                                type="text"
                                value={project.tags.join(', ')}
                                onChange={(e) => handleProjectFieldChange(index, 'tags', e.target.value)}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Live Demo / Repository URL</label>
                              <input
                                type="text"
                                value={project.link}
                                onChange={(e) => handleProjectFieldChange(index, 'link', e.target.value)}
                                className="form-control"
                                placeholder="https://..."
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Button Action Link Label</label>
                              <input
                                type="text"
                                value={project.linkLabel}
                                onChange={(e) => handleProjectFieldChange(index, 'linkLabel', e.target.value)}
                                className="form-control"
                                placeholder="Live Demo"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Career Experience Tab */}
                  {activeAdminTab === 'experience' && (
                    <div className="admin-form-section">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3>Manage Career Timeline</h3>
                        <button type="button" className="btn-add" onClick={handleAddExperience}>
                          <Plus size={16} /> Add Experience
                        </button>
                      </div>

                      {editExperience.map((exp, index) => (
                        <div className="admin-crud-item-card" key={exp.id}>
                          <div className="admin-crud-header">
                            <h4>Experience #{index + 1}: {exp.role} @ {exp.company}</h4>
                            <button
                              type="button"
                              className="btn-delete-item"
                              onClick={() => handleRemoveExperience(exp.id)}
                              title="Delete Job"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>

                          <div className="admin-form-grid" style={{ marginTop: '15px' }}>
                            <div className="form-group">
                              <label className="form-label">Role Job Title</label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => handleExperienceFieldChange(index, 'role', e.target.value)}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Company Name</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleExperienceFieldChange(index, 'company', e.target.value)}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Duration Date Range</label>
                              <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => handleExperienceFieldChange(index, 'duration', e.target.value)}
                                className="form-control"
                                placeholder="Jan 2026 – Present"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Location (City, Country)</label>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => handleExperienceFieldChange(index, 'location', e.target.value)}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group full-width">
                              <label className="form-label">Bullet Point Achievements (One per line)</label>
                              <textarea
                                value={exp.bullets.join('\n')}
                                onChange={(e) => handleExperienceFieldChange(index, 'bullets', e.target.value)}
                                className="form-control"
                                rows={4}
                                placeholder="Developed Laravel APIs&#10;Built responsive interfaces"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>

              {/* Save/Actions bottom footer */}
              <div className="admin-panel-footer">
                <div className="admin-footer-left">
                  <button type="button" className="btn-reset" onClick={handleResetDefaults}>
                    <RefreshCw size={14} /> Reset Defaults
                  </button>
                </div>
                <div className="admin-footer-right">
                  {adminSuccessMsg && <span className="admin-save-success">{adminSuccessMsg}</span>}
                  <button type="button" className="btn-primary" onClick={handleSaveAdminChanges}>
                    <Save size={16} /> Save Changes
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setIsAdminOpen(false)}>
                    Close
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default App;
