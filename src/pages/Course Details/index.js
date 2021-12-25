import {
  HStack,
  ScrollView,
  VStack,
  AlertDialog,
  Input,
  Button,
  Toast
} from "native-base";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import css from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { getprofile, logout } from "../../api/auth";
import { getsingleboughtcourse } from "../../api/courses";
import { useIsFocused } from "@react-navigation/native";
import Stars from "react-native-stars";
import starEmpty from "../../assets/images/starEmpty.png";
import starFilled from "../../assets/images/starFilled.png";
import starHalf from "../../assets/images/starHalf.png";
import { updateTestimonial } from '../../action/testimonials';

const styles = StyleSheet.create(css);
const deviceWindow = Dimensions.get("window");

const index = ({ route, navigation }) => {
  const cancelRef = useRef(null);
  const dispatch = useDispatch();
  const courseID = route.params.id;
  const [profile, setProfile] = useState({});
  const [modal, setModal] = useState(false);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [testimonial, setTestimonial] = useState({
    course_id: courseID,
    type: "user",
    review: "",
    star: 0,
    user_name: `${profile?.firstName} ${profile?.lastName}`,
  });
  // console.log(course?.course_resources);

  useEffect(() => {
    if (isFocused) {
      setCourse({});
      setLoading(true);
      const getData = async () => {
        try {
          dispatch({ type: "LOAD" });
          const { data } = await getprofile();
          setProfile(data.result);
          const res = await getsingleboughtcourse(route.params.id);
          setCourse(res.data.result);
          dispatch({ type: "UNLOAD" });
          setLoading(false);
          if (res.data.result?.modules.length !== 0) {
            if (
              res.data.result?.percent_completed >= 90 &&
              !res.data.result?.testimonial
            ) {
              setModal(true);
            }
          } else if (!res.data.result?.testimonial) {
            const today = new Date();
            const date = new Date(res.data.result.expiry);
            date.setDate(date.getDate() - 6);
            if (today > date) {
              setModal(true);
            }
          } else {
            setModal(false);
          }
        } catch (error) {
          dispatch({ type: "UNLOAD" });
          if (error.response?.status == 401) {
            logout(dispatch);

            Toast.show({
              title:
                "You have been logged out.Your MK Trading account is in use on another device",
              isClosable: true,
            });
          }
        }
      };

      getData();
    }
  }, [dispatch, setCourse, setProfile, route, isFocused]);

  return (
    <ScrollView style={styles.background}>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={modal}
        onClose={() => {
          setModal(false);
          setTestimonial({
            course_id: courseID,
            type: "user",
            review: "",
            star: 0,
            user_name: `${profile?.firstName} ${profile?.lastName}`,
          });
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton
            onPress={() => {
              setModal(false);
              setTestimonial({
                course_id: courseID,
                type: "user",
                review: "",
                star: 0,
                user_name: `${profile?.firstName} ${profile?.lastName}`,
              });
            }}
          />
          <AlertDialog.Header>Course Ratings</AlertDialog.Header>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            // style={styles.banner}
            colors={["#081c80", "#01d1fb"]}
          >
            <AlertDialog.Body>
              <VStack
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text allowFontScaling={false} style={styles.modalText}>
                  Please take a moment to tell us about your experience of this
                  course/indicator?
                </Text>
                <Stars
                  display={testimonial.star}
                  update={(val) => {
                    setTestimonial((prev) => {
                      return { ...prev, star: val };
                    });
                  }}
                  spacing={8}
                  count={5}
                  starSize={deviceWindow.width < 560 ? 26 : 40}
                  fullStar={starFilled}
                  emptyStar={starEmpty}
                  halfStar={starHalf}
                  half={true}
                />
                <Input
                  multiline
                  numberOfLines={2}
                  style={styles.inputModal}
                  value={testimonial.review}
                  onChangeText={(text) => {
                    setTestimonial((prev) => {
                      return { ...prev, review: text };
                    });
                  }}
                />
              </VStack>
            </AlertDialog.Body>
          </LinearGradient>

          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => {
                  setModal(false);
                  setTestimonial({
                    course_id: courseID,
                    type: "user",
                    review: "",
                    star: 0,
                    user_name: `${profile?.firstName} ${profile?.lastName}`,
                  });
                }}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  if (testimonial.star < 1) {
                    Toast.show({
                      title: "Please atleast 1 star",
                      isClosable: true,
                    });
                  } else if (testimonial.review === "") {
                    Toast.show({
                      title: "Please enter review",
                      isClosable: true,
                    });
                  } else {
                    setLoading(true);
                    dispatch({ type: "LOAD" });
                    dispatch(
                      updateTestimonial(
                        testimonial,
                        () => {
                          dispatch({ type: "UNLOAD" });
                          setLoading(false);
                          setModal(false);
                        },
                        () => {
                          dispatch({ type: "UNLOAD" });
                          setLoading(false);
                          setModal(true);
                        }
                      )
                    );
                  }
                }}
              >
                Confirm
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        style={styles.courseDetails}
        colors={["#E2F500", "#FFB803"]}
      >
        <VStack space={1}>
          {!loading && (
            <>
              <Text allowFontScaling={false} style={styles.courseName}>{course.name}</Text>
              <Text allowFontScaling={false} style={styles.courseText}>Current Plan: {course.plan}</Text>
              {courseID !== "612ccdb59f192c86faa26f4a" && (
                <Text allowFontScaling={false} style={styles.courseText}>
                  Expires On:
                  {new Date(course.expiry).getFullYear() > 2110
                    ? "Unlimited Plan"
                    : new Date(course.expiry).toLocaleDateString("en-gb")}
                </Text>
              )}
              {courseID === "612ccd3c9f192c86faa26f48" && (
                <Text allowFontScaling={false} style={styles.courseText}>
                  Sessions Available: {course.liveSessions}
                </Text>
              )}
            </>
          )}
        </VStack>
      </LinearGradient>
      {!loading && course?.modules?.length !== 0 && (
        <>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            style={styles.progress}
          >
            <Text allowFontScaling={false} style={styles.progressText}>Course Progress</Text>
            <Text allowFontScaling={false} style={styles.progressPercent}>
              {course?.percent_completed}%
            </Text>
          </HStack>
          <View
            style={{
              width: `${course?.percent_completed}%`,
              borderRadius: 10,
              height: 10,
              backgroundColor: "#FFC00C",
            }}
          />
        </>
      )}
      {!loading && course?.modules?.length !== 0 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Course Video", {
              id: route.params.id,
              course: course,
            })
          }
        >
          <LinearGradient
            colors={["#1963D5", "#77DDEC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1.5 }}
            style={styles.content}
          >
            <Text allowFontScaling={false} style={styles.contentText}>Course Video</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
      {!loading &&
        course?.price[0].archive.archives &&
        course?._id !== "612ccd6b9f192c86faa26f49" &&
        course?._id !== "612ccdb59f192c86faa26f4a" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Course Archive", {
                id: route.params.id,
                type: "archives",
                archives: course.price[0].archive.archives,
              })
            }
          >
            <LinearGradient
              colors={["#1963D5", "#77DDEC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.5, y: 1.5 }}
              style={styles.content}
            >
              <Text allowFontScaling={false} style={styles.contentText}>Course Sessions & Archives</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      {!loading &&
        course?.price[0].skillUpArchive.archives &&
        course?._id === "612ccd6b9f192c86faa26f49" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Course Archive", {
                id: route.params.id,
                type: "skilluparchives",
                archives: course.price[0].skillUpArchive.archives,
              })
            }
          >
            <LinearGradient
              colors={["#1963D5", "#77DDEC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.5, y: 1.5 }}
              style={styles.content}
            >
              <Text allowFontScaling={false} style={styles.contentText}>
                Skill Up Sessions & Archives
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

      {!loading &&
        course?.course_resources?.length !== 0 &&
        course?.course_resources !== undefined && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Course Content", {
                id: courseID,
                array: course.course_resources,
              })
            }
          >
            <LinearGradient
              colors={["#1963D5", "#77DDEC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.5, y: 1.5 }}
              style={styles.content}
            >
              <Text allowFontScaling={false} style={styles.contentText}>Course Content</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
    </ScrollView>
  );
};

export default index;
