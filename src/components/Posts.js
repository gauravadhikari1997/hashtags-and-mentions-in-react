import Card from "./Card";

const Posts = () => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
      <Card />
      <Card />
      <Card />
      <li className="hover:shadow-lg flex rounded-lg">
        <a
          href="/new"
          className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4"
        >
          New Post
        </a>
      </li>
    </ul>
  );
};

export default Posts;
