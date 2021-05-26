import React from "react";
import "./Sidebar.css";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

function Sidebar() {

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        alt=""
      />
      <HomeIcon option="Home" /><br></br>
      <SearchIcon option="Search" /><br></br>
      <LibraryMusicIcon option="Your Library"/><br></br>
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
    </div>
  );
}

export default Sidebar;
