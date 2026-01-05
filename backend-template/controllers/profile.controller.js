const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get profile settings
exports.get = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM profile_settings LIMIT 1');

    if (rows.length === 0) {
      return res.json({
        success: true,
        data: null
      });
    }

    const profile = {
      ...rows[0],
      career_goals: rows[0].career_goals ? JSON.parse(rows[0].career_goals) : []
    };

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Get profile settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile settings'
    });
  }
};

// Update profile settings
exports.update = async (req, res) => {
  try {
    const [existing] = await db.query('SELECT * FROM profile_settings LIMIT 1');

    const fields = [
      'hero_name', 'hero_title', 'hero_subtitle', 'hero_bio', 'hero_background_url',
      'avatar_url', 'about_intro', 'about_description', 'about_image_url',
      'about_education_primary', 'about_education_secondary', 'career_goals',
      'github_url', 'linkedin_url', 'twitter_url', 'email',
      'stat_years_experience', 'stat_projects_completed', 'stat_technologies', 'stat_client_satisfaction',
      'footer_tagline', 'footer_location', 'footer_copyright'
    ];

    if (existing.length === 0) {
      // Insert new profile
      const id = uuidv4();
      const values = fields.map(field => {
        if (field === 'career_goals' && req.body[field]) {
          return JSON.stringify(req.body[field]);
        }
        return req.body[field] || null;
      });

      await db.query(
        `INSERT INTO profile_settings (id, ${fields.join(', ')}) VALUES (?, ${fields.map(() => '?').join(', ')})`,
        [id, ...values]
      );

      const [rows] = await db.query('SELECT * FROM profile_settings WHERE id = ?', [id]);
      const profile = {
        ...rows[0],
        career_goals: rows[0].career_goals ? JSON.parse(rows[0].career_goals) : []
      };

      return res.status(201).json({
        success: true,
        message: 'Profile settings created successfully',
        data: profile
      });
    }

    // Update existing profile
    const updates = [];
    const values = [];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = ?`);
        if (field === 'career_goals') {
          values.push(JSON.stringify(req.body[field]));
        } else {
          values.push(req.body[field]);
        }
      }
    });

    if (updates.length > 0) {
      values.push(existing[0].id);
      await db.query(
        `UPDATE profile_settings SET ${updates.join(', ')} WHERE id = ?`,
        values
      );
    }

    const [rows] = await db.query('SELECT * FROM profile_settings WHERE id = ?', [existing[0].id]);
    const profile = {
      ...rows[0],
      career_goals: rows[0].career_goals ? JSON.parse(rows[0].career_goals) : []
    };

    res.json({
      success: true,
      message: 'Profile settings updated successfully',
      data: profile
    });
  } catch (error) {
    console.error('Update profile settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile settings'
    });
  }
};
