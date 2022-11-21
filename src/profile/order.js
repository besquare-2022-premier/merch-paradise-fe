import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LogoScaleLoader } from "../Components/common/Loader";
import ReduxStateConditional from "../Components/common/ReduxStateConditional";
import { getLocalData } from "../store/native";
import { ACCESS_TOKEN } from "../store/native/common_keys";
import { ENDPOINT_BASE } from "../store/__base/config";
import { generateAuthenticationHeader } from "../store/__base/headerUtils";
import { fetchJsonWithCookie } from "../utils/fetch";
import { useContentLoader } from "../utils/reactHooks";
import ProfilePageTab from "./ProfilePageTab";
import BackButton from "../assets/back.svg";
import "./profile_page.css";

function ItemTile({ info }) {
  return (
    <div className="order-tile">
      <span>
        <span className="order-tile-info-inline">Product Name:&nbsp;</span>
        {info.product_name}
      </span>
      <span>
        <span className="order-tile-info-inline">Quantity:&nbsp;</span>
        {info.quantity}
      </span>
      <span>
        <span className="order-tile-info-inline">Unit Price:&nbsp;</span>RM{" "}
        {(info.price / 100).toFixed(2)}
      </span>
      <span>
        <span className="order-tile-info-inline">Total:&nbsp;</span>
        RM {((info.price * info.quantity) / 100).toFixed(2)}
      </span>
    </div>
  );
}

export default function OrderDetails() {
  const { orderid } = useParams();
  const navigate = useNavigate();
  const access_token = getLocalData(ACCESS_TOKEN);
  let loader = useContentLoader(
    () => {
      //disable the lint because this is intended
      //eslint-disable-next-line eqeqeq
      if (!orderid || (orderid | 0) != orderid) {
        return new Error("Invalid ID");
      } else {
        return fetchJsonWithCookie(`${ENDPOINT_BASE}/orders/${orderid}`, {
          headers: { ...generateAuthenticationHeader(access_token) },
        });
      }
    },
    [orderid],
    null
  );
  React.useEffect(() => {
    if (loader instanceof Error) {
      alert(loader.message);
      navigate("../");
    }
  }, [loader, navigate]);
  return (
    <ReduxStateConditional
      selector={({ user }) =>
        (["loading", "uninitialized", "failed"].includes(user.loader_state) &&
          getLocalData(ACCESS_TOKEN)) ||
        !!user.data
      }
      alternative={<Navigate to="/login" />}
    >
      <div className="profile-page-main">
        <div className="profile-page-container">
          <ProfilePageTab tab="orders" />
          <div className="profile-page-content">
            <h1>
              <div>
                <img
                  alt="Back"
                  title="Back"
                  style={{
                    width: "50px",
                    marginBottom: "-12px",
                    cursor: "pointer",
                  }}
                  src={BackButton}
                  onClick={() => navigate("../", { relative: "path" })}
                />
                Order Info
              </div>
            </h1>
            {loader !== null ? (
              <>
                <div className="order-info">
                  <span>Order ID:</span>
                  <span>{loader.order_id}</span>
                  <span>Order Time:</span>
                  <span>{new Date(loader.time).toLocaleString()}</span>
                  <span>Order Amount:</span>
                  <span>{(loader.total_amount / 100).toFixed(2)}</span>
                  <span>Payment Status:</span>
                  <span>{loader.transaction_status}</span>
                </div>
                <div className="order-header">
                  <span>Product Name</span>
                  <span>Quantity</span>
                  <span>Unit Price</span>
                  <span>Total Price</span>
                </div>
                {loader.items.map((z) => (
                  <ItemTile key={z.product_name} info={z} />
                ))}
              </>
            ) : (
              <LogoScaleLoader />
            )}
          </div>
        </div>
      </div>
    </ReduxStateConditional>
  );
}
