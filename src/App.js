import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";


function App() {
  return (
    <BrowserRouter>
      <Navbar/> 
      <Container customClass="min-height">
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/newproject" element={<NewProject/>}/>
        <Route path="/project/:id" element={<Project/>}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
      </Container>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
