import {
  Button,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import lastFM from "../../api";

const TopArtist = () => {
  const [topArtists, setTopArtists] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    lastFM
      .get(
        `?method=chart.gettopartists&api_key=${process.env.REACT_APP_FM_KEY}&format=json&limit=${limit}`
      )
      .then((data) => {
        setTopArtists(data.data.artists?.artist);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [limit]);

  const addLimit = () => {
    setLimit((prevState) => prevState + 10);
    setLoading(true);
  };

  return (
    <Stack margin="0 0 20px 0">
      <Text fontSize="3xl">Top Artist</Text>
      <Grid
        templateColumns="50px 250px"
        gap={6}
        padding="5px 10px"
        borderRadius="5px"
      >
        <GridItem w="100%" h="10">
          <Flex w="100%" h="100%" alignItems="center">
            #
          </Flex>
        </GridItem>
        <GridItem w="100%" h="10">
          <Flex w="100%" h="100%" alignItems="center">
            Name
          </Flex>
        </GridItem>
      </Grid>

      {topArtists.length > 0 &&
        topArtists.map((artist, idx) => {
          return (
            <Grid
              data-testid="artist-item"
              templateColumns="50px 250px"
              gap={6}
              key={idx}
              borderRadius="5px"
              background="gray.200"
              padding="5px 10px"
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

      {loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="gray.500"
            size="xl"
          />
        </Flex>
      ) : (
        limit < 50 && (
          <Flex alignItems="center" justifyContent="center">
            <Button colorScheme="blackAlpha" onClick={addLimit}>
              Show More
            </Button>
          </Flex>
        )
      )}
    </Stack>
  );
};

export default TopArtist;
