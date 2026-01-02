# Portfolio Backend - Node.js + Express

A professional Node.js backend for the portfolio website using Express.js and Supabase.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend-template
npm install
```

### 2. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
```

Required environment variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (find in Supabase Dashboard → Settings → API)
- `JWT_SECRET`: A strong secret key for JWT tokens

### 3. Run the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

Server will start at: `http://localhost:5000`

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Admin login | ❌ |
| GET | `/api/auth/profile` | Get profile | ✅ |
| GET | `/api/auth/verify` | Verify token | ✅ |

### Projects
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | Get all projects | ❌ |
| GET | `/api/projects/:id` | Get single project | ❌ |
| POST | `/api/projects` | Create project | ✅ Admin |
| PUT | `/api/projects/:id` | Update project | ✅ Admin |
| DELETE | `/api/projects/:id` | Delete project | ✅ Admin |

### Skills
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/skills` | Get all skills | ❌ |
| GET | `/api/skills/:id` | Get single skill | ❌ |
| POST | `/api/skills` | Create skill | ✅ Admin |
| PUT | `/api/skills/:id` | Update skill | ✅ Admin |
| DELETE | `/api/skills/:id` | Delete skill | ✅ Admin |

### Certificates
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/certificates` | Get all certificates | ❌ |
| GET | `/api/certificates/:id` | Get single certificate | ❌ |
| POST | `/api/certificates` | Create certificate | ✅ Admin |
| PUT | `/api/certificates/:id` | Update certificate | ✅ Admin |
| DELETE | `/api/certificates/:id` | Delete certificate | ✅ Admin |

### Experiences
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/experiences` | Get all experiences | ❌ |
| GET | `/api/experiences/:id` | Get single experience | ❌ |
| POST | `/api/experiences` | Create experience | ✅ Admin |
| PUT | `/api/experiences/:id` | Update experience | ✅ Admin |
| DELETE | `/api/experiences/:id` | Delete experience | ✅ Admin |

## 🔐 Authentication

### Login Request
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "your-password"}'
```

### Using Token
```bash
curl http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📁 Project Structure

```
backend-template/
├── config/
│   ├── supabase.js      # Supabase client setup
│   └── jwt.js           # JWT configuration
├── controllers/
│   ├── auth.controller.js
│   ├── project.controller.js
│   ├── skill.controller.js
│   ├── certificate.controller.js
│   └── experience.controller.js
├── middlewares/
│   └── auth.middleware.js
├── routes/
│   ├── auth.routes.js
│   ├── project.routes.js
│   ├── skill.routes.js
│   ├── certificate.routes.js
│   └── experience.routes.js
├── server.js
├── package.json
├── .env.example
└── README.md
```

## 🛡️ Security Features

- JWT-based authentication
- Role-based access control (Admin only)
- Service role key for backend operations
- Input validation
- Error handling middleware
- CORS enabled

## 📝 Example API Usage

### Create a Project (Admin)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My Project",
    "description": "A cool project",
    "tech_stack": ["React", "Node.js"],
    "github_url": "https://github.com/...",
    "featured": true
  }'
```

### Get All Projects (Public)
```bash
curl http://localhost:5000/api/projects
```

## 🔧 Connecting Frontend

Update your frontend API calls to use this backend:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Example: Fetch projects
const response = await fetch(`${API_BASE_URL}/projects`);
const data = await response.json();
```

## 📄 License

MIT License
