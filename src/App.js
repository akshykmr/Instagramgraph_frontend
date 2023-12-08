import "./App.css";
import Login from "../../client/src/components/Login";
import FacebookPageData from "../../client/src/components/FacebookData";
import Success from './components/Success'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth" element={<FacebookPageData />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
