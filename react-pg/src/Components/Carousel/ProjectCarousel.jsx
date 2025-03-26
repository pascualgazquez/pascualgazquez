import React from 'react'
import { useState } from "react";
import "./ProjectCarousel.css"

import senkai from '../../assets/carousel/senkai.gif'
import fading from '../../assets/carousel/fading.gif'
import pixel from '../../assets/carousel/pchar.gif'

const projects = [
  {
    image: pixel,
    title: "PIXEL CHARACTERS",
    description: (
      <>
      This is a personal project where I set out to make
      sprites based on two original characters.
      <br/>
      </>
    ),
    color:"#64d744",
    link:"/#/art"
  },
  {
    image: senkai,
    title: "SENKAI RULES",
    description: (
      <>
        This is a game made for the {" "}
        <span style={{fontStyle: "italic", color: "#ff0000"}}>
        GameGen Game Jam 2</span>
        {" "} where I ended up making most of the {" "} 
        <span style={{fontWeight: "bold"}}> 
        sprites </span> 
        {" "} and {" "}
        <span style={{fontWeight: "bold"}}>
        animations</span>
        {" "} as well as the {" "}
        <span style={{fontWeight: "bold"}}>
        music</span>. <br />
        It was one of my first jams so it was pretty stressful 
        but I learned a lot!
      </>
    ),
    color:"#ffb6ff",
    link:"https://damaca.itch.io/senkai-rules"
  },
  {
    image: fading,
    title: "FADING CROWN",
    description: (
      <>
        This is a game made for the {" "} 
        <span style={{fontStyle: "italic", color: "#ff0000"}}>
        Ludum Dare 50</span>
        , I worked on the {" "}
        <span style={{fontWeight: "bold"}}>
        characters</span>
        , {" "} 
        <span style={{fontWeight: "bold"}}>
        animations</span>
        {" "} and {" "}
        <span style={{fontWeight: "bold"}}>
        music</span>. 
      </>
    ),
    color:"#fb6813",
    link:"https://arcacrema.itch.io/fading-crown"
  }
];

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
    }
  };
  
  const goNext = () => {
    if (currentIndex < projects.length - 1) {
        setCurrentIndex((prev) => prev + 1);  
    }
  };
  
  const getContrastColor = (hex) => {
    hex = hex.replace("#", "");
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
    return luminance > 0.5 ? "black" : "white";
  };

  return (

    <div className="ccontent"   style={{ "--project-color": projects[currentIndex].color }}> 
      <div className="ccontent2">
        {/* IMAGEN */}
        <div className="cimage">

            <button onClick={goPrev} disabled={currentIndex === 0} className="cprev">⮜</button>
            <div className="cimage1">
            <img src={projects[currentIndex].image}/>
            </div>
            <button onClick={goNext} disabled={currentIndex === projects.length - 1} className="cnext">⮞</button>
     
        </div>

        {/* PUNTOS */}
        <div className="dots">
          {projects.map((_, index) => (
            <span key={index} className={index === currentIndex ? "dot active" : "dot"}></span>
          ))}
        </div>
        
        {/* TEXTO */}
        <div className="ctext">
          <h2> {projects[currentIndex].title} </h2>
          <p> {projects[currentIndex].description}</p>
        </div>
        
        {/* BOTÓN */}
        <a href={projects[currentIndex].link} target="_blank" rel="noopener noreferrer">
          <button className="check" style={{ 
              color: getContrastColor(projects[currentIndex].color) 
            }}
          > CHECK IT OUT! </button>
        </a>
      </div>  
    </div>

  );
};

export default ProjectCarousel;
