import { Route, Routes } from "react-router-dom"
import Authpage from "./pages/Authpage"

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Authpage/>}/>
      </Routes>
    </div>
  )
}

export default App
