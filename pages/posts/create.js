import { useState } from "react";
import Router from "next/router";
import { authPage } from "../middlewares/authorizationPage";
import Nav from "../../components/Nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return { props: { token } };
}

export default function PostCreate(props) {
  const { token } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const createPost = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const res = await createPost.json();

    Router.push("/posts");
  };

  return (
    <div>
      <Nav />

      <h1>Create a Post</h1>

      <form onSubmit={(e) => onSubmitHandler(e)}>
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
        <input type="submit" value="Create Post" />
      </form>
    </div>
  );
}
