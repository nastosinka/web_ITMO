import './App.module.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "../AuthPage/LoginPage.jsx";
import RegisterPage from "../AuthPage/RegisterPage.jsx";
import MainPage from "../MainPage/MainPage.jsx";

export default function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/main" element={<MainPage/>}/>
          </Routes>
        </Router>
      </>
  );
}
