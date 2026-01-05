const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get all projects
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM projects ORDER BY display_order ASC'
    );
    
    // Parse JSON fields
    const projects = rows.map(row => ({
      ...row,
      tech_stack: row.tech_stack ? (typeof row.tech_stack === 'string' ? JSON.parse(row.tech_stack) : row.tech_stack) : []
    }));

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

// Get single project
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM projects WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = {
      ...rows[0],
      tech_stack: rows[0].tech_stack ? (typeof rows[0].tech_stack === 'string' ? JSON.parse(rows[0].tech_stack) : rows[0].tech_stack) : []
    };

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
};

// Create project
exports.create = async (req, res) => {
  try {
    const { title, description, image_url, tech_stack, github_url, live_url, featured, display_order } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const id = uuidv4();
    await db.query(
      `INSERT INTO projects (id, title, description, image_url, tech_stack, github_url, live_url, featured, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, description, image_url, JSON.stringify(tech_stack || []), github_url, live_url, featured || false, display_order || 0]
    );

    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    const project = {
      ...rows[0],
      tech_stack: rows[0].tech_stack ? (typeof rows[0].tech_stack === 'string' ? JSON.parse(rows[0].tech_stack) : rows[0].tech_stack) : []
    };

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
};

// Update project
exports.update = async (req, res) => {
  try {
    const { title, description, image_url, tech_stack, github_url, live_url, featured, display_order } = req.body;

    const [existing] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await db.query(
      `UPDATE projects SET title = ?, description = ?, image_url = ?, tech_stack = ?, 
       github_url = ?, live_url = ?, featured = ?, display_order = ? WHERE id = ?`,
      [
        title || existing[0].title,
        description !== undefined ? description : existing[0].description,
        image_url !== undefined ? image_url : existing[0].image_url,
        tech_stack ? JSON.stringify(tech_stack) : existing[0].tech_stack,
        github_url !== undefined ? github_url : existing[0].github_url,
        live_url !== undefined ? live_url : existing[0].live_url,
        featured !== undefined ? featured : existing[0].featured,
        display_order !== undefined ? display_order : existing[0].display_order,
        req.params.id
      ]
    );

    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    const project = {
      ...rows[0],
      tech_stack: rows[0].tech_stack ? (typeof rows[0].tech_stack === 'string' ? JSON.parse(rows[0].tech_stack) : rows[0].tech_stack) : []
    };

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
};

// Delete project
exports.delete = async (req, res) => {
  try {
    const [existing] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};
