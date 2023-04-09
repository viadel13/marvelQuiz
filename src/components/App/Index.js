import "../../App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../Header";
import Accueil from "../Accueil";
import Footer from "../Footer";
import Welcome from "../Welcome/Index";
import Login from "../Login/Index";
import SignUp from "../SignUp/Index";
import ErrorPage from "../ErrorPage/Index";
import ForgetPassword from "../ForgetPassword/Index";
import { IconContext } from "react-icons";

function App() {
  return (
    <>
      <Router>
        <IconContext.Provider value={{style : {verticalAlign: 'middle'}}}>
          <Header />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </IconContext.Provider>
      </Router>
      <ToastContainer draggable={false} />
    </>
  );
}

export default App;
