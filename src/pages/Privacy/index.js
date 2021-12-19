import React from "react";
import { StyleSheet, Text } from "react-native";
import css from "./styles";
import LinearGradient from 'react-native-linear-gradient';;
import { ScrollView } from "react-native-gesture-handler";
import { VStack } from "native-base";

const styles = StyleSheet.create(css);

const Privacy = () => {
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
          <Text style={styles.head}>Privacy Policy</Text>
          <Text style={styles.point}>
            MKTS stands for MK Trading School here onwards
          </Text>
          <Text style={styles.body}>
            Your privacy is important to MKTS. To reinforce our commitment to
            protect your privacy, we provide this notice explaining our online
            information practices and the choices you can make about the way
            your information is collected and used. This policy summarizes the
            information, including personally identifiable information, that we
            collect through our website www.mktradingschool.com and how that
            information may be used. By using our website, you consent to the
            collection and use of this information.
            {"\n"}
            {"\n"}
            We are not a SEBI registered entity or Financial Advisor. Any advice
            or information on any Investments or Trades on this website are
            provided for educational purpose only and do not constitute specific
            financial, trading or investment advice. Please do not trade or
            invest based solely on this information. By viewing any material or
            using the information within this site you agree that this is
            general education material, and you will not hold any person or
            entity responsible for loss or damage resulting from the content or
            general advice provided here.
            {"\n"}
            {"\n"}
            We reserve the right to change our privacy policy at any time. In
            the event we make changes to any of the terms or conditions of this
            privacy policy, we will incorporate those changes into this document
            so you will know what information is being collected and how that
            information is being used. We will undertake best efforts to notify
            you of any changes to this privacy policy utilizing the last email
            address you have provided to us; however, it is your responsibility
            to keep your email address current and to monitor this policy for
            any changes. Continued use of this website and/or our services shall
            constitute consent to this policy and any changes made hereto.
          </Text>
          <Text style={styles.point}>How We Use Information</Text>
          <Text style={styles.body}>
            MK Trading School may use the information that you provide through
            our site to market our services. Our goal is to utilize the
            information collected to ensure a positive experience with our
            company and website, as well as to help us understand what we can do
            to better serve you. We will also use this information to contact
            you when necessary.
            {"\n"}
            {"\n"}
            If you no longer wish to receive emails from MKTS. Please click
            Unsubscribe link included in our emails or contact us directly
            at support@mktradingschool.com If you provide your phone number, you
            agree and acknowledge that you may receive calls from us with
            information regarding our services or upcoming events. If you do not
            wish to receive calls from us in the future, you can let us know by
            emailing us at support@mktradingschool.com
          </Text>
          <Text style={styles.point}>Sharing Information</Text>
          <Text style={styles.body}>
            Privacy matters are very important to us, and all available
            resources and processes are implemented to make sure your
            information remains safe and secure. We do not sell, license, lease
            or otherwise disclose your personal information to any third party
            for any reason except as noted herein. We may share personal
            information described above with our affiliates for business
            purposes, such as, but not limited to, servicing customers, and
            informing customers about new courses and services, and as permitted
            by applicable law. The information we share with affiliates may
            include any of the information described above, such as your name,
            address, phone number, and email address. Our affiliates maintain
            the privacy of your information to the same extent MKTS does in
            accordance with this Policy.
            {"\n"}
            Information may be shared with third parties that perform support
            services for MKTS such as non-affiliate companies that provide
            professional, legal, or accounting advice. Non-affiliated companies
            that assist us in providing services to you are required to maintain
            the confidentiality of such information to the extent they receive
            it and to use your personal information only while providing such
            services, as directed by MKTS. As we develop our business, we might
            sell, buy, restructure, or reorganize our business or assets. In the
            event of a merger, consolidation, sale, liquidation, or transfer of
            assets, MKTS may, in its sole and absolute discretion, transfer,
            sell or assign information collected, including without limitation,
            non-personal information and personal information, to one or more
            affiliated or unaffiliated third parties.
          </Text>
          <Text style={styles.point}>Control of Your Password</Text>
          <Text style={styles.body}>
            When you sign up to become a member, you will also be asked to
            choose a password. You are entirely responsible for maintaining the
            confidentiality of your password. It is important that you protect
            it against unauthorized access of your account and information by
            choosing your password carefully and keeping your password and
            computer secure by signing out after using our services.
            {"\n"}
            You agree not to use the account, username, email address or
            password of another Member at any time or to disclose your password
            to any third party. You are responsible for all actions taken with
            your login information and password, including fees. If you lose
            control of your password, email id you may lose substantial control
            over your personally identifiable information and may be subject to
            legally binding actions taken on your behalf. Therefore, if your
            password has been compromised for any reason, you should immediately
            change your password. You agree to notify us immediately if you
            suspect any consistent unauthorized use of your account or access to
            your password even after changing it.
          </Text>
          <Text style={styles.point}>Public Forums</Text>
          <Text style={styles.body}>
            This site may make chat rooms, forums, message boards, and/or news
            groups available to its users. Please remember that any information
            that is disclosed in these areas becomes public information and you
            should exercise caution when deciding to disclose your personal
            information.
          </Text>
          <Text style={styles.point}>Social Media</Text>
          <Text style={styles.body}>
            We may use hyperlinks on the Website which will redirect you to a
            social network if you click on the respective link. However, when
            you click on a social plug-in, such as Facebook’s “Like” or “Share”
            button, Twitter’s “tweet” button, LinkedIn’s “Share” button or
            Google’s “Share” button, that particular social network’s plugin
            will be activated, and your browser will directly connect to that
            provider’s servers. If you do not use these buttons, none of your
            data will be sent to the respective social network’s plugin
            provider. So, for example, when you click on the Facebook’s “Like”
            button on the Website, Facebook will receive your IP address, the
            browser version and screen resolution, and the operating system of
            the device you have used to access the Website. Settings regarding
            privacy protection can be found on the websites of these social
            networks and are not within our control.
            {"\n"}
            Content such as forum discussions, reviews, blog posts, comments or
            articles from our site may be shared on social media outlets when a
            social plug-in is clicked, such as Facebook’s “Like” or “Share”
            button, Twitter’s “tweet” button, LinkedIn’s “Share” button or
            Google’s “Share” button, or by posting a URL to the page where the
            content is publicly available. We encourage you to exercise
            discretion and caution with respect to your personal information.
            Users assume all responsibility for any loss of privacy or other
            harm resulting from their voluntary disclosure of personally
            identifying information.
          </Text>
          <Text style={styles.point}>Confidentiality</Text>
          <Text style={styles.body}>
            This site has security measures in place to protect the loss,
            misuse, and alteration of the information under our control. You
            further acknowledge that the Website may contain information which
            is designated confidential by us and that you shall not disclose
            such information without our prior written consent. Your information
            is regarded as confidential and therefore will not be divulged to
            any third party, unless if legally required to do so to the
            appropriate authorities. We will not sell, share, or rent your
            personal information to any third party or use your e-mail address
            for unsolicited mail. Any emails sent by us will only be in
            connection with the provision of agreed services, and you retain
            sole discretion to seek for discontinuation of such communications
            at any point of time.
            {"\n"}
            Notwithstanding our commitment to security and confidentiality, the
            fact remains that no transmission over the internet or any wireless
            network provides complete security. In light of the inherent
            vulnerability, you acknowledge that: (a) there exists security and
            privacy limitations which are beyond our control; (b) there can be
            no guaranty of the security, integrity and privacy limitations
            related to information transmitted to us over the internet or
            through our website; and/or (c) outside interference through piracy
            cannot be controlled by us and as such, information and data
            transmitted may be viewed by unauthorized third parties.
          </Text>
          <Text style={styles.point}>Cookies</Text>
          <Text style={styles.body}>
            We use cookie technology to help members move faster through the
            site. We also use cookies to deliver content specific to your
            interests. A cookie is a small file sent to your computer by our
            site server. The most employed cookies on our site server are those
            that help us establish (1) whether you are a registered member of
            our site, and (2) whether a registered member has opted to use the
            “auto-login” feature, which eliminates the requirement for
            registered members to identify themselves each time they visit our
            site. We may also use cookie technology to track the site’s
            aggregate page views, which helps us determine which features the
            user base seems to be most or least interested in. Please note that
            cookies cannot get information from your hard drive against your
            will, cannot destroy files, and cannot send you viruses.
            {"\n"}
            Each time your visit our website our servers automatically record
            your activity and information such as your IP address and/or the
            domain from which you are visiting. We also record which links on
            our webpage you click on or visit and any search terms you use. We
            use this data for website maintenance and technical administration.
            Your IP address is never linked with any personally identifiable
            information to identify you personally, except in the case of our
            investigation into a violation of the terms of use or alleged
            misconduct.
          </Text>
          <Text style={styles.point}>Links to Other Websites</Text>
          <Text style={styles.body}>
            This site may contain links to third parties’ websites. Please note
            that we are not responsible for the collection, use, maintenance,
            sharing, or disclosure of data and information by such third
            parties. If you provide information on third party sites, the
            privacy policy, and terms of service on those sites are applicable.
            Especially if the third-party site is used in connection with a
            purchase of a product. We encourage you to read the privacy policies
            of websites that you visit before submitting personal information.
          </Text>
          <Text styles={styles.point}>
            Our Commitment to Children’s Privacy
          </Text>
          <Text style={styles.body}>
            Protecting the privacy of the very young is especially important.
            For that reason, we do not collect or maintain information at our
            website from those we know are under the age of thirteen (13).
          </Text>
          <Text style={styles.point}>Opt-Out</Text>
          <Text style={styles.body}>
            If you do not wish to have your personal information disclosed to
            our affiliates, third parties or to be used by MK Trading School as
            described in this Policy please contact us via email:
            - support@mktradingschool.com
          </Text>
          <Text style={styles.point}>Contact Us</Text>
          <Text style={styles.body}>
            If you further have any questions about this agreement, the
            practices of MK Trading School or your experience with our service,
            you can email us at support@mktradingschool.com
          </Text>
        </VStack>
      </LinearGradient>
    </ScrollView>
  );
};

export default Privacy;
