/**
 * Configuration data for the categories
 */
import accessories from "./category/accesories.svg";
import apparel from "./category/apparel.svg";
import bag from "./category/bag.svg";
import cd from "./category/cd.svg";
import game from "./category/game.svg";
import household from "./category/household.svg";
import jewelry from "./category/jewelry.svg";
import seasonal from "./category/seasonal.svg";
import stationary from "./category/stationary.svg";
const config = {
  Accessories: {
    image: accessories,
    className: "category-orange-background",
  },
  Bags: { className: "category-orange-background", image: bag },
  Apparel: { className: "category-red-background", image: apparel },
  "CD/disk": { className: "category-red-background", image: cd },
  "Home Goods": { className: "category-orange-background", image: household },
  Jewelry: { className: "category-orange-background", image: jewelry },
  Seasonal: { className: "category-orange-background", image: seasonal },
  "Toys & Games": { className: "category-orange-background", image: game },
  Stationary: { className: "category-red-background", image: stationary },
};
export default config;
