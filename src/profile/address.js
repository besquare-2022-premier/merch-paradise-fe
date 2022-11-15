import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LogoScaleLoader } from "../Components/common/Loader";
import ReduxStateConditional from "../Components/common/ReduxStateConditional";
import { ValidatingInputField } from "../Components/common/ValidatingInputField";
import ProfilePageTab from "./ProfilePageTab";
import "./profile_page.css";

export default function UserAddress() {
  const user_profile = useSelector((state) => state.user);
  const [patches, updatePatches] = React.useReducer((state, action) => {
    return { ...state, ...action };
  }, {});
  function updateForm(e) {
    const { name, value } = e.target;
    const obj = {};
    obj[name] = value;
    updatePatches(obj);
  }
  const renderingForm = { ...user_profile.data, ...patches };
  return (
    <ReduxStateConditional
      selector={({ user }) =>
        ["loading", "uninitialized", "failed"].includes(user.loader_state) ||
        !!user.data
      }
      alternative={<Navigate to="/login" />}
    >
      <div className="profile-page-main">
        <div className="profile-page-container">
          <ProfilePageTab tab="address" />
          <div className="profile-page-content">
            <ReduxStateConditional
              selector={(state) => state.user.loader_state !== "loading"}
              alternative={<LogoScaleLoader />}
            >
              <h1>Address</h1>
              <form onSubmit={(e) => e.preventDefault()}>
                <ValidatingInputField
                  name="address"
                  placeholder="Address"
                  value={renderingForm.address ?? ""}
                  onChange={updateForm}
                  valid={true}
                />
                <ValidatingInputField
                  name="residence"
                  placeholder="Residence"
                  value={renderingForm.residence ?? ""}
                  onChange={updateForm}
                  valid={true}
                />
                <div class="profile-page-action-buttons">
                  <button class="btn--primary">Update</button>
                </div>
              </form>
            </ReduxStateConditional>
          </div>
        </div>
      </div>
    </ReduxStateConditional>
  );
}
