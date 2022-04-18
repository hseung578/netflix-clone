import styled from "styled-components";
import { useQuery } from "react-query";
import {
  getMovies,
  getRateMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  IGetMoviesResults,
} from "./../api";
import { useState } from "react";
import { makeImagePath } from "./../utils";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
  position: relative;
  top: 80px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 10px;
`;

const Selector = styled.select`
  position: relative;
  top: 70px;
  margin-left: 60px;
  background-color: black;
  border: 1px solid whitesmoke;
  color: ${(props) => props.theme.white.lighter};
  font-size: 1rem;
`;

const Options = styled.option``;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 150px;
  background-color: white;
  border-radius: 10px;
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  hidden: {
    y: -window.innerHeight - window.innerHeight / 200,
  },
  visible: {
    y: 0,
  },
  exit: {
    y: window.innerHeight + window.innerHeight / 200,
  },
  hover: {
    y: -20,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

function Movie() {
  const [selection, setSelection] = useState("Popular");
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSelection(value);
  };
  const { data: popular, isLoading } = useQuery<IGetMoviesResults>(
    ["movie", "popular"],
    getMovies
  );
  const { data: rate } = useQuery<IGetMoviesResults>(
    ["movie", "topRate"],
    getRateMovies
  );
  const { data: nowplaying } = useQuery<IGetMoviesResults>(
    ["movie", "nowplaying"],
    getNowPlayingMovies
  );
  const { data: upcoming } = useQuery<IGetMoviesResults>(
    ["movie", "upcoming"],
    getUpcomingMovies
  );
  return (
    <>
      <Selector onChange={onChange} value={selection}>
        <Options>Popular</Options>
        <Options>TopRate</Options>
        <Options>NowPlaying</Options>
        <Options>Upcoming</Options>
      </Selector>
      <AnimatePresence>
        {isLoading ? (
          <div>Loading ...</div>
        ) : selection === "Popular" ? (
          <Wrapper>
            {popular?.results.map((movie) => (
              <Box
                key={movie.id}
                variants={boxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween" }}
                whileHover="hover"
                bgphoto={makeImagePath(
                  movie.backdrop_path || movie.poster_path,
                  "w500"
                )}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
          </Wrapper>
        ) : selection === "TopRate" ? (
          <Wrapper>
            {rate?.results.map((movie) => (
              <Box
                key={movie.id}
                variants={boxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                transition={{ type: "tween" }}
                bgphoto={makeImagePath(
                  movie.backdrop_path || movie.poster_path,
                  "w500"
                )}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
          </Wrapper>
        ) : selection === "NowPlaying" ? (
          <Wrapper>
            {nowplaying?.results.map((movie) => (
              <Box
                key={movie.id}
                variants={boxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                transition={{ type: "tween" }}
                bgphoto={makeImagePath(
                  movie.backdrop_path || movie.poster_path,
                  "w500"
                )}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
          </Wrapper>
        ) : selection === "Upcoming" ? (
          <Wrapper>
            {upcoming?.results.map((movie) => (
              <Box
                key={movie.id}
                variants={boxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                transition={{ type: "tween" }}
                bgphoto={makeImagePath(
                  movie.backdrop_path || movie.poster_path,
                  "w500"
                )}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
          </Wrapper>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Movie;
