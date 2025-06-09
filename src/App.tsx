import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/Login/LoginPage"
import DocumentsPage from "./pages/Documents/DocumentsPage"
import ProtectedRoute from "./components/ProtectedRoute"


const App = () => {
  return (
    <div>
        <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route element={<ProtectedRoute />}>
    <Route path="/app/documents" element={<DocumentsPage />} />
  </Route>
</Routes>


    </div>
  )
}

export default App
