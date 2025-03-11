import React, { useState } from "react";
import "./Music.css";
import Cover from "../Components/Cover/Cover";
import MusicPlayer from "../Components/MusicPlayer/MusicPlayer";
import music from "../assets/titles/music.gif";
import musicCover from "../assets/more/music.gif";

// covers
import staticCover from "../assets/static.gif";
import endecharCover from "../assets/music/covers/endechar.jpg";
import cutecharCover from "../assets/music/covers/cutechar.jpg";

// tracks
import endercharTrack from "../assets/music/tracks/enderchar.mp3";
import cutecharTrack from "../assets/music/tracks/cutechar.wav";
import bass1 from "../assets/music/tracks/bass1.mp3";
import bass2 from "../assets/music/tracks/bass2.mp3";
import bass3 from "../assets/music/tracks/bass3.mp3";
import bass4 from "../assets/music/tracks/bass4.mp3";

// Centralized Tracks Data (Fully Dynamic)
const tracksData = {
  Characters: [
    {
      title: "Endearing character",
      cover: endecharCover,
      track: endercharTrack,
      color: "#bc95f0",
    },
    {
      title: "Cute character",
      cover: cutecharCover,
      track: cutecharTrack,
      color: "#79c0ea",
    },
  ],
  Basslines: [
    { title: "Bass 1", cover: null, track: bass1, color: "#a1c4fd" },
    { title: "Bass 2", cover: null, track: bass2, color: "#fdc1a1" },
    { title: "Bass 3", cover: null, track: bass3, color: "#fda1fd" },
    { title: "Bass 4", cover: null, track: bass4, color: "#a1fdbb" },
  ],
  Battle: [],
};

const Music = () => {
  const categoryKeys = Object.keys(tracksData); // Get category names dynamically
  const [activeTab, setActiveTab] = useState(categoryKeys[0]); // Default to first category

  const [currentTrack, setCurrentTrack] = useState({
    key: Date.now(),
    title: "No track selected",
    cover: staticCover,
    track: null,
    color: "#ccc",
  });

  const handleSongClick = (track) => {
    if (track.track === currentTrack.track) return; // Do nothing if the same song is clicked
    setCurrentTrack({ ...track, key: Date.now() });
  };

  return (
    <>
      <Cover color="#fabebe" title={music} picture={musicCover} />
      <p className="musicdescription">
        <>
        This is a collection of songs I've made for different projects.
        <br/>
        You can select songs from the different {" "} 
        <span style={{fontWeight: "bold"}}> 
        categories </span> 
        <br/>
        Select a track and give it a listen!
        </>
      </p>

      <div className= "music-container">

        <div className="jukebox-container">

         {/* IZQ */}
         <div className="music-player-container">
          <MusicPlayer
            key={currentTrack.key}
            title={currentTrack.title}
            cover={currentTrack.cover}
            track={currentTrack.track}
            color={currentTrack.color}
          />
          </div>

          {/* DERECHA */}
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
                    {track.title}
                  </button>
                ))
              ) : (
                <p>No tracks yet...</p>
              )}
            </div>

            <div className="color-container-bottom"></div>
          
          </div>

        </div>

      </div>
      
    </>
  );
};

export default Music;
