# 🎥 YouTube Clone - React 19

A high-performance YouTube clone built to simulate the core features of the global platform. This project focuses on handling real-time data from the **YouTube Data API v3** and managing global state effectively using **Redux Toolkit**, with a modern UI powered by **Tailwind CSS v4**.

---

## 🚀 Live Demo
Experience the application here: [YouTube Clone Live Demo](https://youtube-clone-sigma-silk.vercel.app/#)

---

## 🎯 Project Scope & Features
The goal of this project was to go beyond static UI and implement complex logic. I focused on the most essential parts of the YouTube experience:

- **Core Pages:** Home, Explore, and Search results with real-time data.
- **Library Management:** Users can manage **Liked Videos**, **Watch Later**, and custom **Playlists**.
- **User Interactions:** Interactive **Subscriptions** and **Notifications** systems.
- **Simulated Downloads:** A dedicated section to manage downloaded videos.
- **Persistence:** All user-specific data (playlists, subscriptions, etc.) is preserved using **Local Storage**, ensuring data isn't lost after a page refresh.
- **Enhanced UX:** Smooth UI transitions with **Skeleton Loading** and interactive notifications via **React-Hot-Toast**.

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/) (Vite)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching:** [YouTube Data API v3](https://developers.google.com/youtube/v3) via Axios
- **Video Player:** [React Player](https://www.npmjs.com/package/react-player)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Routing:** [React Router Dom v7](https://reactrouter.com/)

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Abdallah-Mushtaha/YouTube-Clone.git](https://github.com/Abdallah-Mushtaha/YouTube-Clone)
Navigate to the directory:

Bash
cd YouTube-Clone
Install dependencies:

Bash
npm install
Environment Variables:
Create a .env file in the root and add your YouTube API Key:


VITE_YOUTUBE_API_KEY=your_api_key_here
Run the project:

Bash
npm run dev
📂 Project Structure Snippet
The project leverages a clean architecture for scalability:

src/features: Redux slices for state management.

src/components: Reusable UI components (Sidebar, Navbar, VideoCard).

src/hooks: Custom hooks for API calls and Local Storage logic.

src/pages: Main view components (Home, Search, Library).

🤝 Contributing
Feedback and suggestions are always welcome! Feel free to open an issue or submit a pull request.

Developed by Abdallah Mushtaha
