import { useState } from "react";
import Link from "next/link";
import { authPage } from "../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const posts = await postReq.json();

  return { props: { token, posts: posts.data } };
}

export default function PostIndex(props) {
  const { posts: data, token } = props;
  const [posts, setPosts] = useState(data);

  const deleteHandler = async (id) => {
    const isConfirmed = confirm("This data will be deleted, are you sure?");

    if (isConfirmed) {
      const deletePost = await fetch(`/api/posts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const deleteRes = await deletePost.json();

      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div>
      <h1>Posts</h1>

      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <strong>{post.title}</strong>
            <div>
              <Link href={`/posts/edit/${post.id}`}>Edit</Link>
              <button onClick={() => deleteHandler(post.id)}>Delete</button>
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
}
