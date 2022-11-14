import React from "react";
import { ENDPOINT_BASE } from "../../../store/__base/config";
import { fetchJsonWithCookie } from "../../../utils/fetch";
import { useContentLoader } from "../../../utils/reactHooks";
import { JumpingRabbitLoader } from "../../common/Loader";
import config from "./assets/config";
import "./Category.css";
function Category() {
  const categories = useContentLoader(() =>
    fetchJsonWithCookie(`${ENDPOINT_BASE}/product/categories`)
  );
  return (
    <div className="category-container">
      <div className="category-h2">
        <p className="category">Categories</p>
      </div>
      <div className="category-section">
        <div className="grid-container">
          {categories ? (
            categories.map((z) => (
              <img
                key={z}
                className={config[z].className}
                src={config[z].image}
                alt={z}
                title={z}
              />
            ))
          ) : (
            <div style={{ height: "20vh", width: "100%" }}>
              <JumpingRabbitLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
