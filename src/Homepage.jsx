import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { CLIENT_ID } from "./constants.js";
export default function Homepage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const responseGoogle = res => {
    console.log(res);
  };
  return (
    <div>
      <p>Name - {name}</p>
      <p>Email - {email}</p>
      <p>Avatar - {avatar}</p>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
