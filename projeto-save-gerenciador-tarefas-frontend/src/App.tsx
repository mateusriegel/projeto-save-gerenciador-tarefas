import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Task from "./pages/Task"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<Task />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
