import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import "./MusicPlayer.css";

import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import soundOn from "../../assets/icons/soundon.svg";
import soundOff from "../../assets/icons/soundoff.svg";

import defaultPic from "../../assets/music/covers/default.gif";

const lightenColor = (hex, percent) => {
  // Ensure the input is a valid hex color
  hex = hex.replace(/^#/, ""); 

  // Convert shorthand 3-digit hex to full 6-digit hex
  if (hex.length === 3) {
    hex = hex.split("").map(char => char + char).join("");
  }

  // Parse RGB values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Increase brightness
  r = Math.round(r + (255 - r) * (percent / 100));
  g = Math.round(g + (255 - g) * (percent / 100));
  b = Math.round(b + (255 - b) * (percent / 100));

  // Ensure values are within valid range
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  // Convert back to hex and return
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const MusicPlayer = ({ title, cover, track, color }) => {
  const waveformRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false); // Toggle for volume slider  

  // ---

  useEffect(() => {
    if (waveformRef.current && !waveSurfer) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ddd",
        progressColor: color,
        cursorColor: color,
        barWidth: 2,
        responsive: true,
        height: 70,
        normalize: true,
      });

      ws.load(track);
      setWaveSurfer(ws);

      ws.on("finish", () => {
        setIsPlaying(false);
      });

      return () => ws.destroy();
    }
  }, [track]);

  const togglePlay = () => {
    if (waveSurfer) {
      isPlaying ? waveSurfer.pause() : waveSurfer.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVolume = () => {
    setShowVolume(!showVolume);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (waveSurfer) {
      waveSurfer.setVolume(newVolume);
    }
  };

  // --

  return (
    // 
    <div className="music-player">
      
       {/* PLAY Y VOLUMEN*/ }

      <div className="controles-container">

        {/* Play Button - Left */}
        <button 
          onClick={togglePlay} 
          className={`play-button ${isPlaying ? "active" : ""}`}
        >
          <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" className="play-icon" />
        </button>

        {/* Volume Slider - Centered */}
        {showVolume && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        )}

        {/* Volume Button - Right */}
        <div 
          className={`volume-container ${showVolume ? "active" : ""}`} 
          onClick={toggleVolume}
        >
          <img 
            src={volume > 0 ? soundOn : soundOff} 
            alt="Volume Icon" 
            className="volume-icon" 
          />
        </div>

      </div>

      <div className="cover-container">
        <img 
        src={cover || defaultPic} 
        alt={title} 
        className={`cover ${isPlaying ? "playing" : ""}`} 
        />
      </div>

      <div ref={waveformRef} className="waveform"></div>

    </div>
  );
};

export default MusicPlayer;
