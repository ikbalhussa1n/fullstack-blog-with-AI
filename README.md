<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/AI-Groq%20LLaMA-FF6B6B?style=for-the-badge&logo=meta&logoColor=white" />
</p>

# ✍️ AI Blog Platform

A premium, full-stack blogging platform with **AI-powered content generation**. Built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with the Groq API (LLaMA 3) to help writers produce high-quality blog content effortlessly.

> **Write Smarter** — Discover, create, and share insightful articles with the help of AI.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots--demo)
- [Contributing](#-contributing)
- [License](#-license)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## Overview

AI Blog Platform is a modern, responsive web application designed for bloggers, content creators, and tech enthusiasts who want to leverage AI to accelerate their writing workflow. Users can register, create blog posts with cover images, browse community content, and use a built-in AI writer to generate professional blog drafts on any topic.

### Target Users

- **Bloggers & Content Creators** — streamline content production with AI assistance
- **Developers & Tech Writers** — share technical tutorials with beautiful formatting
- **Platform Administrators** — moderate content with a dedicated admin dashboard and reporting system

---

## ✨ Features

### Core Blogging
- 📝 **Create, Read, Update, Delete** — Full CRUD operations for blog posts
- 🖼️ **Image Uploads** — Cover images for blogs and profile avatars via Cloudinary CDN
- 📂 **Category System** — Organize posts by Technology, AI & ML, Web Development, Lifestyle, and more
- 👤 **User Profiles** — View and manage personal profile with avatar

### AI-Powered Writing
- 🤖 **AI Content Generator** — Generate blog content from a topic using Groq's LLaMA 3 model
- ✏️ **Insert & Edit** — Preview AI-generated content before inserting it into the editor
- ⚡ **Real-time Generation** — Fast inference via Groq API for near-instant results

### Authentication & Security
- 🔐 **JWT Authentication** — Secure cookie-based token authentication (HTTP-only cookies)
- 🔒 **Password Hashing** — bcrypt encryption for user passwords
- 🛡️ **Protected Routes** — Route guards for authenticated and admin-only pages
- 🍪 **Secure Cookies** — HTTP-only, SameSite cookie configuration

### Administration
- 🚩 **Content Reporting** — Users can flag inappropriate blog posts
- 📊 **Admin Dashboard** — Review and manage reported content
- ✅ **Resolve / Delete** — Admins can resolve reports or permanently remove flagged posts
- 👑 **Role-Based Access** — Admin and User roles with different permissions

### UI/UX
- 🌗 **Dark / Light Mode** — Theme toggle with system preference detection and localStorage persistence
- 📱 **Fully Responsive** — Mobile-first design with collapsible sidebar navigation
- ✨ **Smooth Animations** — Framer Motion transitions and micro-animations
- 🎨 **Premium Design** — ShadCN UI components, Tailwind CSS v4, Lucide icons
- 🔔 **Toast Notifications** — Real-time feedback with react-toastify

### Informational Pages
- ℹ️ About, Contact Us, Privacy Policy, Terms of Service, Cookie Policy

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI library (SPA with component architecture) |
| **Vite 7** | Build tool & dev server (HMR) |
| **React Router v7** | Client-side routing & navigation |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **ShadCN UI** | Radix-based accessible component library |
| **Framer Motion** | Animation library |
| **Axios** | HTTP client for API communication |
| **Lucide React** | Icon library |
| **React Toastify** | Toast notification system |
| **Groq API** | AI content generation (client-side) |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web framework for REST API |
| **MongoDB Atlas** | Cloud NoSQL database |
| **Mongoose 9** | MongoDB ODM for schema modeling |
| **Cloudinary** | Cloud image storage & CDN |
| **JSON Web Tokens** | Stateless authentication |
| **bcrypt** | Password hashing |
| **Multer** | Multipart file upload handling |
| **cookie-parser** | Cookie parsing middleware |
| **dotenv** | Environment variable management |
| **Nodemon** | Development auto-restart |

---

## 📁 Project Structure

```
fullstack-blog-with-AI/
├── backend/                          # Express.js REST API
│   ├── config/
│   │   └── cloudinary.js             # Cloudinary SDK configuration
│   ├── controller/
│   │   ├── blog.controller.js        # Blog CRUD logic
│   │   └── user.controller.js        # User auth & profile logic
│   ├── jwt/
│   │   └── authToken.js              # JWT creation & cookie management
│   ├── middlewares/
│   │   ├── multer.js                 # File upload config (memory storage, 5MB limit)
│   │   └── userAuth.js               # Authentication middleware (token verification)
│   ├── models/
│   │   ├── blogs.model.js            # Blog schema (title, content, category, image, report)
│   │   └── users.model.js            # User schema (name, email, password, photo, role)
│   ├── routes/
│   │   ├── blog.route.js             # Blog API route definitions
│   │   └── user.route.js             # User API route definitions
│   ├── .env                          # Environment variables (not committed)
│   ├── index.js                      # App entry point (Express server + DB connection)
│   └── package.json                  # Backend dependencies
│
├── frontend/                         # React SPA (Vite)
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx        # Top navigation bar with theme toggle
│   │   │   │   └── Footer.jsx        # Site footer with links
│   │   │   ├── ui/                   # ShadCN UI primitives (Button, Sidebar, Sheet, etc.)
│   │   │   ├── AdminRoute.jsx        # Admin-only route guard
│   │   │   ├── ProtectedRoute.jsx    # Auth-required route guard
│   │   │   └── app-sidebar.jsx       # Collapsible sidebar navigation
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Global authentication state (React Context)
│   │   ├── hooks/
│   │   │   ├── useDarkMode.js        # Dark/light theme toggle hook
│   │   │   └── use-mobile.ts         # Mobile viewport detection hook
│   │   ├── layouts/
│   │   │   └── AppLayout.jsx         # Main layout shell (sidebar + navbar + footer)
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Public blog feed with search & filters
│   │   │   ├── BlogDetail.jsx        # Single blog view with report action
│   │   │   ├── CreateBlog.jsx        # Blog creation form with AI Writer panel
│   │   │   ├── EditBlog.jsx          # Blog editing form
│   │   │   ├── Dashboard.jsx         # User's personal blog management
│   │   │   ├── AdminDashboard.jsx    # Admin panel for reported content
│   │   │   ├── Profile.jsx           # User profile page
│   │   │   ├── Login.jsx             # Sign-in page (standalone layout)
│   │   │   ├── Register.jsx          # Sign-up page with avatar upload
│   │   │   ├── About.jsx             # About page
│   │   │   ├── ContactUs.jsx         # Contact form page
│   │   │   ├── Privacy.jsx           # Privacy policy
│   │   │   ├── TermsOfService.jsx    # Terms of service
│   │   │   ├── Cookies.jsx           # Cookie policy
│   │   │   └── Error404.jsx          # 404 not found page
│   │   ├── services/
│   │   │   ├── api.js                # Axios instance with base URL & interceptors
│   │   │   ├── auth.service.js       # Auth API calls (login, register, logout, profile)
│   │   │   ├── blog.service.js       # Blog API calls (CRUD operations)
│   │   │   └── ai.service.js         # Groq AI integration (content generation)
│   │   ├── lib/
│   │   │   └── utils.ts              # Utility functions (cn class merger)
│   │   ├── App.jsx                   # Root component with routing configuration
│   │   ├── main.jsx                  # React DOM entry point
│   │   └── index.css                 # Global styles & Tailwind directives
│   ├── .env                          # Frontend environment variables (not committed)
│   ├── .env.example                  # Environment variable template
│   ├── index.html                    # HTML entry point with SEO meta tags
│   ├── vite.config.js                # Vite configuration with Tailwind plugin
│   └── package.json                  # Frontend dependencies
│
├── .gitattributes
└── README.md                         # ← You are here
```

---

## 📌 Prerequisites

Ensure you have the following installed:

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **npm** v9+ (included with Node.js)
- **MongoDB Atlas** account — [Sign up](https://www.mongodb.com/atlas) (or a local MongoDB instance)
- **Cloudinary** account — [Sign up](https://cloudinary.com/) (for image hosting)
- **Groq API Key** *(optional)* — [Get key](https://console.groq.com/) (for AI content generation)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ikbalhussa1n/fullstack-blog-with-AI.git
cd fullstack-blog-with-AI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET_KEY=your_strong_secret_key
```

Start the backend server:

```bash
npm start
```

The API server will start at `http://localhost:3000`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory (use `.env.example` as a template):

```env
VITE_API_URL=http://localhost:3000
VITE_GROQ_API_KEY=your_groq_api_key_here   # Optional: enables AI Writer
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Build for Production

```bash
cd frontend
npm run build
npm run preview
```

---

## 💻 Usage

### User Workflow

1. **Register** — Create an account with name, email, password, and a profile photo
2. **Browse** — Explore the home feed to discover blog posts across categories
3. **Create** — Navigate to "Write Blog" to compose a new post with a cover image
4. **AI Assist** — Click the **AI Writer** button, enter a topic, and generate content instantly
5. **Manage** — Use the Dashboard to view, edit, or delete your published posts
6. **Report** — Flag inappropriate content for admin review

### Admin Workflow

1. **Sign in** with an admin account (role: `admin` in the database)
2. Access the **Admin Panel** from the sidebar
3. Review flagged/reported blog posts
4. **Resolve** reports (clear the flag) or **Delete** the offending post

---

## 📡 API Endpoints

### Authentication — `/user`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/user/signup` | ❌ | Register a new user (multipart: name, email, password, photo) |
| `POST` | `/user/signin` | ❌ | Login with email & password (sets HTTP-only cookie) |
| `GET` | `/user/signout` | ✅ | Logout and clear auth cookie |
| `GET` | `/user/my-profile` | ✅ | Fetch authenticated user's profile |
| `GET` | `/user/get-user/:id` | ❌ | Fetch a user's public info (name, photo) |

### Blog Posts — `/blog`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/blog/create` | ✅ | Create a new blog post (multipart: title, category, content, imageBlog) |
| `GET` | `/blog/all` | ❌ | Fetch all blog posts (populated with author info) |
| `GET` | `/blog/myBlogs` | ✅ | Fetch authenticated user's blog posts |
| `GET` | `/blog/singleBlog/:id` | ❌ | Fetch a single blog post by ID |
| `PUT` | `/blog/update/:id` | ✅ | Update a blog post (author or admin only) |
| `DELETE` | `/blog/delete/:id` | ✅ | Delete a blog post and its Cloudinary image (author or admin only) |

### AI Content Generation (Client-Side)

| Service | Model | Description |
|---------|-------|-------------|
| Groq API | `llama3-8b-8192` | Generates 300–600 word blog drafts from a user-provided topic |

> **Note:** The AI service runs entirely client-side via the Groq REST API. No backend proxy is required.

---

## 📸 Screenshots / Demo

> **Suggested screenshot locations for visual documentation:**
>
> | Screenshot | Description |
> |---|---|
> | Home Page | Blog feed with category filters and search |
> | Create Blog + AI Writer | The blog creation form with the AI panel open |
> | Blog Detail | Single post view with author info and report button |
> | User Dashboard | Personal blog management grid |
> | Admin Dashboard | Reported content moderation panel |
> | Login / Register | Authentication pages (standalone fullscreen layout) |
> | Dark Mode | The app in dark theme |
> | Mobile View | Responsive sidebar and layout on mobile |
>
> *Add screenshots to a `/screenshots` directory and reference them here.*

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with clear messages:
   ```bash
   git commit -m "feat: add comment system to blog posts"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against `main` with a description of your changes

### Guidelines

- Follow existing code style and project structure
- Write meaningful commit messages (consider [Conventional Commits](https://www.conventionalcommits.org/))
- Test your changes locally before submitting
- Update documentation if adding new features or environment variables

---

## 📄 License

This project is licensed under the **ISC License**.

> The ISC License is a permissive open-source license functionally equivalent to the MIT License.

---

## 🔮 Future Improvements

Based on the current codebase, the following enhancements could elevate the platform:

| Area | Improvement |
|---|---|
| **Comments & Engagement** | Add a comment system with nested replies and likes |
| **Rich Text Editor** | Replace the textarea with a WYSIWYG or Markdown editor (e.g., TipTap, MDXEditor) |
| **Search & Filtering** | Implement server-side full-text search and pagination |
| **User Profiles** | Allow profile editing (name, avatar, bio) from the frontend |
| **Image Upload on Edit** | Support changing cover images when editing a blog post |
| **Rate Limiting** | Add API rate limiting to prevent abuse |
| **Input Validation** | Add server-side validation with a library like Joi or Zod |
| **Testing** | Add unit tests (Jest) and integration tests (Supertest, Cypress) |
| **Email Verification** | Verify user email addresses during registration |
| **Social Features** | Add bookmarks, likes, followers, and a reading list |
| **SEO** | Server-side rendering or static generation for public pages (Next.js migration) |
| **CI/CD** | Set up GitHub Actions for linting, testing, and deployment |
| **Deployment** | Deploy backend to Railway/Render, frontend to Vercel/Netlify |
| **Password Reset** | Implement forgot password flow with email OTP |
| **Backend .gitignore** | Add a `.gitignore` to the backend directory to exclude `node_modules/` and `.env` |

---

## 👤 Author

**Ikbalhussa1n**

- GitHub: [@ikbalhussa1n](https://github.com/ikbalhussa1n)

---

<p align="center">
  Made with ❤️ using the MERN Stack + AI
</p>
