import React from 'react';
import { Navigate } from 'react-router-dom';
import './SignupContainer.css'

export default function SignupContainer() {
      const [email, setEmail] = React.useState("");

      const [shouldRedirect, setShouldRedirect] = React.useState(false);

      if (shouldRedirect) {
        return <Navigate to="/login" />;
      }

  return (
    <div className="main-signup-container">
      <div className="left-signup-container">
        <div className="left-container-textbox">
          <p>Welcome to MerchParadise</p>
        </div>

        <div className="email-signup">
          <div className='signup-input-container'>
            <h2> Enter your email</h2>
            <form className="login-form">
              {/* <label htmlFor="email">email</label> */}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
                id="email"
                name="email"
              />
              <div className="action-buttons">
                <a className="link-btn" onClick={() => setShouldRedirect(true)}>
                  Have an account? Log in.
                </a>
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="right-signup-container">
        <img
          className="img-signup"
          src="./img/email-registration/signup-image.svg"
          alt="signup-img"
        />
      </div>
    </div>
  );
}
