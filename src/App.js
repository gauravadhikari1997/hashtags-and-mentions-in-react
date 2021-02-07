import Filter from "./components/Filter";
import Header from "./components/Header";
import Posts from "./components/Posts";

function App() {
  return (
    <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
      <Header />
      <Filter />
      <Posts />
    </section>
  );
}

export default App;
