import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LogoScaleLoader } from "../Components/common/Loader";
import ReduxStateConditional from "../Components/common/ReduxStateConditional";
import { getLocalData } from "../store/native";
import { ACCESS_TOKEN } from "../store/native/common_keys";
import { loadOrders } from "../store/order/actions";
import ProfilePageTab from "./ProfilePageTab";
import "./profile_page.css";

function OrderTile({ info }) {
  return (
    <div className="orders-tile">
      <span>
        <span className="orders-tile-info-inline">Order ID:&nbsp;</span>
        {info.order_id}
      </span>
      <span>
        <span className="orders-tile-info-inline">Order Time:&nbsp;</span>
        {new Date(info.time).toLocaleString()}
      </span>
      <span>
        <span className="orders-tile-info-inline">Order Amount:&nbsp;</span>RM{" "}
        {(info.total_amount / 100).toFixed(2)}
      </span>
      <span>
        <span className="orders-tile-info-inline">Payment Status:&nbsp;</span>
        {info.transaction_status}
      </span>
    </div>
  );
}

export default function UserOrders() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (getLocalData(ACCESS_TOKEN)) {
      dispatch(loadOrders(1, 10));
    }
  }, []);
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
            <ReduxStateConditional
              selector={(state) =>
                !["loading", "uninitialized"].includes(
                  state.orders.loader_state
                ) && !!state.orders.data
              }
              alternative={<LogoScaleLoader />}
            >
              <h1>My orders</h1>
              <div className="orders-header">
                <span>Order ID</span>
                <span>Order Time</span>
                <span>Order Amount</span>
                <span>Payment Status</span>
              </div>
              {orders.data?.ids.map((z) => (
                <OrderTile key={z} info={orders.data.map[z]} />
              ))}
            </ReduxStateConditional>
          </div>
        </div>
      </div>
    </ReduxStateConditional>
  );
}
