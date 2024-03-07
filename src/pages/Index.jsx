import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Heading, Text, VStack, useToast } from "@chakra-ui/react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [delay, setDelay] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(null);
  const toast = useToast();

  const startGame = useCallback(() => {
    setIsPlaying(true);
    setDelay(Math.floor(Math.random() * 4000) + 1000);
    setStartTime(null);
    setScore(null);
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    if (startTime) {
      const endTime = Date.now();
      const newScore = endTime - startTime;
      setScore(newScore);
      toast({
        title: "Your reaction time",
        description: `${newScore} ms`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Too soon!",
        description: "Wait for the green color.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [startTime, toast]);

  useEffect(() => {
    let timeout;
    if (isPlaying && delay) {
      timeout = setTimeout(() => {
        setStartTime(Date.now());
      }, delay);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, delay]);

  return (
    <Box textAlign="center" fontSize="xl" minH="100vh" p={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          Reaction Time Test
        </Heading>
        {!isPlaying && (
          <Button colorScheme="blue" size="lg" onClick={startGame}>
            Start Game
          </Button>
        )}
        {isPlaying && <Box bg={startTime ? "green.500" : "red.500"} w="200px" h="200px" borderRadius="50%" onClick={endGame} cursor="pointer" />}
        {score !== null && (
          <Text fontSize="2xl" fontWeight="bold">
            Your reaction time: {score} ms
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
