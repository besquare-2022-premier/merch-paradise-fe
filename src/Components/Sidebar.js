import React from "react";

function Sidebar() {
  return (
    <div class="side-nav-categories">
      <div class="category-title">
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
      </ul>
    </div>
  );
}

export default Sidebar;
