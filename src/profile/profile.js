import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LogoScaleLoader } from "../Components/common/Loader";
import ReduxStateConditional from "../Components/common/ReduxStateConditional";
import { ValidatingInputField } from "../Components/common/ValidatingInputField";
import ProfilePageTab from "./ProfilePageTab";
import "./profile_page.css";

export default function Profile() {
  const user_profile = useSelector(
    (state) => console.log(state) || state.user.data
  );
  const [patches, updatePatches] = React.useReducer((state, action) => {
    return { ...state, ...action };
  }, {});
  function updateForm(e) {
    const { name, value } = e.target;
    const obj = {};
    obj[name] = value;
    updatePatches(obj);
  }
  const renderingForm = { ...user_profile, ...patches };
  const valid_phone_number =
    renderingForm.telephone_number &&
    /^\+?[0-9]{10,15}$/.test(renderingForm.telephone_number);
  return (
    <ReduxStateConditional
      selector={({ user }) =>
        console.log(user.loader_state) ||
        ["loading", "uninitialized"].includes(user.loader_state) ||
        !!user.data
      }
      alternative={<Navigate to="/login" />}
    >
      <div className="profile-page-main">
        <div className="profile-page-container">
          <ProfilePageTab tab="profile" />
          <div className="profile-page-content">
            <ReduxStateConditional
              selector={(state) => state.user.loader_state !== "loading"}
              alternative={<LogoScaleLoader />}
            >
              <h1>Personal Details</h1>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="profile-page-name-fields">
                  <ValidatingInputField
                    name="first_name"
                    placeholder="first_name"
                    value={renderingForm.first_name ?? ""}
                    onChange={updateForm}
                    valid={!!renderingForm.first_name}
                    errorMessage="This field is required"
                  />
                  <ValidatingInputField
                    name="last_name"
                    placeholder="last_name"
                    value={renderingForm.last_name ?? ""}
                    onChange={updateForm}
                    valid={!!renderingForm.last_name}
                    errorMessage="This field is required"
                  />
                </div>
                <input
                  type="email"
                  readOnly={true}
                  name="email"
                  value={renderingForm.email}
                />
                <ValidatingInputField
                  name="telephone_number"
                  placeholder="Telephone"
                  value={renderingForm.telephone_number}
                  onChange={updateForm}
                  valid={valid_phone_number}
                  errorMessage={
                    !renderingForm.telephone_number
                      ? "This field is required"
                      : "Invalid phone number"
                  }
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
