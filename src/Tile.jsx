import { Box } from "@chakra-ui/react";

export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Box
          onClick={flip}
          display="inline-block"
          width="75px"
          height="75px"
         alignItems="center"
          bg="green.300"
          borderRadius={10}
        >
          
        </Box>
      );
    case "flipped":
      return (
        <Box
          display="inline-block"
          width="75px"
          height="75px"
          textAlign="center"
          bg="green.500"
          color="white"
          borderRadius={5}
        >
          <Content
            style={{
              display: "inline-block",
              width: "60px",
              height: "75px",
              verticalAlign: "top",
            }}
          />
        </Box>
      );
    case "matched":
      return (
        <Box
          display="inline-block"
          width="100%"
          height="100%"
          textAlign="center"
          color="green.100"
        >
          <Content
            style={{
              display: "inline-block",
              width: "70%",
              height: "70%",
              verticalAlign: "top",
              margin:'10px'
            }}
          />
        </Box>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}
