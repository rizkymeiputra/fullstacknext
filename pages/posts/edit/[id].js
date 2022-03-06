import { useState } from "react";
import Router from "next/router";
import { authPage } from "../../middlewares/authorizationPage";
import Nav from "../../../components/Nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const { id } = ctx.query;

  const postReq = await fetch(`http://localhost:3000/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const post = await postReq.json();

  return { props: { id, token, post: post.data } };
}

export default function PostEdit(props) {
  const { id, token, post } = props;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onUpdateHandler = async (e) => {
    e.preventDefault();

    const updatePost = await fetch(`/api/posts/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const res = await updatePost.json();

    Router.push("/posts");
  };

  return (
    <div>
      <Nav />
      <h1>Edit Post</h1>

      <form onSubmit={(e) => onUpdateHandler(e)}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <input type="submit" value="Update Post" />
      </form>
    </div>
  );
}
