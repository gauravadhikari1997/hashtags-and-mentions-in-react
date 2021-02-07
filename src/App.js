import { BrowserRouter, Route } from "react-router-dom";

import { Filter, Header, NewPost, Posts } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/">
        <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
          <Filter />
          <Posts />
        </section>
      </Route>
      <Route path="/new">
        <NewPost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
