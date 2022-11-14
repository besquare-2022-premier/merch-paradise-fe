import React from "react";
import { ENDPOINT_BASE } from "../../../store/__base/config";
import { fetchJsonWithCookie } from "../../../utils/fetch";
import { useContentLoader } from "../../../utils/reactHooks";
import { JumpingRabbitLoader, LogoScaleLoader } from "../../common/Loader";
import "./Category.css";
const colors = [
  { color: 1, src: "/img/category/accesories.svg" },
  { color: 0, src: "/img/category/apparel.svg" },
  { color: 1, src: "/img/category/bag.svg" },
  { color: 0, src: "/img/category/cd.svg" },
  { color: 1, src: "/img/category/game.svg" },
  { color: 1, src: "/img/category/household.svg" },
  { color: 1, src: "/img/category/jewelry.svg" },
  { color: 1, src: "/img/category/seasonal.svg" },
  { color: 0, src: "/img/category/stationary.svg" },
];
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
          {colors.map((z, i) => (
            <img
              key={i}
              className={
                z.color
                  ? "category-red-background"
                  : "category-orange-background"
              }
              src={z.src}
            />
          ))}
          {/* {categories ? (
            categories.map((z) => <p>{z}</p>)
          ) : (
            <div style={{ height: "20vh", width: "100%" }}>
              <JumpingRabbitLoader />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Category;
