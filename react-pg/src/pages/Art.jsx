import React from 'react'
import './Art.css'

import Cover from  "../Components/Cover/Cover";
import dart from "../assets/titles/2dart.gif";
import dartCover from '../assets/more/2dart.gif'

//PIXEL CHARACTERS
import mune from '../assets/art/pixelcharacters/mune.gif'
import sho from '../assets/art/pixelcharacters/sho.gif'
import munewalk from '../assets/art/pixelcharacters/mune-walk-r.gif'
import munesheet from '../assets/art/pixelcharacters/mune.png'
import shosheet from '../assets/art/pixelcharacters/sho.png'
import munewalksheet from '../assets/art/pixelcharacters/mune-walk-r.png'

const Art = () => {
    return (
      <>
      <Cover color = "#80ecff" title = {dart} picture={dartCover}/>

      <div className = "container">
      <h1>PIXEL CHARACTERS</h1>
        <div className = "containerart">

          <div className = "row">
            <img src={mune} className="pc1"></img>
            <img src={munesheet} className="pc2"></img>
          </div>

          <div className = "row">
            <img src={munewalk} className="pc1"></img>
            <img src={munewalksheet} className="pc2"></img>
          </div>

          <div className = "row">
            <img src={sho} className="pc1"></img>
            <img src={shosheet} className="pc2"></img>
          </div>
        </div>

      </div>
    </>
    );
  };
  
  export default Art;
  