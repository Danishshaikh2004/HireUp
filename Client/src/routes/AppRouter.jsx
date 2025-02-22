import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import ApplyJob from "../pages/ApplyJob";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EmployerDashboard from "../pages/EmployerDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import NavbarComponent from "../components/NavbarComponent";
import CandidateSignUp from "../pages/CandidateSignUp";
import EmployerSignUp from "../pages/EmployerSignUp";
import Internships from "../pages/Internships";
import Courses from "../pages/Courses";
import InternshipDetails from "../pages/InternshipDetails";
import CourseDetails from "../pages/CourseDetails";
import PostManageJob from "../pages/PostManageJob";
import ViewApplications from "../pages/ViewApplications";
import CandidateProfile from "../pages/CandidateProfile";
import EmployerProfile from "../pages/EmployerProfile";
import Footer from "../components/Footer";

const AppRouter = () => {
  const location = useLocation();

  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/candidate-signup" element={<CandidateSignUp />} />
        <Route path="/employer-signup" element={<EmployerSignUp />} />
        <Route path="/internship/:id" element={<InternshipDetails />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/job-board" element={<PostManageJob />} />
        <Route path="/applications" element={<ViewApplications />} />
        <Route path="/profile/user" element={<CandidateProfile />} />
        <Route path="/profile/employer" element={<EmployerProfile />} />
      </Routes>
      {location.pathname === "/" && <Footer />}
    </>
  );
};

export default AppRouter;
