import React from 'react'
import "./Cover.css"

import backarrow from '../../assets/icons/arrowback.svg';

const Cover = ({color, title}) => {
  return (
    <>
      <div className="cocover" style={{ backgroundColor: color }}> </div>
      
        <a href="/">
          <button 
            className="ccheck"
            style={{ 
              backgroundColor: "#fff",
              color: "#000",
              fontSize: "20px",
              fontWeight: "bold"
            }}
          > 
            <img src={backarrow}></img> 
          </button>
        </a>
  </>
  )
}

export default Cover
