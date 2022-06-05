import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import lastFM from "../api";
import Layout from "../components/layout";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchArtistsResult, setSearchArtistsResult] = useState<any[]>([]);
  const [searchSongsResult, setSearchSongsResult] = useState<any[]>([]);
  const [emptySearch, setEmptySearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    setEmptySearch(false);

    if (!searchKeyword) {
      setSearchArtistsResult([]);
      setSearchSongsResult([]);
      setLoading(false);
      return;
    }

    const [resultArtist, resultSongs] = await Promise.all([
      lastFM.get(
        `?method=artist.search&artist=${searchKeyword}&api_key=${process.env.REACT_APP_FM_KEY}&limit=10&format=json`
      ),
      lastFM.get(
        `?method=track.search&track=${searchKeyword}&api_key=${process.env.REACT_APP_FM_KEY}&limit=10&format=json`
      ),
    ]);

    if (
      resultArtist.data.results?.artistmatches?.artist.length +
        resultSongs.data.results?.trackmatches?.track.length ===
      0
    ) {
      setEmptySearch(true);
    }

    setSearchArtistsResult(resultArtist.data.results?.artistmatches?.artist);
    setSearchSongsResult(resultSongs.data.results?.trackmatches?.track);
    setLoading(false);
  };

  return (
    <Layout>
      <InputGroup size="md" marginBottom="20px">
        <Input
          pr="4.5rem"
          placeholder="Type songs or artist"
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleSearch}>
            Cari
          </Button>
        </InputRightElement>
      </InputGroup>

      {emptySearch ? (
        <Flex alignItems="center" justifyContent="center" margin="15px 0 0 0" data-testid="no-match">
          <Text fontSize="1xl" color="gray.500">
            Nothing match with the keyword
          </Text>
        </Flex>
      ) : loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
        </Flex>
      ) : (
        searchArtistsResult.length === 0 &&
        searchSongsResult.length === 0 && (
          <Flex alignItems="center" justifyContent="center" margin="15px 0 0 0" data-testid="type-something">
            <Text fontSize="1xl" color="gray.500">
              Type something ...
            </Text>
          </Flex>
        )
      )}

      <Flex justifyContent="space-evenly">
        <Box>
          {searchArtistsResult.length > 0 && (
            <Text fontSize="3xl">Artist Result</Text>
          )}
          {searchArtistsResult.length > 0 &&
            searchArtistsResult.map((artist, idx) => {
              return (
                <Grid
                  templateColumns="50px 500px"
                  data-testid="artist-search-res"
                  gap={6}
                  key={idx}
                  padding="0 10px"
                >
                  <GridItem w="100%" h="10">
                    <Flex w="100%" h="100%" alignItems="center">
                      {idx + 1}
                    </Flex>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Flex w="100%" h="100%" alignItems="center">
                      {artist.name}
                    </Flex>
                  </GridItem>
                </Grid>
              );
            })}
        </Box>

        <Box>
          {searchSongsResult.length > 0 && (
            <Text fontSize="3xl">Song Result</Text>
          )}
          {searchSongsResult.length > 0 &&
            searchSongsResult.map((song, idx) => {
              return (
                <Grid
                  templateColumns="50px 500px"
                  data-testid="song-search-res"
                  gap={6}
                  key={idx}
                  padding="0 10px"
                >
                  <GridItem w="100%" h="10">
                    <Flex w="100%" h="100%" alignItems="center">
                      {idx + 1}
                    </Flex>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Flex w="100%" h="100%" alignItems="center">
                      {song.name}
                    </Flex>
                  </GridItem>
                </Grid>
              );
            })}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Search;
