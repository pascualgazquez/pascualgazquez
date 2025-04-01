import React, { useRef, useState, useEffect } from "react";
import "./Music.css";
import WaveSurfer from "wavesurfer.js";
import Cover from "../Components/Cover/Cover";
import music from "../assets/titles/music.gif";
import musicCover from "../assets/more/music.gif";

// player
import playIcon from "../assets/icons/play.svg";
import pauseIcon from "../assets/icons/pause.svg";
import soundOn from "../assets/icons/soundon.svg";
import soundOff from "../assets/icons/soundoff.svg";
import defaultPic from "../assets/music/covers/default.gif";


// covers
import charende_c from "../assets/music/covers/endechar.jpg";
import charcute_c from "../assets/music/covers/cutechar.jpg";

import gamefc_c from "../assets/music/covers/games/fc.png";
import gamesr_c from "../assets/music/covers/games/senkai.png";
import gamecc_c from "../assets/music/covers/games/clock.png";

// tracks
import charende_t from "../assets/music/tracks/enderchar.mp3";
import charcute_t from "../assets/music/tracks/cutechar.wav";

import gamepp_t from "../assets/music/tracks/games/pondplatoon.mp3";


// TRACKS DATA ....................................................................................
const tracksData = {
  Games: [
    { title: "Fading Crown",       cover: gamefc_c,  track: gamepp_t, color: "#fa6813", link: "https://arcacrema.itch.io/fading-crown" },
    { title: "Senkai Rules",       cover: gamesr_c,  track: gamepp_t, color: "#ffb6ff", link: "https://damaca.itch.io/senkai-rules" },
    { title: "Clockwork Clash",    cover: gamecc_c,  track: gamepp_t, color: "#e95f5f", link: "https://damaca.itch.io/clockwork-clash" }, 
  ],
  Places: [
    
  ],
  Characters: [
    { title: "Endearing character",       cover: charende_c,  track: charende_t, color: "#bc95f0" },
    { title: "Cute character",            cover: charcute_c,  track: charcute_t, color: "#0abbba" },
  ],
  Battles: [],

};
//.................................................................................................

const Music = () => {

  const [currentTrack, setCurrentTrack] = useState({
    key: Date.now(),
    title: "No track selected",
    cover: defaultPic,
    track: null,
    color: "#ccc",
  });

  const [isPlaying, setIsPlaying] = useState(false); // Define isPlaying state
  const [waveSurfer, setWaveSurfer] = useState(null); // Define waveSurfer state
  const waveformRef = useRef(null); // Initialize waveformRef
  const categoryKeys = Object.keys(tracksData); // Get category names dynamically
  const [volume, setVolume] = useState(0.5); 

  useEffect(() => {
    if (waveformRef.current && currentTrack.track) {
      if (waveSurfer) {
        waveSurfer.destroy(); // Ensure previous instance is removed
      }
      
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#000",
        progressColor: currentTrack.color,
        cursorColor: currentTrack.color*"#fff",
        cursorWidth: 3,
        barWidth: 2,
        responsive: true,
        height: 48,
        normalize: true,
      });

      ws.load(currentTrack.track);
      ws.setVolume(volume); 
      setWaveSurfer(ws);

      ws.on("finish", () => {
        setIsPlaying(false);
      });

      return () => ws.destroy(); 
    }
  }, [currentTrack.track]);

  const [activeTab, setActiveTab] = useState(categoryKeys[0]); // Default to first category

  const handleSongClick = (track) => {
    if (track.track === currentTrack.track) return; // Do nothing if the same song is clicked
    setCurrentTrack({ ...track, key: Date.now() });
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (waveSurfer) {
      waveSurfer.setVolume(newVolume);
    }
  };  

  const togglePlay = () => {
    if (waveSurfer) {
      isPlaying ? waveSurfer.pause() : waveSurfer.play();
      setIsPlaying(!isPlaying);
    }
  };

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
      hex = hex.split("").map((char) => char + char).join("");
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r}, ${g}, ${b}`;
  };

  //...............................................................................................
  return (
    <>

      <Cover color="#fabebe" title={music} picture={musicCover} />
      
      <p className="musicdescription"> <>
          This is a collection of songs I've made for different projects.
          <br />
          You can select songs from the different{" "}
          <span style={{ fontWeight: "bold" }}>categories</span>
          <br />
          Select a track and give it a listen!
        </> </p>
     
      {/*..........................................................................................*/}
      
      <div className="musicgroup" style={{ "--project-color": currentTrack.color, "--project-color-rgb": hexToRgb(currentTrack.color) }}>

        <div className="music-player">
          
          <div className="mus-left">
            <div className="cover-container"> <img src={currentTrack.cover || defaultPic} alt="Cover" /> </div>
            <div className="waveform-container"> <div ref={waveformRef} className="waveform"></div> </div>
          </div>

          {/*....................................*/}

          <div className="mus-middle">
            <div className="play_button_c">
              <button onClick={togglePlay} className={`play-button ${isPlaying ? "active" : ""}`}>
              {isPlaying ? (
                <svg className="play-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                </svg>
              ) : (
                <svg className="play-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-s"
              orient="vertical"
            />
          </div>

          {/*....................................*/}

          <div className="mus-right">
            <div className="nowplaying">
              <p className="nowplayingtext"> ★ NOW PLAYING</p>
              <p className="nowplayingtext2">{currentTrack.title}</p>
            </div>
 
            <div className="categories-window">
              <div className="tabs">
                {categoryKeys.map((category) => (
                  <button
                    key={category}
                    className={activeTab === category ? "active" : ""}
                    onClick={() => setActiveTab(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="category-content">
                {tracksData[activeTab].length > 0 ? (
                  tracksData[activeTab].map((track, index) => (
                    <button
                      key={index}
                      className={`track-row ${track.track === currentTrack.track ? "active" : ""}`}
                      onClick={() => handleSongClick(track)}
                    >
                      <img src={track.cover || defaultPic} alt={track.title} className="track-cover" />
                      <span className="track-title">{track.title}</span>
                      {track.link && (
                        <a 
                        href={track.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="track-link"
                        onClick={(e) => e.stopPropagation()} // Stop the event from bubbling up
                      >➜</a>
                      )}
                    </button>
                  ))
                ) : (
                  <p>No tracks yet...</p>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

    </>
  );
};

export default Music;
