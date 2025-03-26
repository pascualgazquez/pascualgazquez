import React from 'react'
import "./Cover.css"

const Cover = ({color, title}) => {
  return (
    <>
      <div className="cocover" style={{ backgroundColor: color }}> </div>
      
        <a href="/">
          <button 
            className="check"
            style={{ 
              backgroundColor: "#fff",
              color: "#000",
              fontSize: "20px",
              fontWeight: "bold"
            }}
          > ⮌ </button>
        </a>
  </>
  )
}

export default Cover
