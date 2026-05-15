# IT_HelpDesk_Ticket
# IT Helpdesk Ticketing System

A full-stack IT Helpdesk application where users can create support tickets and admins can manage and resolve them.

## 🚀 Live Demo
Frontend: https://it-help-desk-ticket.vercel.app/
Backend: https://it-helpdesk-ticket-backend.onrender.com/

## 📌 Features
- User authentication (JWT-based login/signup)
- Role-based access (User & Admin)
- Create, view, and manage support tickets
- Ticket status flow: Open → In Progress → Resolved
- Admin dashboard to manage all tickets
- Real-time stats (total, open, in-progress, resolved)

## 🛠️ Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JWT
- Deployment: Vercel (frontend), Render (backend)

## 📂 Project Structure
/client → React frontend  
/server → Express backend  

## ⚙️ Installation (Local Setup)

### 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git

### 2. Backend setup
cd server  
npm install  
npm run dev  

### 3. Frontend setup
cd client  
npm install  
npm start  

## 🔐 Environment Variables

Create a .env file in /server:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

## 📸 Screenshots
<img width="380" height="250" alt="Screenshot 2026-05-15 at 17 05 51" src="https://github.com/user-attachments/assets/d90b9fb1-fb75-417b-b541-220c6f6ae0c6" />
<img width="380" height="250" alt="Screenshot 2026-05-15 at 17 07 20" src="https://github.com/user-attachments/assets/17b6dcee-38c4-4502-b35d-ef92eda218cc" />
<img width="380" height="250" alt="Screenshot 2026-05-15 at 17 06 26" src="https://github.com/user-attachments/assets/0a4d15d7-e5db-463b-b3fe-ec788bf27597" />
<img width="380" height="250" alt="Screenshot 2026-05-15 at 17 06 52" src="https://github.com/user-attachments/assets/ab3dc63e-0f49-4fea-8f3e-bb5ff28465e0" />



## 🎯 Future Improvements
- Search and filter tickets  
- Assign tickets to admins  
- Email notifications  

## 👨‍💻 Author
Dhruv Sahni
