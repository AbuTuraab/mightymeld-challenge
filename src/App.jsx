import { useState } from "react";
import { StartScreen, PlayScreen } from "./Screens";
import { Stack, Box, Text, Heading, Button, Center } from "@chakra-ui/react";

function App() {
  const [gameState, setGameState] = useState("start");

  switch (gameState) {
    case "start":
      return (
        <StartScreen start={() => setGameState("play")}>
           <Center
flexDirection="column"
bg="teal.50"
width="400px"
height="400px"
borderRadius="10px"
>
            <Box w="100%" color="teal.500" p="5">
              <Heading>Memory</Heading>
            </Box>
            <Box w="100%">
              <Text>Flip over tiles looking for pairs</Text>
            </Box>
            <Box w="100%">
              <Button variant="primary">Button</Button>
            </Box>
          </Center>
        </StartScreen>
      );
    case "play":
      return (
        <PlayScreen end={() => setGameState("start")}>
          <Stack direction={["column", "row"]} spacing="24px">
            <Box w="100%" />
            <Box w="100%" bg="green.200">
              <Text>Tries</Text>
            </Box>
            <Box w="100%">
              <Text>TryCount</Text>
            </Box>
          </Stack>
        </PlayScreen>
      );
    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default App;
