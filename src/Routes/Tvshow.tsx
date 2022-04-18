import styled from "styled-components";
import { useQuery } from "react-query";
import {
  getTv,
  getRateTvshows,
  getOnTheAirTvshows,
  getAirTvshows,
  IGetTvResults,
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

function Tvshow() {
  const [selection, setSelection] = useState("Popular");
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSelection(value);
  };
  const { data: popular, isLoading } = useQuery<IGetTvResults>(
    ["tvshow", "popular"],
    getTv
  );
  const { data: rate } = useQuery<IGetTvResults>(
    ["tvshow", "topRate"],
    getRateTvshows
  );
  const { data: ontheair } = useQuery<IGetTvResults>(
    ["tvshow", "ontheair"],
    getOnTheAirTvshows
  );
  const { data: airingtoday } = useQuery<IGetTvResults>(
    ["tvshow", "airingtoday"],
    getAirTvshows
  );
  return (
    <>
      <Selector onChange={onChange} value={selection}>
        <Options>Popular</Options>
        <Options>TopRate</Options>
        <Options>OnTheAir</Options>
        <Options>AiringToday</Options>
      </Selector>
      <AnimatePresence>
        {isLoading ? (
          <div>Loading ...</div>
        ) : selection === "Popular" ? (
          <Wrapper>
            {popular?.results.map((tvshow) => (
              <Box
                key={tvshow.id}
                variants={boxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween" }}
                whileHover="hover"
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
          </Wrapper>
        ) : selection === "TopRate" ? (
          <Wrapper>
            {rate?.results.map((tvshow) => (
              <Box
                key={tvshow.id}
                variants={boxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween" }}
                whileHover="hover"
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
          </Wrapper>
        ) : selection === "OnTheAir" ? (
          <Wrapper>
            {ontheair?.results.map((tvshow) => (
              <Box
                key={tvshow.id}
                variants={boxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween" }}
                whileHover="hover"
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
          </Wrapper>
        ) : selection === "AiringToday" ? (
          <Wrapper>
            {airingtoday?.results.map((tvshow) => (
              <Box
                key={tvshow.id}
                variants={boxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween" }}
                whileHover="hover"
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
          </Wrapper>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Tvshow;
