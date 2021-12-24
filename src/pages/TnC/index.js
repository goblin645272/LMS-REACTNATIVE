import React, { useState, useEffect } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { VStack, Link } from "native-base";
import LinearGradient from "react-native-linear-gradient";
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
          <Text style={styles.head}>Terms & Conditions</Text>
          <Text style={styles.body}>
            By visiting & registering on our website 
            <Text
              onPress={() => Linking.openURL("https://www.mktradingschool.com")}
            >
              www.mktradingschool.com 
            </Text>
            you are agreeing to be bound by the following terms and conditions.
            These terms and conditions may change as and when we feel necessary.
            Your continued access to our website 
            <Text
              onPress={() => Linking.openURL("https://www.mktradingschool.com")}
            >
              www.mktradingschool.com 
            </Text>
             means that you are in acceptance of new or modified terms and
            conditions. To stay abreast of any changes kindly re-visit the
            “Terms & Conditions’ link on our website.
          </Text>

          <Text style={styles.body}>
            The Participant agrees to take particular care when providing us
            with the details pertaining to debit/credit card and warrants that
            these details are accurate and complete at the time of making
            subscription to the courses. The Participant also warrants that the
            credit or debit card details that are provided are of own credit or
            debit card and that sufficient funds are available to make the said
            payment.
          </Text>

          <Text style={styles.body}>
            All contents of this training program including all the trademarks,
            logos and service marks, information’s and contents provided on our
            website, design structure and compilation are owned Intellectual
            Properties of MK Trading School and their group or associate
            companies and no part of this training course or website shall be
            reproduced, stored in a retrieval system or transmitted in any form
            or by any means – electronic, electrostatic, magnetic tape,
            mechanical, printing, photocopying, recording or otherwise including
            the right of translation in any language without the permission of
            MK Trading School or its group or associate companies. We reserve
            the right to terminate the accounts of the participants/customers,
            who violate the proprietary rights, in addition to necessary legal
            action and forfeiture of the course fees.
          </Text>

          <Text style={styles.body}>
            Any subscriber will be restricted to maximum of One concurrent login
            from any devices, any attempts of more than One concurrent login
            will be blocked.
          </Text>

          <Text style={styles.body}>
            The Participant understands that investment in securities market is
            subject to market risk and shall read all the related documents
            including the Risk disclosure documents carefully before investing
            in any financial products. MK Trading School or its associates will
            be in no way responsible or accountable for any losses incurred due
            to investment/ trading decisions taken by the participant. Mk
            Trading School is not a SEBI registered entity.
          </Text>
        </VStack>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;
