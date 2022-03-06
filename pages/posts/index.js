import { authPage } from "../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const posts = await postReq.json();

  return { props: { posts: posts.data } };
}

export default function PostIndex(props) {
  const { posts } = props;

  return (
    <div>
      <h1>Posts</h1>

      {posts &&
        posts.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })}
    </div>
  );
}
