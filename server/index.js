const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. GET /api/portfolio - Fetch and combine all data from MySQL
app.get('/api/portfolio', async (req, res) => {
  try {
    // Query all tables
    const [personalRows] = await pool.query('SELECT * FROM personal_info LIMIT 1');
    const [educationRows] = await pool.query('SELECT * FROM education LIMIT 1');
    const [skillsRows] = await pool.query('SELECT * FROM skills');
    const [projectsRows] = await pool.query('SELECT * FROM projects');
    const [experienceRows] = await pool.query('SELECT * FROM experience');

    if (personalRows.length === 0 || educationRows.length === 0) {
      return res.status(404).json({ error: 'Initial portfolio data not found. Please seed the database using schema.sql.' });
    }

    const personal = personalRows[0];
    const education = educationRows[0];

    // Format stats sub-object
    const stats = {
      experience: personal.experience_years,
      projects: personal.projects_count,
      leetcodeSolved: personal.leetcode_solved
    };

    // Format personal info sub-object
    const formattedPersonal = {
      name: personal.name,
      bio: personal.bio,
      avatar: personal.avatar,
      email: personal.email,
      phone: personal.phone,
      location: personal.location,
      github: personal.github,
      linkedin: personal.linkedin,
      leetcode: personal.leetcode,
      resumeUrl: personal.resume_url,
      roles: JSON.parse(personal.roles || '[]')
    };

    // Format skills, projects, experience lists (parsing JSON strings)
    const formattedSkills = skillsRows.map(skill => ({
      category: skill.category,
      description: skill.description,
      tags: JSON.parse(skill.tags || '[]')
    }));

    const formattedProjects = projectsRows.map(proj => ({
      id: proj.id,
      title: proj.title,
      type: proj.type,
      description: proj.description,
      tags: JSON.parse(proj.tags || '[]'),
      link: proj.link,
      linkLabel: proj.link_label
    }));

    const formattedExperience = experienceRows.map(exp => ({
      id: exp.id,
      role: exp.role,
      company: exp.company,
      duration: exp.duration,
      location: exp.location,
      bullets: JSON.parse(exp.bullets || '[]')
    }));

    // Assemble and return the complete payload
    res.json({
      personal: formattedPersonal,
      stats,
      education: {
        school: education.school,
        degree: education.degree,
        duration: education.duration,
        location: education.location,
        cgpa: education.cgpa
      },
      skills: formattedSkills,
      projects: formattedProjects,
      experience: formattedExperience
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ error: 'Database query failed: ' + error.message });
  }
});

// 2. POST /api/portfolio/save - Save/Update all portfolio data inside a transaction
app.post('/api/portfolio/save', async (req, res) => {
  const { personal, stats, education, skills, projects, experience } = req.body;

  if (!personal || !stats || !education || !skills || !projects || !experience) {
    return res.status(400).json({ error: 'Invalid payload. Missing core portfolio sections.' });
  }

  const connection = await pool.getConnection();
  try {
    // Start SQL Transaction
    await connection.beginTransaction();

    // 1. Update personal_info
    await connection.query(
      `UPDATE personal_info SET 
        name = ?, bio = ?, avatar = ?, email = ?, phone = ?, location = ?, 
        github = ?, linkedin = ?, leetcode = ?, resume_url = ?, 
        roles = ?, experience_years = ?, projects_count = ?, leetcode_solved = ?
       WHERE id = 1`,
      [
        personal.name,
        personal.bio,
        personal.avatar || '',
        personal.email,
        personal.phone,
        personal.location,
        personal.github,
        personal.linkedin,
        personal.leetcode,
        personal.resumeUrl,
        JSON.stringify(personal.roles),
        stats.experience,
        stats.projects,
        stats.leetcodeSolved
      ]
    );

    // 2. Update education
    await connection.query(
      `UPDATE education SET 
        school = ?, degree = ?, duration = ?, location = ?, cgpa = ?
       WHERE id = 1`,
      [
        education.school,
        education.degree,
        education.duration,
        education.location,
        education.cgpa
      ]
    );

    // 3. Update skills list (Truncate and re-insert)
    await connection.query('DELETE FROM skills');
    for (const skill of skills) {
      await connection.query(
        'INSERT INTO skills (category, description, tags) VALUES (?, ?, ?)',
        [skill.category, skill.description, JSON.stringify(skill.tags)]
      );
    }

    // 4. Update projects list (Truncate and re-insert)
    await connection.query('DELETE FROM projects');
    for (const proj of projects) {
      await connection.query(
        'INSERT INTO projects (id, title, type, description, tags, link, link_label) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          proj.id,
          proj.title,
          proj.type,
          proj.description,
          JSON.stringify(proj.tags),
          proj.link || '',
          proj.linkLabel || ''
        ]
      );
    }

    // 5. Update experience list (Truncate and re-insert)
    await connection.query('DELETE FROM experience');
    for (const exp of experience) {
      await connection.query(
        'INSERT INTO experience (id, role, company, duration, location, bullets) VALUES (?, ?, ?, ?, ?, ?)',
        [
          exp.id,
          exp.role,
          exp.company,
          exp.duration,
          exp.location,
          JSON.stringify(exp.bullets)
        ]
      );
    }

    // Commit Transaction
    await connection.commit();
    res.json({ message: 'Portfolio changes successfully updated in MySQL database.' });
  } catch (error) {
    // Rollback changes on error
    await connection.rollback();
    console.error('Error saving portfolio data:', error);
    res.status(500).json({ error: 'Database transaction failed: ' + error.message });
  } finally {
    // Release pool connection
    connection.release();
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Express Portfolio API Server is running on port ${PORT}`);
});
