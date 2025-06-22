import parse from "html-react-parser";
import { Link } from "react-router-dom";

const Card = ({ title, content }) => {
  return (
    <li className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="mb-1">
        <span className="text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </span>
      </div>
      <div className="text-gray-700 text-sm leading-relaxed break-words">
        {parse(content, {
          replace: (domNode) => {
            if (domNode.name === "a") {
              const node = domNode.children[0];
              return (
                <Link
                  to={domNode.attribs.href}
                  className={
                    node.data && node.data[0] === "#"
                      ? "text-green-500 font-medium hover:underline"
                      : "text-blue-500 font-medium hover:underline"
                  }
                >
                  {node.data}
                </Link>
              );
            }
          },
        })}
      </div>
    </li>
  );
};

export default Card;
