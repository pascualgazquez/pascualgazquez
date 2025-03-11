import React from 'react'
import './Projects.css'
import Project from './Project.jsx'

import music from '../../assets/titles/music.gif'
import art from '../../assets/titles/2dart.gif'

import musicImg from '../../assets/more/music.gif'
import artImg from '../../assets/more/2dart.gif'

const Projects = () => {
  return (
    <div className="projects">
      <Project 
        image={artImg} 
        captionImage={art} 
        bgColor="rgba(0, 0, 0, 0.7)" 
        link="/#/art"
        onClick={() => window.scrollTo(0, 0)}
      />
       
      <Project 
        image={musicImg} 
        captionImage={music} 
        bgColor="rgba(0, 0, 0, 0.7)"
        link="/#/music" 
        onClick={() => window.scrollTo(0, 0)}
      />
      
    </div>
  )
}

export default Projects
