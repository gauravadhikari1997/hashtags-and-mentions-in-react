import { useEffect, useState, useRef } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { Link, useNavigate } from "react-router-dom";

import { APIservice } from "../services";
import Filter from "./Filter";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const myInput = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getActors();
  }, []);

  function addContent(input) {
    if (input.length <= 350) {
      setContent(input);
    }
  }

  async function getActors() {
    const res = await APIservice.get(`/users`);
    // Transform the users to what react-mentions expects
    const usersArr = [];
    res.data.users.map((item) =>
      usersArr.push({
        id: item._id,
        display: item.name,
      })
    );
    setUsers(usersArr);
  }

  async function asyncTags(query, callback) {
    if (!query) return;

    APIservice.get(`/tag/search?name=${query}`)
      .then((res) => {
        if (res.data.tags.length) {
          const suggestion = { id: query, display: query };
          const tagsArray = res.data.tags.map((tag) => ({
            id: tag._id,
            display: tag.name,
          }));
          return [...tagsArray, suggestion];
        } else {
          return [{ id: query, display: query }];
        }
      })
      .then(callback);
  }

  async function savePost(e) {
    e.preventDefault();

    let newContent = content;

    newContent = newContent.split("@@@__").join('<a href="/user/');
    newContent = newContent.split("^^^__").join(`">@`);
    newContent = newContent.split("@@@^^^").join("</a>");

    newContent = newContent.split("$$$__").join('<a href="/tag/');
    newContent = newContent.split("~~~__").join(`">#`);
    newContent = newContent.split("$$$~~~").join("</a>");
    if (newContent !== "") {
      let body = newContent.trim();
      //Call to your DataBase like backendModule.savePost(body,  along_with_other_params);
      tagNames.map(async (tag) => {
        try {
          await APIservice.post("/tag", {
            name: tag,
          });
        } catch (error) {
          console.log(error);
        }
      });
      console.log(body);
      try {
        await APIservice.post("/post", {
          title,
          content: body,
          createdAt: new Date().getTime(),
        });
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>
      <form
        onSubmit={savePost}
        className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
        />
        <div className="description outline-none">
          <MentionsInput
            className="mentions"
            inputRef={myInput}
            spellCheck="false"
            placeholder="Describe everything about this post here"
            value={content}
            onChange={(event) => addContent(event.target.value)}
          >
            <Mention
              trigger="@"
              data={users}
              markup="@@@____id__^^^____display__@@@^^^"
              style={{
                backgroundColor: "#daf4fa",
              }}
              // onAdd={(id) => setActorIds((actorIds) => [...actorIds, id])}
              appendSpaceOnAdd={true}
            />
            <Mention
              trigger="#"
              data={asyncTags}
              markup="$$$____id__~~~____display__$$$~~~"
              style={{
                backgroundColor: "#daf4fa",
              }}
              onAdd={(display) =>
                setTagNames((tagNames) => [...tagNames, display])
              }
              appendSpaceOnAdd={true}
            />
          </MentionsInput>
        </div>

        <div className="icons flex text-gray-500 m-2">
          <div
            onClick={() => {
              myInput.current.focus();
              setContent((content) => content + "@");
            }}
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full py-1 px-6"
          >
            @
          </div>
          <div
            onClick={() => {
              myInput.current.focus();
              setContent((content) => content + "#");
            }}
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full py-1 px-6"
          >
            #
          </div>
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            {350 - content.length}/350
          </div>
        </div>
        <div className="buttons flex">
          <Link
            to="/"
            className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
          >
            Cancel
          </Link>
          <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
            Post
          </button>
        </div>
      </form>
    </>
  );
};

export default NewPost;
