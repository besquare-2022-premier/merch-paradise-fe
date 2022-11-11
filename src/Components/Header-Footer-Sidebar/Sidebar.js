import React from "react";
import "../Header-Footer-Sidebar/Sidebar.css";

function Sidebar() {
  return (
    <div className="side-nav-categories">
      <div className="category-title2">
        <strong>CATEGORIES</strong>
      </div>

      <ul id="category-tabs">
        <li>
          <a href="">Anime</a>
        </li>
        <li>
          <a href="">Cartoon</a>
        </li>
        <li>
          <a href="">Game</a>
        </li>
        <li>
          <a href="">Movie</a>
        </li>
        <li>
          <a href="">Animation</a>
        </li>
        <li>
          <a href="">Hand Made</a>
        </li>
        <li>
          <a href="">Movie</a>
        </li>
        <li>
          <a href="">Animation</a>
        </li>
        <li>
          <a href="">Hand Made</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
