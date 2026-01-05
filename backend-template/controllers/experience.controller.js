const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get all experiences
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM experiences ORDER BY display_order ASC'
    );

    // Parse JSON fields
    const experiences = rows.map(row => ({
      ...row,
      description: row.description ? (typeof row.description === 'string' ? JSON.parse(row.description) : row.description) : [],
      technologies: row.technologies ? (typeof row.technologies === 'string' ? JSON.parse(row.technologies) : row.technologies) : []
    }));

    res.json({
      success: true,
      data: experiences
    });
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experiences'
    });
  }
};

// Get single experience
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM experiences WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    const experience = {
      ...rows[0],
      description: rows[0].description ? (typeof rows[0].description === 'string' ? JSON.parse(rows[0].description) : rows[0].description) : [],
      technologies: rows[0].technologies ? (typeof rows[0].technologies === 'string' ? JSON.parse(rows[0].technologies) : rows[0].technologies) : []
    };

    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    console.error('Get experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experience'
    });
  }
};

// Create experience
exports.create = async (req, res) => {
  try {
    const { title, company, location, period, description, technologies, experience_type, is_current, display_order } = req.body;

    if (!title || !company || !period) {
      return res.status(400).json({
        success: false,
        message: 'Title, company, and period are required'
      });
    }

    const id = uuidv4();
    await db.query(
      `INSERT INTO experiences (id, title, company, location, period, description, technologies, experience_type, is_current, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, title, company, location, period,
        JSON.stringify(description || []),
        JSON.stringify(technologies || []),
        experience_type || 'job',
        is_current || false,
        display_order || 0
      ]
    );

    const [rows] = await db.query('SELECT * FROM experiences WHERE id = ?', [id]);
    const experience = {
      ...rows[0],
      description: rows[0].description ? (typeof rows[0].description === 'string' ? JSON.parse(rows[0].description) : rows[0].description) : [],
      technologies: rows[0].technologies ? (typeof rows[0].technologies === 'string' ? JSON.parse(rows[0].technologies) : rows[0].technologies) : []
    };

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: experience
    });
  } catch (error) {
    console.error('Create experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create experience'
    });
  }
};

// Update experience
exports.update = async (req, res) => {
  try {
    const { title, company, location, period, description, technologies, experience_type, is_current, display_order } = req.body;

    const [existing] = await db.query('SELECT * FROM experiences WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    await db.query(
      `UPDATE experiences SET title = ?, company = ?, location = ?, period = ?, description = ?, 
       technologies = ?, experience_type = ?, is_current = ?, display_order = ? WHERE id = ?`,
      [
        title || existing[0].title,
        company || existing[0].company,
        location !== undefined ? location : existing[0].location,
        period || existing[0].period,
        description ? JSON.stringify(description) : existing[0].description,
        technologies ? JSON.stringify(technologies) : existing[0].technologies,
        experience_type || existing[0].experience_type,
        is_current !== undefined ? is_current : existing[0].is_current,
        display_order !== undefined ? display_order : existing[0].display_order,
        req.params.id
      ]
    );

    const [rows] = await db.query('SELECT * FROM experiences WHERE id = ?', [req.params.id]);
    const experience = {
      ...rows[0],
      description: rows[0].description ? (typeof rows[0].description === 'string' ? JSON.parse(rows[0].description) : rows[0].description) : [],
      technologies: rows[0].technologies ? (typeof rows[0].technologies === 'string' ? JSON.parse(rows[0].technologies) : rows[0].technologies) : []
    };

    res.json({
      success: true,
      message: 'Experience updated successfully',
      data: experience
    });
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update experience'
    });
  }
};

// Delete experience
exports.delete = async (req, res) => {
  try {
    const [existing] = await db.query('SELECT * FROM experiences WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    await db.query('DELETE FROM experiences WHERE id = ?', [req.params.id]);

    res.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete experience'
    });
  }
};
