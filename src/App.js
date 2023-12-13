import "./App.css";
import Login from "././components/auth/Login";
import Register from "././components/auth/Register";
import Home from './components/Home'
import TokenGenerator from "./components/TokenGenerator";
import Success from './components/Success'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/auth" element={<TokenGenerator />} />
          <Route path="/success" element={<Success />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
