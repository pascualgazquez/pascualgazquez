import Hero from "../Components/Hero/Hero";
import Projects from "../Components/Projects/Projects";
import ProjectCarousel from "../Components/Carousel/ProjectCarousel";
import Title from "../Components/Title/Title";
import Skills from "../Components/Skills/Skills";

import projects from "../assets/titles/projects.gif";
import more from "../assets/titles/more.gif";
import skills from "../assets/titles/skills.gif";

import spikedown from '../assets/spikedown.gif'

const Home = () => {
  return (
    <>
      <Hero />

      <div className="container" style={{ backgroundColor: "#f0f0f0" }}>
        <Title src={projects} />
        <ProjectCarousel />
      </div>

      <div className="spike" style={{ backgroundImage: `url(${spikedown})`, backgroundColor: "#d4d4d4" }}></div>

      <div className="container" style={{ backgroundColor: "#d4d4d4" }}>
        <Title src={skills} />
        <Skills />
      </div>

      <div className="spike" style={{ backgroundImage: `url(${spikedown})`, backgroundColor: "#d4d4d4" ,transform: 'scaleY(-1)' }}></div>

      <div className="container" style={{ backgroundColor: "#f0f0f0" }}>
        <Title src={more} />
        <Projects />
      </div>
 
    </>
  );
};

export default Home;