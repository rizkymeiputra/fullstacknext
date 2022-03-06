import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import { unauthPage } from "../middlewares/authorizationPage";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = Cookie.get("token");

    if (token) return Router.push("/posts");
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const login = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const loginResponse = await login.json();

    Cookie.set("token", loginResponse.token);

    Router.push("/posts");
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
      <Link href="/auth/register">Create an account</Link>
    </div>
  );
}
