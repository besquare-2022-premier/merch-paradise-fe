/**
 * Configuration data for the categories
 */
import accessories from "./category/accesories.svg";
import apparel from "./category/apparel.svg";
import bag from "./category/bag1.svg";
import cd from "./category/cd.svg";
import game from "./category/game.svg";
import household from "./category/household.svg";
import jewelry from "./category/jewelry.svg";
import seasonal from "./category/seasonal.svg";
import stationary from "./category/stationary.svg";
const config = {
  Accessories: {
    image: accessories,
    className: "category-red-background",
  },
  Bags: { className: "category-red-background", image: bag },
  Apparel: { className: "category-orange-background", image: apparel },
  "CD/disk": { className: "category-orange-background", image: cd },
  "Home Goods": { className: "category-red-background", image: household },
  Jewelry: { className: "category-red-background", image: jewelry },
  Seasonal: { className: "category-red-background", image: seasonal },
  "Toys & Games": { className: "category-red-background", image: game },
  Stationary: { className: "category-orange-background", image: stationary },
};
export default config;
