import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ValidatingInputField } from "../common/ValidatingInputField";
import "./LogSignup.css";

export const Register = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const code = new URLSearchParams(search).get("code");
  console.log(code);
  const [form, dispatchFormUpdate] = React.useReducer(
    function (state, { name, value }) {
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
  }, [code]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.nativeEvent.target.reportValidity()) {
      return;
    }
  };
  const phoneNumberValid =
    form.telephone_number && /^\+?[0-9]{10,15}$/.test(form.telephone_number);
  return (
    <>
      <div>
        <img className="logo2" src="/img/LOGO.svg" />
        <img
          className="Vector2 hide-mobile hide-tablet"
          src="/img/heart.svg"
        ></img>
        <img
          className="Vector3 hide-mobile hide-tablet"
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
                  value={form.fname ?? ""}
                  name="fname"
                  id="fname"
                  onChange={updateState}
                  placeholder="First Name"
                  valid={!!form.fname}
                  error_message="This field is mandatory"
                />
                <ValidatingInputField
                  value={form.lname}
                  name="lname"
                  id="lname"
                  placeholder="Last Name"
                  onChange={updateState}
                  valid={!!form.lname}
                  error_message="This field is mandatory"
                />{" "}
              </div>
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
                value={form.new_password}
                onChange={updateState}
                type="password"
                placeholder="New password"
                id="new_password"
                name="new_password"
                valid={!!form.new_password}
                error_message="This field is mandatory"
              />
              <ValidatingInputField
                value={form.new_password_again}
                onChange={function (e) {
                  updateState(e);
                }}
                type="password"
                placeholder="New password again"
                id="new_password_again"
                name="new_password_again"
                valid={
                  !!form.new_password_again &&
                  form.new_password === form.new_password_again
                }
                error_message={
                  !form.new_password_again
                    ? "This field is mandatory"
                    : "Unmatched password"
                }
              />
              <br />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
        <img
          className="Vector4 hide-mobile hide-tablet"
          src="/img/flower.svg"
        ></img>
        <img
          className="heart2 hide-mobile hide-tablet"
          src="/img/heart2.svg"
        ></img>
      </div>
    </>
  );
};
