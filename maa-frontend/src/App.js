import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LocalSearch from "./components/LocalSearch";
import Admin from "./components/Admin";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SideBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/localSearch" element={<LocalSearch />} />
        <Route path="/admin"  element = {<Admin/>} />
      </Routes>
    </div>
  );
}

export default App;
