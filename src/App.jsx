import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollProgress from "./components/common/ScrollProgress";
import BackToTop from "./components/common/BackToTop";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Profiles from "./components/sections/Profiles";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Conferences from "./components/sections/Conferences";
import Skills from "./components/sections/Skills";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollProgress />
      <Layout>
        <Hero />
        <About />
        <Profiles />
        <Experience />
        <Education />
        <Conferences />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </Layout>
      <BackToTop />
    </BrowserRouter>
  );
}