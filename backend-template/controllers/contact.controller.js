const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get all contact submissions
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Get contact submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions'
    });
  }
};

// Create contact submission (public)
exports.create = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const id = uuidv4();
    await db.query(
      `INSERT INTO contact_submissions (id, name, email, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [id, name, email, subject, message]
    );

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Create contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
};

// Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const [existing] = await db.query('SELECT * FROM contact_submissions WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    await db.query('UPDATE contact_submissions SET is_read = TRUE WHERE id = ?', [req.params.id]);

    res.json({
      success: true,
      message: 'Marked as read'
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark as read'
    });
  }
};

// Delete submission
exports.delete = async (req, res) => {
  try {
    const [existing] = await db.query('SELECT * FROM contact_submissions WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    await db.query('DELETE FROM contact_submissions WHERE id = ?', [req.params.id]);

    res.json({
      success: true,
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete submission'
    });
  }
};
