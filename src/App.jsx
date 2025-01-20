import TopBar from "./Components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/settings/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./users/page";
import { useContext } from "react";
import { Context } from "./auth/context";
import About from "./Components/about/About";
import Contact from "./Components/contact/Contact";

function App() {
  const {user} = useContext(Context)
  // const user = false;
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/setting" element={user ? <Setting /> : <Register />} />
        <Route path="/post/:postId" element={<Single/>} />
      </Routes>
    </Router>
  );
}

export default App;
