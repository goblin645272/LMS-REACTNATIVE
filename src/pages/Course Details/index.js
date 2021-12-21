import { HStack, ScrollView, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import css from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getprofile } from "../../api/auth";
import { getsingleboughtcourse } from "../../api/courses";
const styles = StyleSheet.create(css);

const index = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const courseID = route.params.id;
  const [profile, setProfile] = useState({});
  const [modal, setModal] = useState(false);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  // console.log(course?.course_resources);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: "LOAD" });
        const { data } = await getprofile();
        setProfile(data.result);
        const res = await getsingleboughtcourse(route.params.id);
        setCourse(res.data.result);
        dispatch({ type: "UNLOAD" });
        setLoading(false);
      } catch (error) {
        dispatch({ type: "UNLOAD" });
        console.log(error);
      }
    };
    getData();
  }, [dispatch, setCourse, setProfile, route]);

  useEffect(() => {
    if (!loading) {
      if (course?.modules.length !== 0) {
        if (course?.percent_completed >= 90 && !course?.testimonial) {
          setModal(true);
        }
      } else if (!course?.testimonial) {
        const today = new Date();
        const date = new Date(course.expiry);
        date.setDate(date.getDate() - 6);
        if (today > date) {
          setModal(true);
        }
      }
    }
  }, [course, loading, setModal]);

  return (
    <ScrollView style={styles.background}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        style={styles.courseDetails}
        colors={["#E2F500", "#FFB803"]}
      >
        <VStack space={1}>
          {!loading && (
            <>
              <Text style={styles.courseText}>Current Plan: {course.plan}</Text>
              {courseID !== "612ccdb59f192c86faa26f4a" && (
                <Text style={styles.courseText}>
                  Expires On:{" "}
                  {new Date(course.expiry).getFullYear() > 2110
                    ? "Unlimited Plan"
                    : new Date(course.expiry).toLocaleDateString("en-gb")}
                </Text>
              )}
              {courseID === "612ccd3c9f192c86faa26f48" && (
                <Text style={styles.courseText}>
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
            <Text style={styles.progressText}>Course Progress</Text>
            <Text style={styles.progressPercent}>
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
              course: course
            })
          }
        >
          <LinearGradient
            colors={["#1963D5", "#77DDEC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1.5 }}
            style={styles.content}
          >
            <Text style={styles.contentText}>Course Video</Text>
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
              <Text style={styles.contentText}>Course Sessions & Archives</Text>
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
              <Text style={styles.contentText}>
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
              <Text style={styles.contentText}>Course Content</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
    </ScrollView>
  );
};

export default index;
