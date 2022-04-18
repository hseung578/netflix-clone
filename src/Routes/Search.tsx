import { useMatch, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath } from "./../utils";
import { motion } from "framer-motion";

interface IKeyword {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  media_type: string;
}

interface IGetKeywordResults {
  page: number;
  results: IKeyword[];
  total_pages: number;
  total_results: number;
}

const Wrapper = styled.div`
  position: relative;
  top: 80px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 10px;
`;

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

const Type = styled(motion.div)`
  width: 65px;
  background-color: whitesmoke;
  color: ${(props) => props.theme.black.veryDark};
  border: 1px solid ${(props) => props.theme.black.veryDark};
  border-radius: 5px;
  font-weight: bolder;
  font-size: 16px;
  text-align: center;
  opacity: 0;
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

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const keywordMatch = useMatch("keyword");
  function getKeywordMovie() {
    return fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=a9bb50d3a70aa927c8941fe9d4482b24&query=${keyword}&page=1&include_adult=false&region=kr`
    ).then((response) => response.json());
  }
  const { data, isLoading } = useQuery<IGetKeywordResults>(
    "keyword",
    getKeywordMovie
  );
  return (
    <Wrapper>
      {keywordMatch ?? isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {data?.results.map((keyword) => (
            <Box
              variants={boxVariants}
              key={keyword.id}
              whileHover="hover"
              transition={{ type: "tween" }}
              bgphoto={makeImagePath(
                keyword.backdrop_path || keyword.poster_path,
                "w500"
              )}
            >
              <Type variants={infoVariants}>
                {keyword.media_type.toUpperCase()}
              </Type>
              <Info variants={infoVariants}>
                <h4>{keyword.title || keyword.name}</h4>
              </Info>
            </Box>
          ))}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
