import React from "react";
import { Link } from "react-router-dom";
const tabs = [
  { link: "/", id: "profile", label: "Personal Details" },
  { link: "/address", id: "address", label: "Address" },
  { link: "/orders", id: "orders", label: "My orders" },
];
export default function ProfilePageTab({ tab }) {
  return (
    <div className="profile-page-tab-scroller">
      <div className="profile-page-tab">
        {tabs.map((item) => (
          <Link
            key={item.id}
            className={`profile-page-tab-item ${
              tab === item.id ? "profile-page-tab-item-active" : ""
            }`}
            to={`/profile${item.link}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
