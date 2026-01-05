require('dotenv').config();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Check if admin user exists
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [process.env.ADMIN_EMAIL || 'admin@example.com']
    );

    if (existingUsers.length > 0) {
      console.log('✅ Admin user already exists');
    } else {
      // Create admin user
      const adminId = uuidv4();
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || 'admin123',
        10
      );

      await db.query(
        'INSERT INTO users (id, email, password, full_name) VALUES (?, ?, ?, ?)',
        [adminId, process.env.ADMIN_EMAIL || 'admin@example.com', hashedPassword, 'Admin User']
      );

      // Add admin role
      await db.query(
        'INSERT INTO user_roles (id, user_id, role) VALUES (?, ?, ?)',
        [uuidv4(), adminId, 'admin']
      );

      console.log('✅ Admin user created');
      console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@example.com'}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    }

    // Check if profile settings exist
    const [existingProfile] = await db.query('SELECT * FROM profile_settings LIMIT 1');

    if (existingProfile.length > 0) {
      console.log('✅ Profile settings already exist');
    } else {
      // Create default profile settings
      await db.query(
        `INSERT INTO profile_settings (id, hero_name, hero_title, hero_subtitle, hero_bio, email) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          uuidv4(),
          'Vikas Jagtap',
          'Full Stack Developer',
          'Building modern web applications',
          'Passionate developer with expertise in React, Node.js, and modern web technologies.',
          'vikasjagtap.9696@gmail.com'
        ]
      );
      console.log('✅ Default profile settings created');
    }

    console.log('🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
