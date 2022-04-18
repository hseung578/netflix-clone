import { useQuery } from "react-query";
import {
  getMovies,
  getTv,
  getGenre,
  IGetMoviesResults,
  IGetTvResults,
  IGetGenre,
} from "./../api";
import styled from "styled-components";
import { makeImagePath } from "./../utils";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 1.2rem;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -150px;
`;

const SliderTwo = styled.div`
  position: relative;
  top: 50px;
`;

const SliderTitle = styled.h2`
  font-size: 1.8rem;
  padding: 20px;
`;

const RightBtn = styled.button`
  position: absolute;
  z-index: 1;
  right: 0;
  height: 150px;
  width: 50px;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.white.darker};
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 1);
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, minmax(200px, 1fr));
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  height: 150px;
  font-size: 30px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 24px;
  position: relative;
`;

const BigGenre = styled.ul`
  position: relative;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
`;

const Genres = styled.li`
  border: 1px solid white;
  border-radius: 5px;
  margin-right: 10px;
  padding: 5px;
  font-size: 14px;
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  position: relative;
`;

const rowVariants = {
  hidden: {
    x: window.innerWidth + window.innerWidth / 200,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - window.innerWidth / 200,
  },
};

const BoxVariant = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

function Home() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movie/:movieId");
  const bigTvshowMatch = useMatch("/tvshow/:tvId");
  const { scrollY } = useViewportScroll();
  const { data: movie, isLoading: mainLoading } = useQuery<IGetMoviesResults>(
    ["movie", "popular"],
    getMovies
  );
  const { data: tvshow } = useQuery<IGetTvResults>(
    ["tvshow", "popular"],
    getTv
  );
  const { data: genre } = useQuery<IGetGenre>("genre", getGenre);
  const [index, setIndex] = useState(0);
  const [tvshowIndex, setTvshowIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (movie) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = movie.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const increaseTvshowIndex = () => {
    if (tvshow) {
      if (leaving) return;
      toggleLeaving();
      const totalTvshows = tvshow.results.length - 1;
      const maxIndex = Math.floor(totalTvshows / offset) - 1;
      setTvshowIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onMovieClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const onTvClicked = (tvshowId: number) => {
    navigate(`/tvshow/${tvshowId}`);
  };
  const onOverlayClick = () => navigate("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    movie?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  const clickedTvshow =
    bigTvshowMatch?.params.tvId &&
    tvshow?.results.find(
      (tvshow) => String(tvshow.id) === bigTvshowMatch.params.tvId
    );
  return (
    <Wrapper>
      {mainLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              movie?.results[0].backdrop_path ||
                movie?.results[0].poster_path ||
                ""
            )}
          >
            <Title>{movie?.results[0].title}</Title>
            <Overview>{movie?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <SliderTitle>Popular Movie</SliderTitle>
            <RightBtn onClick={increaseIndex}>▶</RightBtn>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ tpye: "tween", duration: 1 }}
                key={index}
              >
                {movie?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={BoxVariant}
                      onClick={() => onMovieClicked(movie.id)}
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
              </Row>
            </AnimatePresence>
          </Slider>
          <SliderTwo>
            <SliderTitle>Popular TVshow</SliderTitle>
            <RightBtn onClick={increaseTvshowIndex}>▶</RightBtn>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ tpye: "tween", duration: 1 }}
                key={tvshowIndex}
              >
                {tvshow?.results
                  .slice(offset * tvshowIndex, offset * tvshowIndex + offset)
                  .map((tvshow) => (
                    <Box
                      layoutId={tvshow.id + ""}
                      key={tvshow.id}
                      whileHover="hover"
                      initial="normal"
                      variants={BoxVariant}
                      onClick={() => onTvClicked(tvshow.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(
                        tvshow.backdrop_path || tvshow.poster_path,
                        "w500"
                      )}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tvshow.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </SliderTwo>
          <AnimatePresence>
            {bigMovieMatch || bigTvshowMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={
                    bigMovieMatch?.params.movieId || bigTvshowMatch?.params.tvId
                  }
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigGenre>
                        {clickedMovie.genre_ids.map((g) =>
                          genre?.genres.map((n) =>
                            n.id === g ? (
                              <Genres key={n.id}>{n.name}</Genres>
                            ) : null
                          )
                        )}
                      </BigGenre>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                  {clickedTvshow && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedTvshow.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedTvshow.name}</BigTitle>
                      <BigGenre>
                        {clickedTvshow.genre_ids.map((g) =>
                          genre?.genres.map((n) =>
                            n.id === g ? (
                              <Genres key={n.id}>{n.name}</Genres>
                            ) : null
                          )
                        )}
                      </BigGenre>
                      <BigOverview>{clickedTvshow.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
