import { useState } from "react";
import Router from "next/router";
import { authPage } from "../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const { id } = ctx.query;

  const postReq = await fetch(`http://localhost:3000/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const post = await postReq.json();

  return { props: { post: post.data } };
}

export default function PostEdit(props) {
  const { post } = props;
  const { title, content } = post;

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}
