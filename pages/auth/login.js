import React, { useState } from "react";
import Cookie from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password }));

    const login = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const loginResponse = await login.json();

    Cookie.set("token", loginResponse.token);
  };

  return (
    <div>
      <h1>Login</h1>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
