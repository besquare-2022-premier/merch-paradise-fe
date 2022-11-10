import React from "react";
import { Navigate } from "react-router-dom";
import { ValidatingInputField } from "../common/ValidatingInputField";
import "./LogSignup.css";

export const Register = (props) => {
  const [form, dispatch] = React.useReducer(function (state, { name, value }) {
    let ret = { ...state };
    ret[name] = value;
    return ret;
  }, {});

  const updateState = (e) => {
    const { name, value } = e.target;
    dispatch({ name, value });
  };
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const phoneNumberValid =
    form.telephone_number && /^\+?[0-9]{10,15}$/.test(form.telephone_number);

  return (
    <>
      <div style={{ height: "15vh" }} />
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
              <a className="link-btn" onClick={() => setShouldRedirect(true)}>
                Already have an account? Login here.
              </a>
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
