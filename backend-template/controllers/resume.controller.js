const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get resume settings
exports.get = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM resume_settings LIMIT 1');

    res.json({
      success: true,
      data: rows.length > 0 ? rows[0] : null
    });
  } catch (error) {
    console.error('Get resume settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resume settings'
    });
  }
};

// Update resume settings
exports.update = async (req, res) => {
  try {
    const { file_url, file_name } = req.body;

    const [existing] = await db.query('SELECT * FROM resume_settings LIMIT 1');

    if (existing.length === 0) {
      const id = uuidv4();
      await db.query(
        'INSERT INTO resume_settings (id, file_url, file_name) VALUES (?, ?, ?)',
        [id, file_url, file_name]
      );

      const [rows] = await db.query('SELECT * FROM resume_settings WHERE id = ?', [id]);
      return res.status(201).json({
        success: true,
        message: 'Resume settings created successfully',
        data: rows[0]
      });
    }

    await db.query(
      'UPDATE resume_settings SET file_url = ?, file_name = ? WHERE id = ?',
      [file_url || existing[0].file_url, file_name || existing[0].file_name, existing[0].id]
    );

    const [rows] = await db.query('SELECT * FROM resume_settings WHERE id = ?', [existing[0].id]);

    res.json({
      success: true,
      message: 'Resume settings updated successfully',
      data: rows[0]
    });
  } catch (error) {
    console.error('Update resume settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update resume settings'
    });
  }
};
