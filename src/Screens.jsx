import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import {
  Box,
  Button,
  AbsoluteCenter,
  Heading,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { Tile } from "./Tile";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start }) {
  return (
    <>
      <Center
        flex="row"
        flexDirection="column"
        bg="teal.50"
        width="400px"
        height="400px"
        borderRadius="10px"
      >
        <Box color="teal.500" p="5">
          <Heading as="h2" size="xl">
            Memory
          </Heading>
        </Box>
        <Box color="teal.400" p="5">
          <p>Flip over tiles looking for pairs</p>
        </Box>

        <Box>
          <Button
            borderRadius="20px"
            p="5"
            m="5"
            color="white"
            colorScheme="teal.400"
            bgGradient="linear(to-b, teal.400, teal.600)"
            width="110px"
            onClick={start}
          >
            Play
          </Button>
        </Box>
      </Center>
    </>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti();
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        p="5"
        alignContent="center"
        justifyContent="center"
        alignText="center"
        
        >
        <Box color="green.500" marginRight='10px' 
        alignItems="center" alignContent="center">
          <p>Tries</p>
        </Box>
        <Box bg="green.100" borderRadius="5px" color="green.500" 
        paddingLeft="10px" paddingRight='10px' >
           <Box w="100%" pl="10px" />

          {tryCount}
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 90px)"
        gridTemplateRows="repeat(4, 90px)"
        gridGap="5px"
        bg="green.50"
        height="400px"
        width="400px"
        alignContent="center"
        justifyContent="center"
        borderRadius="10px"
        paddingLeft="10px"
        paddingTop='10px'
      >
        {getTiles(16).map((tile, i) => (
          <Tile
            key={i}
            flip={() => flip(i)}
            {...tile}
            position="relative"
            borderRadius="10px"
            alignContent="center"
        justifyContent="center"
        alignText="center"
          />
        ))}
      </Box>
    </>
  );
}
