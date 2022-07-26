import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LocalSearch from "./components/LocalSearch";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SideBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/localSearch" element={<LocalSearch />} />
      </Routes>
    </div>
  );
}

export default App;
