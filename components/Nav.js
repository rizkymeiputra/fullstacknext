import Cookie from "js-cookie";
import Link from "next/link";
import Router from "next/router";

export default function Nav() {
  const logoutHandler = () => {
    Cookie.remove("token");
    Router.replace("/auth/login");
  };

  return (
    <nav>
      <Link href="/posts">Home</Link>
      &nbsp; | &nbsp;
      <Link href="/posts/create">Create Post</Link>
      &nbsp; | &nbsp; <button onClick={logoutHandler}>Logout</button>
      <hr />
    </nav>
  );
}
