import parse from "html-react-parser";
import { Link } from "react-router-dom";

const Card = () => {
  const content =
    "Lorem ipsum, <a href='/Malorum'>@Malorum</a> or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or <a href='/web'>#web designs</a>. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et  for use in a type specimen book.";

  return (
    <li x-for="item in items">
      <div
        href="item.url"
        className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200"
      >
        <div className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-1 items-center">
          <div>
            <span className="leading-6 font-medium text-black">
              Title is a dummy title text
            </span>
          </div>
          <div>
            <span className="group-hover:text-light-blue-200 text-gray-500 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
              {parse(content.slice(0, 200), {
                replace: (domNode) => {
                  if (domNode.name === "a") {
                    const node = domNode.children[0];
                    return (
                      <Link
                        to={domNode.attribs.href}
                        className={
                          node.data[0] === "#"
                            ? "text-green-400"
                            : "text-blue-400"
                        }
                      >
                        {node.data}
                      </Link>
                    );
                  }
                },
              })}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
