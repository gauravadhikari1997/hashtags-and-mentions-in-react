import { useEffect, useState, useRef } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { Link, useNavigate } from "react-router-dom";

import { APIservice } from "../services";

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
    <div className="flex justify-center items-center py-8">
      <form
        onSubmit={savePost}
        className="w-full max-w-xl bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-4"
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-gray-700 mb-1">New Post</h2>
          <p className="text-sm text-gray-400">
            Share your thoughts with hashtags and mentions
          </p>
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
          required
        />
        <div>
          <MentionsInput
            singleLine={false}
            className="mentions"
            inputRef={myInput}
            spellCheck="false"
            placeholder="Describe everything about this post here"
            value={content}
            onChange={(event) => addContent(event.target.value)}
            required
          >
            <Mention
              trigger="@"
              data={users}
              markup="@@@____id__^^^____display__@@@^^^"
              displayTransform={(_, display) => `@${display}`}
              style={{ backgroundColor: "#daf4fa" }}
              appendSpaceOnAdd
            />
            <Mention
              trigger="#"
              data={asyncTags}
              markup="$$$____id__~~~____display__$$$~~~"
              displayTransform={(_, display) => `#${display}`}
              style={{ backgroundColor: "#daf4fa" }}
              onAdd={(display) => setTagNames((tags) => [...tags, display])}
              appendSpaceOnAdd
            />
          </MentionsInput>
        </div>
        <div className="flex items-center text-gray-500 text-xs justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                myInput.current.focus();
                setContent((content) => content + "@");
              }}
              className="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition text-base font-semibold"
            >
              @
            </button>
            <button
              type="button"
              onClick={() => {
                myInput.current.focus();
                setContent((content) => content + "#");
              }}
              className="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition text-base font-semibold"
            >
              #
            </button>
          </div>
          <div className="ml-auto text-gray-400 text-xs font-semibold">
            {350 - content.length}/350
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Link
            to="/"
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-500 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
