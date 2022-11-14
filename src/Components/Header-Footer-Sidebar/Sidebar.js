import React from "react";
import { ENDPOINT_BASE } from "../../store/__base/config";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { useContentLoader } from "../../utils/reactHooks";
import { JumpingRabbitLoader, LogoScaleLoader } from "../common/Loader";
import "../Header-Footer-Sidebar/Sidebar.css";

function Sidebar() {
  const categories = useContentLoader(
    fetchJsonWithCookie(`${ENDPOINT_BASE}/product/categories`)
  );
  return (
    <div className="side-nav-categories">
      <div className="category-title2">
        <strong>CATEGORIES</strong>
      </div>

      <ul id="category-tabs">
        {categories ? (
          categories.map((z) => (
            <li>
              <a href="">{z}</a>
            </li>
          ))
        ) : (
          <div style={{ height: "20vh", width: "100%" }}>
            <JumpingRabbitLoader />
          </div>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
