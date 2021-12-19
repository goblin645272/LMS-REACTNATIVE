import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  VStack,
  Center,
  Input,
  Button,
  HStack,
  ArrowBackIcon,
  ArrowForwardIcon,
  Box,
} from "native-base";
import css from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { justifyContent } from "styled-system";
const styles = StyleSheet.create(css);
const deviceWindow = Dimensions.get("window");

const index = () => {
  const [questions, setQuestions] = useState([
    {
      questionText:
        "Which type of Charts do we use for  Supply & Demand Trading  Analysis?",
      answerOptions: [
        {
          answerText: "Heikin Ashi Candlestick Charts",
          isCorrect: false,
        },
        {
          answerText: "Bar Charts",
          isCorrect: false,
        },
        {
          answerText: "Japanese Candlestick Charts",
          isCorrect: true,
        },
        {
          answerText: "Renko Charts",
          isCorrect: false,
        },
      ],
    },
    {
      questionText:
        "If the closing price of a Candle is lesser than the opening price of that candle. What will be the colour of the candle?",
      answerOptions: [
        {
          answerText: "Red",
          isCorrect: true,
        },
        {
          answerText: "Green",
          isCorrect: false,
        },
        {
          answerText: "",
          isCorrect: false,
        },
        {
          answerText: "",
          isCorrect: false,
        },
      ],
    },
    {
      questionText:
        "Open - 430 , High - 460 , Low - 425 , Close - 455 . What will be the value of the range of this candlestick ?",
      answerOptions: [
        {
          answerText: 5,
          isCorrect: false,
        },
        {
          answerText: 15,
          isCorrect: false,
        },
        {
          answerText: 35,
          isCorrect: true,
        },
        {
          answerText: 25,
          isCorrect: false,
        },
      ],
    },
    {
      questionText:
        "Open - 430 , High - 460 , Low - 425 , Close - 455 . What will be the value of the body of this candlestick ?",
      answerOptions: [
        {
          answerText: 25,
          isCorrect: true,
        },
        {
          answerText: 15,
          isCorrect: false,
        },
        {
          answerText: 35,
          isCorrect: false,
        },
        {
          answerText: 30,
          isCorrect: false,
        },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    currentQuestion: 0,
    attempt: false,
    last: false,
    first: true,
  });

  const handleAnswerOptionClick = (isCorrect) => {
    setState((prev) => {
      return {
        ...prev,
        attempt: true,
      };
    });
  };

  const handleNext = () => {
    const nextQuestion = state.currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setState((prev) => {
        return {
          ...prev,
          attempt: false,
          first: false,
          currentQuestion: nextQuestion,
        };
      });
    }
  };

  const handlePrev = () => {
    const prevQuestion = state.currentQuestion - 1;
    if (prevQuestion > -1) {
      setState((prev) => {
        return {
          ...prev,
          attempt: false,
          last: false,
          currentQuestion: prevQuestion,
        };
      });
    }
  };

  useEffect(() => {
    if (!loading && state.currentQuestion === questions?.length - 1) {
      setState((prev) => {
        return {
          ...prev,
          last: true,
        };
      });
    }
    if (!loading && state.currentQuestion === 0) {
      setState((prev) => {
        return {
          ...prev,
          first: true,
        };
      });
    }
  }, [state.currentQuestion, setState, questions, loading]);
  return (
    <ScrollView style={styles.body}>
      <VStack style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.text}>
          Question {state.currentQuestion + 1}/{questions.length}
        </Text>
        <Text style={styles.question}>
          {questions[state.currentQuestion].questionText}
        </Text>
        <VStack>
          {questions[state.currentQuestion].answerOptions.map(
            (answerOption, ind) => {
              return (
                <View key={ind}>
                  {answerOption.answerText.length !== 0 && (
                    <Button
                      style={{
                        width: deviceWindow.width * 0.8,
                        marginTop: deviceWindow.height * 0.02,
                        backgroundColor: !state.attempt
                          ? "white"
                          : !answerOption.isCorrect
                          ? "#C91515"
                          : "#1FB91F",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      disabled={state.attempt}
                      onPress={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }
                    >
                      <Text
                        style={{
                          fontSize: deviceWindow.height * 0.025,
                          fontFamily: "Barlow_600SemiBold",
                          color: !state.attempt ? "#022460" : "white",
                        }}
                      >
                        {answerOption.answerText.toString()}
                      </Text>
                    </Button>
                  )}
                </View>
              );
            }
          )}
        </VStack>
        <HStack
          style={{
            marginTop: deviceWindow.height * 0.03,
            alignItems: "center",
            justifyContent: "center",
          }}
          space={8}
        >
          <View style={{ width: deviceWindow.width * 0.2 }}>
            {!state.first && (
              <Button
                style={{ height: deviceWindow.height * 0.06 }}
                onPress={handlePrev}
              >
                <Text textAlign="center">
                  <ArrowBackIcon />
                </Text>
              </Button>
            )}
          </View>
          <View style={{ width: deviceWindow.width * 0.35 }}>
            <Button
              style={{
                height: deviceWindow.height * 0.06,
              }}
            >
              <Text
                textAlign="center"
                style={{
                  fontSize: deviceWindow.height * 0.025,
                  fontFamily: "Barlow_600SemiBold",
                  color: "#022460",
                }}
              >
                {!state.last ? "Skip Quiz" : "End Quiz"}
              </Text>
            </Button>
          </View>
          <View style={{ width: deviceWindow.width * 0.2 }}>
            {!state.last && (
              <Button
                style={{ height: deviceWindow.height * 0.06 }}
                onPress={handleNext}
              >
                <Text textAlign="center">
                  <ArrowForwardIcon />
                </Text>
              </Button>
            )}
          </View>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default index;
