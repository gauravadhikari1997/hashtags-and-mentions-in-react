import { useParams } from "react-router-dom";

const UserPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow border border-gray-100">
      <h1 className="text-2xl font-bold mb-2">User Page</h1>
      <p className="text-gray-600">
        User ID: <span className="font-mono text-green-600">{id}</span>
      </p>
      <p className="mt-4 text-gray-500 bg-green-50 border-l-4 border-green-400 p-4 rounded">
        TODO: This is the user details page. Here you can explore posts
        associated with this user, and discover related content.
      </p>
    </div>
  );
};

export default UserPage;
