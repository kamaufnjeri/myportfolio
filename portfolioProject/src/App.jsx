import NavBar from "./Components/navBar";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import MyBlogsPage from "./Pages/MyBlogsPage";
import ContactMePage from "./Pages/ContactMePage";
import MyProjectsPage from "./Pages/MyProjectsPage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import NotFoundPage from "./Pages/NotFoundPage";
import AdminAddProjectPage from "./Pages/AdminAddProjectPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAddToolPage from "./Pages/AdminAddToolPage";
import AdminProjectsPage from "./Pages/AdminProjectsPage";
import AdminToolsPage from "./Pages/AdminToolsPage";
import AdminUpdateToolPage from "./Pages/AdminUpdateToolPage";
import AdminUpdateProjectPage from "./Pages/AdminUpdateProjectPage";
import AdminAddBlogPage from "./Pages/AdminAddBlogPage";

const App = () => {
  return (
    <div className="App">
      <ToastContainer
        autoclose={1000}
        closeButton={true}
        position="top-right"
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<AboutPage />} />

        <Route path="/myprojects" element={<MyProjectsPage />} />
        <Route path="/contact" element={<ContactMePage />} />
        <Route path="/blogs" element={<MyBlogsPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/admindashboard" element={<AdminProjectsPage />} />
        <Route path="/admindashboard/tools" element={<AdminToolsPage />} />
        <Route
          path="/admindashboard/addproject"
          element={<AdminAddProjectPage />}
        />
        <Route path="/admindashboard/addtool" element={<AdminAddToolPage />} />
        <Route path="/admindashboard/addblog" element={<AdminAddBlogPage />} />
        <Route path="/admindashboard/tools/:id" element={<AdminUpdateToolPage />} />
        <Route path="/admindashboard/projects/:id" element={<AdminUpdateProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
