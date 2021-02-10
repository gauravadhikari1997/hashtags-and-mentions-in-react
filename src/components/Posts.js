import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIservice } from "../services";

import Card from "./Card";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const res = await APIservice.get("/posts");
      setPosts(res.data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
      {posts && posts.length > 0
        ? posts
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((post) => (
              <Card key={post._id} title={post.title} content={post.content} />
            ))
        : null}
      <li className="hover:shadow-lg flex rounded-lg">
        <Link
          to="/new"
          className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4"
        >
          New Post
        </Link>
      </li>
    </ul>
  );
};

export default Posts;
