const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get all certificates
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM certificates ORDER BY display_order ASC'
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates'
    });
  }
};

// Get single certificate
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM certificates WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificate'
    });
  }
};

// Create certificate
exports.create = async (req, res) => {
  try {
    const { title, issuer, issue_date, credential_url, image_url, display_order } = req.body;

    if (!title || !issuer) {
      return res.status(400).json({
        success: false,
        message: 'Title and issuer are required'
      });
    }

    const id = uuidv4();
    await db.query(
      `INSERT INTO certificates (id, title, issuer, issue_date, credential_url, image_url, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, title, issuer, issue_date, credential_url, image_url, display_order || 0]
    );

    const [rows] = await db.query('SELECT * FROM certificates WHERE id = ?', [id]);

    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      data: rows[0]
    });
  } catch (error) {
    console.error('Create certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create certificate'
    });
  }
};

// Update certificate
exports.update = async (req, res) => {
  try {
    const { title, issuer, issue_date, credential_url, image_url, display_order } = req.body;

    const [existing] = await db.query('SELECT * FROM certificates WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    await db.query(
      `UPDATE certificates SET title = ?, issuer = ?, issue_date = ?, credential_url = ?, image_url = ?, display_order = ? WHERE id = ?`,
      [
        title || existing[0].title,
        issuer || existing[0].issuer,
        issue_date !== undefined ? issue_date : existing[0].issue_date,
        credential_url !== undefined ? credential_url : existing[0].credential_url,
        image_url !== undefined ? image_url : existing[0].image_url,
        display_order !== undefined ? display_order : existing[0].display_order,
        req.params.id
      ]
    );

    const [rows] = await db.query('SELECT * FROM certificates WHERE id = ?', [req.params.id]);

    res.json({
      success: true,
      message: 'Certificate updated successfully',
      data: rows[0]
    });
  } catch (error) {
    console.error('Update certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update certificate'
    });
  }
};

// Delete certificate
exports.delete = async (req, res) => {
  try {
    const [existing] = await db.query('SELECT * FROM certificates WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    await db.query('DELETE FROM certificates WHERE id = ?', [req.params.id]);

    res.json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (error) {
    console.error('Delete certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete certificate'
    });
  }
};
