import { useState } from "react";
import Router from "next/router";
import { authPage } from "../middlewares/authorizationPage";
import Link from "next/link";
import Nav from "../../components/Nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const { id } = ctx.query;

  const postReq = await fetch(`http://localhost:3000/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const post = await postReq.json();

  return { props: { id, post: post.data } };
}

export default function PostEdit(props) {
  const { id, post } = props;
  const { title, content } = post;

  return (
    <div>
      <Nav />
      <h1>{title}</h1>
      <p>{content}</p>
      <Link href={`/posts/edit/${id}`} passHref={true}>
        <button>Edit this post</button>
      </Link>
    </div>
  );
}
