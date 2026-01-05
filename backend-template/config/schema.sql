-- Portfolio Database Schema for MySQL

CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  tech_stack JSON,
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  proficiency INT DEFAULT 80,
  icon VARCHAR(50),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  issue_date DATE,
  credential_url TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  period VARCHAR(100) NOT NULL,
  description JSON,
  technologies JSON,
  experience_type VARCHAR(50) DEFAULT 'job',
  is_current BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Profile settings table
CREATE TABLE IF NOT EXISTS profile_settings (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  hero_name VARCHAR(255),
  hero_title VARCHAR(255),
  hero_subtitle VARCHAR(255),
  hero_bio TEXT,
  hero_background_url TEXT,
  avatar_url TEXT,
  about_intro TEXT,
  about_description TEXT,
  about_image_url TEXT,
  about_education_primary TEXT,
  about_education_secondary TEXT,
  career_goals JSON,
  github_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  twitter_url VARCHAR(500),
  email VARCHAR(255),
  stat_years_experience VARCHAR(50),
  stat_projects_completed VARCHAR(50),
  stat_technologies VARCHAR(50),
  stat_client_satisfaction VARCHAR(50),
  footer_tagline TEXT,
  footer_location VARCHAR(255),
  footer_copyright TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resume settings table
CREATE TABLE IF NOT EXISTS resume_settings (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  file_url TEXT,
  file_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123 - change in production!)
-- Password hash is for 'admin123' using bcrypt
INSERT INTO users (id, email, password, full_name) VALUES 
(UUID(), 'admin@example.com', '$2a$10$rQEY2JLgJE2JD0VqJQz8VOvQm5fxsEXoTtUgO3j3z0aFbQP0Qm2zy', 'Admin User')
ON DUPLICATE KEY UPDATE email = email;

-- Add admin role
INSERT INTO user_roles (id, user_id, role)
SELECT UUID(), u.id, 'admin' 
FROM users u 
WHERE u.email = 'admin@example.com'
AND NOT EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = u.id AND ur.role = 'admin');

-- Insert default profile settings
INSERT INTO profile_settings (id, hero_name, hero_title, hero_subtitle, hero_bio) VALUES 
(UUID(), 'Vikas Jagtap', 'Full Stack Developer', 'Building modern web applications', 'Passionate developer with expertise in React, Node.js, and modern web technologies.')
ON DUPLICATE KEY UPDATE id = id;
