import { Flex } from "@chakra-ui/react";
import Layout from "../components/layout";
import TopArtist from "../components/top-artist/TopArtists";
import TopSongs from "../components/top-songs/TopSongs";

const Homepage = () => {

  return (
    <Layout>
      <Flex justifyContent="space-around" padding="20px" flexWrap="wrap">
        <TopSongs />
        <TopArtist />
      </Flex>
    </Layout>
  );
};

export default Homepage;
