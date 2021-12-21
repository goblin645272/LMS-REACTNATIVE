import React, { useEffect } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import css from "./styles";
import { VStack, ScrollView, Accordion } from "native-base";
import CustomScroll from "../../Components/CustomScroll";
const styles = StyleSheet.create(css);
import cash from "../../assets/images/cash.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../action/blogs";
const index = () => {
  const blogs = useSelector((state) => state.blogs);
  console.log(blogs);
  const deviceWindow = Dimensions.get("window");
  const dispatch = useDispatch();
  useEffect(() => {
    const getdata = async () => {
      await getBlogs(dispatch);
    };
    getdata();
  }, [dispatch]);

  return (
    <ScrollView style={styles.scroll}>
      <Image source={cash} style={styles.banner} resizeMode="cover" />
      <View style={{ padding: 5 }}>
        {blogs?.map((data) => {
          return (
            <Accordion key={data._id}>
              <Accordion.Item>
                <Accordion.Summary>
                  <Text
                    style={{
                      width: deviceWindow.width * 0.7,
                      color: "#000260",
                      fontFamily: "Barlow_600SemiBold",
                    }}
                  >
                    {data.title}
                  </Text>
                  <Accordion.Icon
                    style={{
                      width: deviceWindow.width * 0.2,
                      color: "#000260",
                      fontFamily: "Barlow_400Regular",
                    }}
                  />
                </Accordion.Summary>
                <Accordion.Details style={{ padding: 0 }}>
                  <VStack
                    style={{
                      height: deviceWindow.height * 0.35,
                      flex: 1,
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    <CustomScroll
                      content={data.content}
                      backgroundColor="transparent"
                      foregroundColor="#0E78CF"
                      textsize="0.021"
                      contentColor="rgb(2, 36, 96)"
                      contentBackground="transparent"
                    />

                    <Text
                      style={{
                        fontSize: deviceWindow.height * 0.025,
                        marginBottom: deviceWindow.height * 0.03,
                        color: "#000260",
                        fontFamily: "Barlow_500Medium",
                      }}
                    >
                      {`~${data.author}`}
                    </Text>
                  </VStack>
                </Accordion.Details>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default index;
