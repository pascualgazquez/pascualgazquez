import React, { useState } from 'react';
import './Art.css';

import spikedown from '../assets/spikedown.gif'
import mune from "../assets/artproj/pixelcharacters/mune.gif";
import munewalk from "../assets/artproj/pixelcharacters/munewalk.gif";
import sho from "../assets/artproj/pixelcharacters/sho.gif";
import mune2 from "../assets/artproj/pixelcharacters/mune.png";
import munewalk2 from "../assets/artproj/pixelcharacters/munewalk.png";
import sho2 from "../assets/artproj/pixelcharacters/sho.png";

const imageModules = import.meta.glob('../assets/art/*/*.{png,gif}', { eager: true });

const groupImagesByFolder = (modules) => {
  const sections = {};
  for (const path in modules) {
    const match = path.match(/\/art\/([^/]+)\/[^/]+\.(png|gif)$/);
    if (match) {
      const folder = match[1];
      if (!sections[folder]) sections[folder] = [];
      sections[folder].push(modules[path].default);
    }
  }
  return sections;
};

const Art = () => {
  const artSections = groupImagesByFolder(imageModules);
  const [overlayImage, setOverlayImage] = useState(null);

  // Expanded state for the column content
  const [expandedColumn, setExpandedColumn] = useState(false);

  // Expanded states for each row image, keyed by image name or index
  const [expandedRows, setExpandedRows] = useState({
    mune: false,
    munewalk: false,
    sho: false,
  });

  const toggleRow = (key) => {
    setExpandedRows(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleImageClick = (src) => {
    setOverlayImage(src);
  };

  const handleOverlayClick = () => {
    setOverlayImage(null);
  };

  return (
    <>
      <div className="projcontainer">
        <div className="spike" style={{ backgroundImage: `url(${spikedown})`, backgroundColor: "#d4d4d4" }}></div>
        
        <h2 onClick={() => setExpandedColumn(!expandedColumn)} style={{ cursor: 'pointer' }}>
          PIXEL CHARACTERS
        </h2>

        <div className="pcolumn">
          <div className="pcrow" onClick={() => toggleRow('mune')}>
            <div className="pcimg">
              <img src={mune} alt="mune" />
            </div>
            <img className={`pcimg2 ${expandedRows.mune ? 'expanded' : ''}`} src={mune2} alt="mune2"/>
          </div>

          <div className={`pcolumn-content ${expandedColumn ? 'expanded' : ''}`}>
            <div className="pcrow" onClick={() => toggleRow('munewalk')}>
             <div className="pcimg">
              <img src={munewalk} alt="munewalk" />
            </div>
              <img
                className={`pcimg2 ${expandedRows.munewalk ? 'expanded' : ''}`}
                src={munewalk2}
                alt="munewalk2"
              />
            </div>
            <div className="pcrow" onClick={() => toggleRow('sho')}>
              <div className="pcimg">
              <img src={sho} alt="sho" />
            </div>
              <img
                className={`pcimg2 ${expandedRows.sho ? 'expanded' : ''}`}
                src={sho2}
                alt="sho2"
              />
            </div>
          </div>
        </div>

        <div className="spike" style={{ backgroundImage: `url(${spikedown})`, backgroundColor: "#d4d4d4" ,transform: 'scaleY(-1)' }}></div>
      </div>
      
      <div className="artcontainer">
        {Object.entries(artSections).map(([folder, images]) => (
          <div key={folder} className="section">
            <h2>{folder}</h2>
            <div className="carousel-window">
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${folder}-${idx}`}
                  onClick={() => handleImageClick(src)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {overlayImage && (
        <div className="overlay" onClick={handleOverlayClick}>
          <img src={overlayImage} alt="Full size" />
        </div>
      )}
    </>
  );
};

export default Art;
