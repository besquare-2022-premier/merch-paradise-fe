import React from 'react'
import SignupLogoContainer from './signupLogoContainer/SignupLogoContainer';
import SignupContainer from './SignupContainer/SignupContainer';
import "../../App.css";
import SignupDecoration from './Signup-Decoration/SignupDecoration';

export default function IndexRegister() {
  return (
    <div>
        <SignupDecoration/>
        <SignupLogoContainer/>
        <SignupContainer/>
        
    </div>
  )
}
