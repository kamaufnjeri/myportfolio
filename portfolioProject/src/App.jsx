import NavBar from "./components/navBar";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import AboutPage from "./components/Pages/AboutPage";
import MyBlogsPage from "./components/Pages/MyBlogsPage";
import ContactMePage from "./components/Pages/ContactMePage";
import MyProjectsPage from "./components/Pages/MyProjectsPage";
import AdminLoginPage from "./components/Pages/AdminLoginPage";
import NotFoundPage from "./components/Pages/NotFoundPage";
import AdminAddProjectPage from "./components/Pages/AdminAddProjectPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminAddToolPage from "./components/Pages/AdminAddToolPage";
import AdminProjectsPage from "./components/Pages/AdminProjectsPage";
import AdminToolsPage from "./components/Pages/AdminToolsPage";

const App = () => {
  return (
    <div className="App">
      <ToastContainer autoclose={1000} closeButton={true} position='top-right'/>
      <NavBar />
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/myprojects" element={<MyProjectsPage />} />
        <Route path="/contact" element={<ContactMePage />} />
        <Route path="/blogs" element={<MyBlogsPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/admindashboard" element={<AdminProjectsPage />} />
        <Route path="/admindashboard/tools" element={<AdminToolsPage />} />
        <Route path="/admindashboard/addproject" element={<AdminAddProjectPage />} />
        <Route path="/admindashboard/addtool" element={<AdminAddToolPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
