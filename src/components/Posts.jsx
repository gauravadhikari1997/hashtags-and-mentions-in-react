import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Card from "./Card";
import Filter from "./Filter";
import { APIservice } from "../services";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const location = useLocation();

  useEffect(() => {
    getPosts();
  }, [location.pathname]);

  async function getPosts() {
    try {
      const res = await APIservice.get("/posts");
      setPosts(res.data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  // Filter posts by title or content
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(filter.toLowerCase()) ||
      post.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4">
        {filteredPosts && filteredPosts.length > 0
          ? filteredPosts
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((post) => (
                <Card
                  key={post._id}
                  title={post.title}
                  content={post.content}
                />
              ))
          : null}
        <li className="hover:shadow-lg flex rounded-lg">
          <Link
            to="/new"
            className="hover:border-gray-300 hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4"
          >
            New Post
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Posts;
