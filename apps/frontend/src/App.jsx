import { Route, Routes } from "react-router-dom"
import Authpage from "./pages/Authpage"
import Dasboard from "./pages/Dasboard"
import Roomspage from "./pages/Roomspage"

function App() {
  return (
    <div className="h-screen w-screen">
      {/* <Routes>
        <Route path="/" element={<Authpage/>}/>
        <Route path="/dashboard" element={<Dasboard/>}/>
      </Routes> */}
      <Roomspage/>
    </div>
  )
}

export default App
