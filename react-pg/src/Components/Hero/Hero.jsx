import React from 'react'
import './Hero.css'


import pfp from '../../assets/circle.png'

const Hero = () => {
  return (
    <div className='hero-bg'>

      <div className='hero-container'>

        <div className ='hero-left'>
          <img src={pfp} alt="" className='pfp'></img>
        </div>

        <div className='hero-right'>

          <h1>Hello!</h1>
          <p>
            <>
            My name is {" "}
            <span style={{fontWeight: "bold"}}> Pascual </span>{" "}
            and I am a game developer from Spain.

            <br />
            I have a versatile set of skills from
            <span style={{color: "lightgreen"}}>  programming</span>{" "}
            to 
            <span style={{color: "#26F7FD"}}> visual design</span>{" "}
             and even
            <span style={{color: "#FF474C"}}> audio composition</span>
            .

            <br />  
            This gives me a great understanding of all aspects of project development 
            and lets me bring ideas to life.
            </>
          </p>

        </div>

      </div>

    </div>
  
  )
}

export default Hero
