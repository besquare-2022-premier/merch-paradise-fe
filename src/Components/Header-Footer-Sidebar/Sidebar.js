import React from "react";
import { useSelector } from "react-redux";
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
  const category = useSelector((state) => state.products.category);
  return (
    <div className="side-nav-categories my-font">
      <div className="category-title2">
        <h3>
          <strong>CATEGORIES</strong>
        </h3>
      </div>
      <ul id="category-tabs">
        {categories ? (
          categories.map((z) => (
            <li className={category === z ? "active" : ""}>
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
