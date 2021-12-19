import React, { useState, useEffect } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { VStack, Link } from "native-base";
import LinearGradient from 'react-native-linear-gradient';;
import css from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create(css);

const index = () => {
  return (
    <ScrollView>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={["#ffffff", "#6fbef9"]}
        style={styles.background}
      >
        <VStack
          space={6}
          justifyContent="center"
          alignItems="center"
          style={styles.Vstack}
        >
          <Text style={styles.head}>Cancellation & Refund Policy</Text>
          <Text style={styles.body}>
            We at MK Trading School follow this simple rule, always give people
            more than what they expect to get. However, there may be instances
            where in we may not be the right fit for some customers, so if
            someone doesn't like our course or products they should be entitled
            for a refund.
          </Text>
          <Text style={styles.point}>For the Courses</Text>
          <Text style={styles.body}>
            We follow a 7-day refund policy, wherein we offer a 7-day period to
            test out the course. However, if one has watched more than 50% of
            the course, he/she will not be eligible to claim a refund. Course
            progress will be monitored through our website & will also be
            visible to the user under my courses. If someone wishes to cancel
            the subscription, he/she needs to intimate us within 7 days from the
            time of course or product purchase. We will revoke the access to the
            course and any other add on courses/ subscription which were offered
            along with the course, the very same day we receive the refund
            request.
          </Text>
          <Text style={styles.point}>For Skill UP Program</Text>
          <Text style={styles.body}>
            One can request a refund for the fees paid towards the skill up
            program, within one week of purchase provided he/she has not
            attended any live skill up session. Attending even a single live
            skill up session, makes the user ineligible for claiming refund, and
            no refund requests will be entertained in such cases. Zoom
            attendance reports will be monitored for attendance purpose. We will
            revoke the access to the skill up program and any other add on
            courses/ subscription which were offered along with the program, the
            very same day we receive the refund request.
          </Text>
          <Text style={styles.point}>
            For Automated Zone Indicator & Alerts Subscription
          </Text>
          <Text style={styles.body}>
            Since we are already offering a Free Demo, we do not entertain any
            cancellation and refund requests towards subscription made for the
            Automated Zone Indicator & Alerts. Any amounts paid are
            non-refundable under any circumstances.
          </Text>
          <Text style={styles.point}>
            For Foundation Workshop on Supply & Demand Trading Strategy
          </Text>
          <Text style={styles.body}>
            We do not entertain any cancellation and refund requests towards
            bookings made for the online workshop. Any amounts paid are
            non-refundable under any circumstances. Due to some unavoidable
            reasons or technical glitch if any workshop is cancelled, we will
            reenrol everyone for the next available workshop. If someone
            registered is unable to attend a particular workshop, we will
            accommodate him/her in the next available workshop. For initiating
            the refund/reschedule request, one needs to send us an email at
            support@mktradingschool.com, within the specified period. After the
            lapse of the specified 7- day period no refund requests will be
            entertained under any circumstances. If the refund request meets the
            requirements of our refund policy, full amount paid by the
            subscriber will be refunded within 15 working days & remitted
            through online transfer.
          </Text>
        </VStack>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;
