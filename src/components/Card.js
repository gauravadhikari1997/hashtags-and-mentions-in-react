const Card = () => {
  return (
    <li x-for="item in items">
      <a
        href="item.url"
        className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200"
      >
        <div className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-1 items-center">
          <div>
            <span className=" leading-6 font-medium text-black">Title</span>
          </div>
          <div>
            <span className="group-hover:text-light-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought to have scrambled parts of Cicero's De Finibus Bonorum et
              Malorum for use in a type specimen book.
            </span>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Card;
