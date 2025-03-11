import React from 'react'
import "./Cover.css"

const Cover = ({color, title}) => {
  return (
    <>
      <div className="cocover" style={{ backgroundColor: color }}> </div>
      
      <div className="cbutton">
        <a href="/">
          <button 
            className="check"
            style={{ 
              backgroundColor: "#fff",
              color: "#000" 
            }}
          > ← GO BACK </button>
        </a>
      </div>
  </>
  )
}

export default Cover
