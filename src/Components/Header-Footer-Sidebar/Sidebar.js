import React from "react";
import { Link } from "react-router-dom";
import { ENDPOINT_BASE } from "../../store/__base/config";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { useContentLoader } from "../../utils/reactHooks";
import { JumpingRabbitLoader } from "../common/Loader";
import "../Header-Footer-Sidebar/Sidebar.css";

function Sidebar() {
  const categories = useContentLoader(() =>
    fetchJsonWithCookie(`${ENDPOINT_BASE}/product/categories`)
  );
  return (
    <div className="side-nav-categories">
      <div className="category-title2">
        <h4>
          <strong>CATEGORIES</strong>
        </h4>
      </div>
      <ul id="category-tabs">
        {categories ? (
          categories.map((z) => (
            <li>
              <Link to={`/categories/${encodeURIComponent(z)}`}>{z}</Link>
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
