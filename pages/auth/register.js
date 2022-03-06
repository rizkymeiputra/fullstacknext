import React, { useState } from "react";
import { unauthPage } from "../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password }));

    const register = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const registerResponse = await register.json();
    console.log(registerResponse);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <label>
          Email
          <br />
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
