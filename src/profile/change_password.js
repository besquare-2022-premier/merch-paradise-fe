import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DialogContext from "../Components/common/dialog/DialogContext";
import { LogoScaleLoader } from "../Components/common/Loader";
import ReduxStateConditional from "../Components/common/ReduxStateConditional";
import { ValidatingInputField } from "../Components/common/ValidatingInputField";
import { getLocalData } from "../store/native";
import { ACCESS_TOKEN } from "../store/native/common_keys";
import { updatePassword } from "../store/users/actions";
import ProfilePageTab from "./ProfilePageTab";
import "./profile_page.css";

export default function UserChangePassword() {
  const user_profile = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dialog = React.useContext(DialogContext);
  const [patches, updatePatches] = React.useReducer((state, action) => {
    if (action.submit === 1) {
      dispatch(updatePassword(state));
      return { submitted: 1 };
    }
    return { ...state, ...action };
  }, {});
  function updateForm(e) {
    const { name, value } = e.target;
    const obj = {};
    obj[name] = value;
    updatePatches(obj);
  }
  React.useEffect(() => {
    if (user_profile.loader_state === "failed") {
      dialog.showToast(user_profile.error?.message ?? "Error happened");
      delete patches.submitted;
    } else if (user_profile.loader_state === "loaded" && patches.submitted) {
      dialog.showToast("Password updated");
      delete patches.submitted;
    }
    //we only need the loader state to act
  }, [user_profile.loader_state]); //eslint-disable-line react-hooks/exhaustive-deps
  const password_valid =
    patches.new_password &&
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()=+-/.]).{8,}/.test(
      patches.new_password
    );
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
          <ProfilePageTab tab="change_password" />
          <div className="profile-page-content">
            <ReduxStateConditional
              selector={(state) => state.user.loader_state !== "loading"}
              alternative={<LogoScaleLoader />}
            >
              <h1>Change password</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!e.nativeEvent.target.reportValidity()) {
                    return;
                  }
                  //submit the patches to the backend
                  updatePatches({ submit: 1 });
                }}
              >
                <ValidatingInputField
                  name="password"
                  placeholder="Password"
                  value={patches.password ?? ""}
                  onChange={updateForm}
                  valid={!!patches.password}
                  error_message="This field is required"
                  type="password"
                />
                <ValidatingInputField
                  name="new_password"
                  placeholder="New Password"
                  value={patches.new_password ?? ""}
                  onChange={updateForm}
                  valid={password_valid}
                  error_message={
                    patches.new_password
                      ? "The password is too weak"
                      : "This field is required"
                  }
                  type="password"
                />
                <ValidatingInputField
                  name="new_password_again"
                  placeholder="New Password Again"
                  value={patches.new_password_again ?? ""}
                  onChange={updateForm}
                  valid={
                    patches.new_password_again &&
                    patches.new_password_again === patches.new_password
                  }
                  error_message={
                    patches.new_password_again
                      ? "Passwords does not match"
                      : "This field is required"
                  }
                  type="password"
                />
                <div className="profile-page-action-buttons">
                  <button
                    className="btn--primary"
                    disabled={Object.keys(patches).length === 0}
                  >
                    Update
                  </button>
                </div>
              </form>
            </ReduxStateConditional>
          </div>
        </div>
      </div>
    </ReduxStateConditional>
  );
}
