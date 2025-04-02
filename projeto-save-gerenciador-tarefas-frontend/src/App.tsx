import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Task from "./pages/Task"
import UpdatePassword from "./pages/UpdatePassword"

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
      <button className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Modo Claro" : "🌙 Modo Escuro"}
      </button>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password" element={<UpdatePassword />} />
          <Route path="/task" element={<Task />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
