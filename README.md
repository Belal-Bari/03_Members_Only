# Club Blog App 📝

A Node.js and Express-based web application that allows users to sign up, log in, and share blog posts. Users can also join a club, apply for admin status, and manage content based on their roles.

## 📌 Features

- User authentication with Passport.js (Local Strategy)
- Secure password hashing using bcrypt
- Blog post creation and deletion
- Role-based access: Members & Admins
- Member-only club access via secret code
- Admin role assignment with a different secret code
- EJS templating engine for dynamic views
- PostgreSQL database for persistent storage

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Authentication:** Passport.js (Local Strategy)
- **Database:** PostgreSQL (with `pg` node module)
- **Templating Engine:** EJS
- **Environment Variables:** `dotenv`
- **Security:** bcrypt for password hashing
- **Session Management:** express-session

---

## 🏗️ Project Structure

project-root/
├── db/
│ ├── auth.js # Passport strategy setup
│ ├── pool.js # PostgreSQL pool configuration
│ └── queries.js # All database query functions
├── routes/
│ └── blogRouter.js # All app routes
├── views/
│ ├── index.ejs
│ ├── sign-up-page.ejs
│ ├── login-page.ejs
│ ├── create-post.ejs
│ ├── join-club.ejs
│ └── admin.ejs
├── app.js
├── package.json
├── package-lock.json
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/club-blog-app.git
cd club-blog-app

2. Install Dependencies

npm install

3. Set Up Environment Variables
Create a .env file in the root directory with the following keys:

PORT=3000
SECRETMEMBERCODE=yourmembercode
SECRETADMINCODE=youradmincode

Make sure PostgreSQL is set up and you have a working database with members and posts tables.

4. Run the App

npm start

Database Schema
Table: members
| Column     | Type      | Description              |
| ---------- | --------- | ------------------------ |
| id         | SERIAL PK | Unique user ID           |
| name       | TEXT      | Full name of the user    |
| username   | TEXT      | Email (login credential) |
| password   | TEXT      | Hashed password          |
| is\_member | BOOLEAN   | Membership status        |
| is\_admin  | BOOLEAN   | Admin status             |

Table: posts
| Column | Type       | Description             |
| ------ | ---------- | ----------------------- |
| id     | SERIAL PK  | Unique post ID          |
| post   | TEXT       | Post content            |
| author | INTEGER FK | Author ID (members.id)  |
| date   | TIMESTAMP  | Auto-inserted post time |

 Authentication Logic
Signup: User creates account and password is hashed using bcrypt.

Login: Passport local strategy validates username/password.

Session: express-session keeps the user logged in.

Authorization:

Member: Must enter a secret member code.

Admin: Must enter a secret admin code.

Conditional rendering based on user status.

✏️ Routes Overview
Public Routes
/ – View all posts

/sign-up – User registration

/login – Login page

/logout – Logout user

Protected Routes
/create-post – Create a new blog post

/join-club – Enter member secret code

/admin – Enter admin secret code

/delete/:id – Delete a post (only for admin)

📷 Screenshots

👩‍💻 Author
Developed by S M Belal Bin Bari


