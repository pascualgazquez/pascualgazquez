import React, { useState, useEffect } from 'react'
import './Navbar.css'

import NuButton from '../NuButton/NuButton'

import logo from '../../assets/titles/logo.gif'

import twitter from '../../assets/icons/twitter.svg'
import sound from '../../assets/icons/soundcloud.svg'
import itch from '../../assets/icons/itchio.svg'
import github from '../../assets/icons/github.svg'
import linkedin from '../../assets/icons/linkedin.svg'
import mail from '../../assets/icons/email.svg'

const Navbar = () => {

  const [hoveredButton, setHoveredButton] = useState('');
  const [sticky, setSticky] = useState(false);
  const isHomePage = window.location.pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setSticky(window.scrollY > 800);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setSticky(true); 
    }
  }, [isHomePage]);

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 800 ? setSticky(true) : setSticky(false);
    })
  },[]);

  return (
    <nav className = {`${sticky? 'dark-nav' : ''}`}>

      <div className="nav-background"></div>

      <a href="/">
        <img src={logo} alt="Logo" className="logo"/>
      </a>

       <ul>

        {/* ITCH.IO ............................. */}
        <li
          onMouseEnter={() => setHoveredButton('ITCH.IO')}
          onMouseLeave={() => setHoveredButton('')}
        >
          <NuButton
            name="ITCH.IO"
            color="#fa5c5c"
            link="https://pascualga.itch.io/"
            imgSrc={itch}
            target="_blank"
          />
        </li>

        {/* TWITTER ............................. */}
        <li
          onMouseEnter={() => setHoveredButton('TWITTER')}
          onMouseLeave={() => setHoveredButton('')}
        >
          <NuButton
            name="TWITTER"
            color="#08a0e9"
            link="https://x.com/pascualgaz"
            imgSrc={twitter}
            target="_blank"
          />
        </li>

        {/* SOUNDCLOUD ............................. */}
        <li
          onMouseEnter={() => setHoveredButton('SOUNDCLOUD')}
          onMouseLeave={() => setHoveredButton('')}
        >
          <NuButton
            name="SOUNDCLOUD"
            color="#ff7700"
            link="https://soundcloud.com/pascualga"
            imgSrc={sound}
            target="_blank"
          />
        </li>

        {/* GITHUB .............................. */}
        <li
          onMouseEnter={() => setHoveredButton('GITHUB')}
          onMouseLeave={() => setHoveredButton('')}
        >
          <NuButton
            name="GITHUB"
            color="#5c6bc0"
            link="https://github.com/pascualga"
            imgSrc={github}
            target="_blank"
          />
        </li>

        {/* LINKEDIN ............................ */}
        <li
          onMouseEnter={() => setHoveredButton('LINKEDIN')}
          onMouseLeave={() => setHoveredButton('')}
        >
          <NuButton
            name="LINKEDIN"
            color="#0274b3"
            link="https://linkedin.com/in/pascualgazquez/"
            imgSrc={linkedin}
            target="_blank"
          />
        </li>

        <li style={{ display: 'inline-block', width: '10px' }}></li> 

        {/* CONTACTO ............................ */}
        <li
          onMouseEnter={() => setHoveredButton('GET IN CONTACT!')}
          onMouseLeave={() => setHoveredButton('')}
        >
          <NuButton
            name="CONTACTO"
            color="#ff0051"
            link="mailto:pascual.gazquez.compan@gmail.com"
            imgSrc={mail}
            target="_blank"
          />
        </li>
        
      </ul>
      {/* TEXTO ............................... */}
      <ul className="hovered-text" style={{ backgroundColor: hoveredButton ? 'black' : 'transparent', opacity: hoveredButton ? 1 : 0 }}>
        {hoveredButton}
      </ul>
    </nav>
  )
}

export default Navbar
