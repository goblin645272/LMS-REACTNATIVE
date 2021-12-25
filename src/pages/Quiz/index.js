import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  VStack,
  Button,
  HStack,
  ArrowBackIcon,
  ArrowForwardIcon,
} from "native-base";
import css from "./styles";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { getQuizById } from "../../action/quiz";
import { useIsFocused } from "@react-navigation/native";
const styles = StyleSheet.create(css);
const deviceWindow = Dimensions.get("window");

const index = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      setQuestions([]);
      setState({
        currentQuestion: 0,
        attempt: false,
        last: false,
        first: true,
      });
    }
  }, [isFocused]);
  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getQuizById(route.params.id));
      if (data !== undefined) {
        setQuestions(data[0]?.quiz);
        dispatch({ type: "UNLOAD" });
      }
      setLoading(false);
    };
    getData();
  }, [dispatch, route]);

  return (
    <>
      {loading ? (
        <View></View>
      ) : (
        <ScrollView style={styles.body}>
          <VStack style={{ justifyContent: "center", alignItems: "center" }}>
            <Text allowFontScaling={false} style={styles.text}>
              Question {state.currentQuestion + 1}/{questions.length}
            </Text>
            <Text allowFontScaling={false} style={styles.question}>
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
                    <Text allowFontScaling={false} textAlign="center">
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
                  onPress={() =>
                    navigation.navigate("Course Video", {
                      course: route.params.course,
                    })
                  }
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
                    <Text allowFontScaling={false} textAlign="center">
                      <ArrowForwardIcon />
                    </Text>
                  </Button>
                )}
              </View>
            </HStack>
          </VStack>
        </ScrollView>
      )}
    </>
  );
};

export default index;
