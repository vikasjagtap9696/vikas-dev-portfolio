const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get all skills
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM skills ORDER BY display_order ASC'
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skills'
    });
  }
};

// Get single skill
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM skills WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skill'
    });
  }
};

// Create skill
exports.create = async (req, res) => {
  try {
    const { name, category, proficiency, icon, display_order } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name and category are required'
      });
    }

    const id = uuidv4();
    await db.query(
      `INSERT INTO skills (id, name, category, proficiency, icon, display_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, category, proficiency || 80, icon, display_order || 0]
    );

    const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [id]);

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: rows[0]
    });
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create skill'
    });
  }
};

// Update skill
exports.update = async (req, res) => {
  try {
    const { name, category, proficiency, icon, display_order } = req.body;

    const [existing] = await db.query('SELECT * FROM skills WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    await db.query(
      `UPDATE skills SET name = ?, category = ?, proficiency = ?, icon = ?, display_order = ? WHERE id = ?`,
      [
        name || existing[0].name,
        category || existing[0].category,
        proficiency !== undefined ? proficiency : existing[0].proficiency,
        icon !== undefined ? icon : existing[0].icon,
        display_order !== undefined ? display_order : existing[0].display_order,
        req.params.id
      ]
    );

    const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [req.params.id]);

    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: rows[0]
    });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update skill'
    });
  }
};

// Delete skill
exports.delete = async (req, res) => {
  try {
    const [existing] = await db.query('SELECT * FROM skills WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    await db.query('DELETE FROM skills WHERE id = ?', [req.params.id]);

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete skill'
    });
  }
};
