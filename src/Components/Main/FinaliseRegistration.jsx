import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getLocalData } from "../../store/native";
import { ACCESS_TOKEN } from "../../store/native/common_keys";
import { completeSignUp } from "../../store/users/actions";
import { JumpingRabbitLoader } from "../common/Loader";
import ReduxStateConditional from "../common/ReduxStateConditional";
import { ValidatingInputField } from "../common/ValidatingInputField";
import "./LogSignup.css";

export const FinaliseRegistration = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URLSearchParams(search).get("code");
  const user_profile = useSelector((state) => state.user);
  const [form, dispatchFormUpdate] = React.useReducer(
    function (state, { name, value, submit }) {
      if (submit) {
        dispatch(completeSignUp(code, { ...state }));
        return { ...state, submitted: 1 };
      }
      let ret = { ...state };
      ret[name] = value;
      return ret;
    },
    { secure_word: "unset", gender: "secret" }
  );
  const updateState = (e) => {
    const { name, value } = e.target;
    dispatchFormUpdate({ name, value });
  };
  React.useEffect(() => {
    if (!code) {
      alert("Missing some parameters");
      navigate("/", { replace: true });
    }
  }, [code, navigate]);
  React.useEffect(() => {
    if (user_profile.loader_state === "failed") {
      alert(user_profile.error?.message ?? "Error occured during the signup");
    } else if (user_profile.data?.email && form.submitted) {
      alert("Succeeded. You will now redirected to the login page");
      navigate("/shop", { replace: true });
    }
  }, [user_profile, dispatch, navigate, form.submitted]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.nativeEvent.target.reportValidity()) {
      return;
    }
    dispatchFormUpdate({ submit: 1 });
  };
  const phoneNumberValid =
    form.telephone_number && /^\+?[0-9]{10,15}$/.test(form.telephone_number);
  const password_valid =
    form.password &&
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()=+-/.]).{8,}/.test(
      form.password
    );
  return (
    <ReduxStateConditional
      selector={(state) =>
        !!!getLocalData(ACCESS_TOKEN) || state.user.data === null
      }
      alternative={<Navigate to="/shop" />}
    >
      <div>
        <img className="logo2" src="/img/LOGO.svg" alt="Logo" />
        <img
          className="Vector2 hide-mobile hide-tablet"
          alt=""
          src="/img/heart.svg"
        ></img>
        <img
          className="Vector3 hide-mobile hide-tablet"
          alt=""
          src="/img/star.svg"
        ></img>

        <h1 className="title2">
          Welcome !<br /> to MerchParadise
        </h1>
        <div className="centralize">
          <div className="auth-form-container">
            <h2>Personal Details</h2>
            <form className="register-form" onSubmit={handleSubmit}>
              <div>
                <ValidatingInputField
                  value={form.first_name ?? ""}
                  name="first_name"
                  id="first_name"
                  onChange={updateState}
                  placeholder="First Name"
                  valid={!!form.first_name}
                  error_message="This field is mandatory"
                />
                <ValidatingInputField
                  value={form.last_name}
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  onChange={updateState}
                  valid={!!form.last_name}
                  error_message="This field is mandatory"
                />
              </div>
              <ValidatingInputField
                value={form.username}
                name="username"
                id="username"
                placeholder="User Name"
                onChange={updateState}
                valid={!!form.username}
                error_message="This field is mandatory"
              />
              <ValidatingInputField
                value={form.telephone_number}
                onChange={updateState}
                type="text"
                placeholder="Phone number"
                id="telephone_number"
                name="telephone_number"
                valid={!!form.telephone_number && phoneNumberValid}
                error_message={
                  !form.telephone_number
                    ? "This field is mandatory"
                    : "Invalid phone number"
                }
              />
              <div className="validating-field">
                <label for="gender">Gender:</label>
                <br />
                <select
                  name="gender"
                  className="gender-selector"
                  onChange={updateState}
                  value={form.gender}
                  style={{ width: "100%" }}
                >
                  {["secret", "male", "female"].map((z) => (
                    <option value={z}>{z}</option>
                  ))}
                </select>
              </div>
              <ValidatingInputField
                value={form.password}
                onChange={updateState}
                type="password"
                placeholder="New password"
                id="password"
                name="password"
                valid={password_valid}
                error_message={
                  !!form.password
                    ? "Password is too weak"
                    : "This field is mandatory"
                }
              />
              <ValidatingInputField
                value={form.password_again}
                onChange={function (e) {
                  updateState(e);
                }}
                type="password"
                placeholder="New password again"
                id="password_again"
                name="password_again"
                valid={
                  !!form.password_again && form.password === form.password_again
                }
                error_message={
                  !form.password_again
                    ? "This field is mandatory"
                    : "Unmatched password"
                }
              />
              <br />
              <ReduxStateConditional
                selector={(state) => state.user.loader_state !== "loading"}
                alternative={<JumpingRabbitLoader dataRole="submit-button" />}
              >
                <button type="submit" data-role="submit-button">
                  Register
                </button>
              </ReduxStateConditional>
            </form>
          </div>
        </div>
        <img
          className="Vector4 hide-mobile hide-tablet"
          alt=""
          src="/img/flower.svg"
        ></img>
        <img
          className="heart2 hide-mobile hide-tablet"
          alt=""
          src="/img/heart2.svg"
        ></img>
      </div>
    </ReduxStateConditional>
  );
};
