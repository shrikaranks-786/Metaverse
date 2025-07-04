import { Route, Routes } from "react-router-dom";
import Authpage from "./pages/Authpage";
import Dasboard from "./pages/Dasboard";
import Roomspage from "./pages/Roomspage";
import Gamepage from "./pages/Gamepage";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        {/* <Route path="/" element={<Authpage />} />
        <Route path="/dashboard" element={<Dasboard />} /> */}
        <Route path="/rooms" element={<Roomspage/>}/>
        <Route path="/rooms/:roomId" element={<Gamepage/>}/>
      </Routes>
    </div>
  );
}

export default App;
