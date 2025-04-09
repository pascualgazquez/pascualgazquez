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
const coversMod = import.meta.glob("../assets/music/covers/*.{png,gif}", { eager: true, import: "default" });
const covers = {};
for (const path in coversMod) {
  const fileName = path.split("/").pop().replace(/\.(png|gif)$/, "");
  covers[`${fileName}`] = coversMod[path];
}

// tracks game
const trackgameMod = import.meta.glob("../assets/music/tracks/game/*.mp3", { eager: true, import: "default" });
const tracks_game = {};
for (const path in trackgameMod) {
  const fileName = path.split("/").pop().replace(".mp3", "");
  tracks_game[`${fileName}`] = trackgameMod[path];
}

// tracks char
const trackcharMod = import.meta.glob("../assets/music/tracks/char/*.mp3", { eager: true, import: "default" });
const tracks_char = {};
for (const path in trackcharMod) {
  const fileName = path.split("/").pop().replace(".mp3", "");
  tracks_char[`${fileName}`] = trackcharMod[path];
}

// tracks place
const trackplaceMod = import.meta.glob("../assets/music/tracks/places/*.mp3", { eager: true, import: "default" });
const tracks_place = {};
for (const path in trackplaceMod) {
  const fileName = path.split("/").pop().replace(".mp3", "");
  tracks_place[`${fileName}`] = trackplaceMod[path];
}


// TRACKS DATA ....................................................................................
const tracksData = {
  Games: [
    /*
    { title: "Fading Crown",        cover: covers["fc"],     track: tracks_place["funk"], color: "#fa6813", link: "https://arcacrema.itch.io/fading-crown" },
    { title: "Senkai Rules",        cover: covers["senkai"],  track: tracks_place["funk"], color: "#ffb6ff", link: "https://damaca.itch.io/senkai-rules" },
    { title: "Clockwork Clash",     cover: covers["clock"],  track: tracks_place["funk"], color: "#e95f5f", link: "https://damaca.itch.io/clockwork-clash" }, 
    */
  ],
  Places: [
    { title: "Beach",           cover: covers["1"],   track: tracks_place["beach"], color: "#f6d7b0" },
    { title: "Cozy house",      cover: covers["2"],    track: tracks_place["bossa"], color: "#b3a184" },
    { title: "Quick Funk",      cover: covers["3"],       track: tracks_place["funk"], color: "#bc95f0" },
  ],
  Characters: [
    { title: "Sleepy character", cover: covers["s"],      track: tracks_char["ende"], color: "#ace4f6" },
    { title: "Cute character",   cover: covers["cute"],   track: tracks_char["cute"], color: "#78bee7" },
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

  const [isPlaying, setIsPlaying] = useState(false); 
  const [waveSurfer, setWaveSurfer] = useState(null); 
  const waveformRef = useRef(null); 
  const categoryKeys = Object.keys(tracksData); 
  const [volume, setVolume] = useState(0.5); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (waveformRef.current && currentTrack.track) {
      if (waveSurfer) {
        waveSurfer.destroy();
      }
  
      setIsLoading(true); 
      setIsPlaying(false);
  
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#000",
        progressColor: currentTrack.color,
        cursorColor: "#FFEA00",
        cursorWidth: 2,
        barWidth: 2,
        responsive: true,
        height: 48,
        normalize: true,
      });
  
  
  
      ws.on("ready", () => {
        setIsLoading(false); // Finish loading
        ws.setVolume(volume);
      });
  
      ws.on("finish", () => {
        ws.stop();   // Reset position to start
        ws.play();   // Play again
      });

      ws.load(currentTrack.track);
      ws.setVolume(volume);
      setWaveSurfer(ws);
  
      return () => ws.destroy();
    }
  }, [currentTrack.track]);
  

  const [activeTab, setActiveTab] = useState(categoryKeys[0]); 

  const handleSongClick = (track) => {
    if (track.title === currentTrack.title) return;
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

      <div className="musicbg">
      </div>

        <div className="music-player">
          
          <div className="mus-left">
            <div className="cover-container"> 
            <img
              src={currentTrack.cover || defaultPic}
              alt="Cover"
              className={isPlaying ? "rotating" : ""}
            />
            </div>
            <div className="waveform-container">
              {isLoading && (
                <div className="loading-overlay">
                  <div className="spinner"></div>
                  <div className="loading-bar">
                    <div className="loading-bar-progress"></div>
                  </div>
                </div>
              )}
              <div ref={waveformRef} className="waveform"></div>
            </div>
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
            </div>
            <div className="nowplaying2">
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
                      className={`track-row ${track.title === currentTrack.title ? "active" : ""}`}
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
