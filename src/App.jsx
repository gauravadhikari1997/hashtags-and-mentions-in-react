import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Filter, Header, NewPost, Posts } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
              <Filter />
              <Posts />
            </section>
          }
        />
        <Route path="/new" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
