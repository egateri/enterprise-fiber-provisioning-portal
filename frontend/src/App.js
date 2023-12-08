import Home from "./components/home/Home";
import Register from "./components/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home />}></Route>
        {/* <Route path="/" element={<Login />}></Route> */}
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;