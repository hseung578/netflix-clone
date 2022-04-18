import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Tvshow from "./Routes/Tvshow";
import Search from "./Routes/Search";
import Movie from "./Routes/Movie";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="movie/:movieId" element={<Home />} />
          <Route path="tvshow/:tvId" element={<Home />} />
        </Route>
        <Route path="/movies" element={<Movie />}></Route>
        <Route path="/tvshows" element={<Tvshow />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
