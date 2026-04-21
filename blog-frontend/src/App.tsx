
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Home'
import { Posts } from './pages/Posts'
import { Library } from './pages/Library'
import { Analytics } from './pages/Analytics'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/home/posts" element={<Posts />} />
      <Route path="/home/libraries" element={<Library />} />
      <Route path="/home/analytics" element={<Analytics />} />
      <Route path="/dashboard/*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
