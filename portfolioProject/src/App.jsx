import NavBar from "./Components/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
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
import AdminBlogsPage from "./Pages/AdminBlogsPage";
import AdminUpdateBlogPage from "./Pages/AdminUpdateBlogPage";
import SingleBlogPage from "./Pages/SingleBlogPage";
import AboutPage from "./Pages/AboutPage";

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
          <Route exact path="/" element={<HomePage />} />
          <Route exact path='/about' element={<AboutPage />} />
          <Route exact path="/myprojects" element={<MyProjectsPage />} />
          <Route exact path="/contact" element={<ContactMePage />} />
          <Route exact path="/blogs" element={<MyBlogsPage />} />
          <Route exact path="/blogs/:id" element={<SingleBlogPage />} />
          <Route exact path="/adminlogin" element={<AdminLoginPage />} />
          <Route exact path="/admindashboard" element={<AdminProjectsPage />} />
          <Route exact path="/admindashboard/tools" element={<AdminToolsPage />} />
          <Route exact path="/admindashboard/blogs" element={<AdminBlogsPage />} />
          <Route exact path="/admindashboard/addproject" element={<AdminAddProjectPage />} />
          <Route exact path="/admindashboard/addtool" element={<AdminAddToolPage />} />
          <Route exact path="/admindashboard/addblog" element={<AdminAddBlogPage />} />
          <Route exact path="/admindashboard/tools/:id" element={<AdminUpdateToolPage />} />
          <Route exact path="/admindashboard/projects/:id" element={<AdminUpdateProjectPage />} />
          <Route exact path="/admindashboard/blogs/:id" element={<AdminUpdateBlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
