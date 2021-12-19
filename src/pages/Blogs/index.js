import React, { useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import css from "./styles";
import { ScrollView, Input } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const styles = StyleSheet.create(css);
import cash from "../../assets/images/cash.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../action/blogs";
const index = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    getBlogs(dispatch);
  });
  return (
    <ScrollView style={styles.scroll} stickyHeaderIndices={[1]}>
      <Image source={cash} style={styles.banner} resizeMode="cover" />
      <Input
        style={styles.input}
        InputLeftElement={<FontAwesome name="search" size={24} color="white" />}
        placeholder="Search"
        placeholderTextColor="#778AAA"
        fontSize={20}
        borderColor="rgba(0,0,0,0)"
      />
    </ScrollView>
  );
};

export default index;
