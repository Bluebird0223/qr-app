import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import axios from 'axios'; 

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { mobileValidator } from "../helpers/mobileValidator";
import { nameValidator } from "../helpers/nameValidator";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [mobile, setMobile] = useState({ value: "", error: "" });
  const [otp, setOtp] = useState({ value: "", error: "" });
  const [isOtpSent, setIsOtpSent] = useState(false);

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const mobileError = mobileValidator(mobile.value);
    if (mobileError || nameError) {
      setName({ ...name, error: nameError });
      setMobile({ ...mobile, error: mobileError });
      return;
    }

    try {
      // Send the OTP to the registered mobile number
      // await axios.post('http://your-server-url/send-otp', { mobile: mobile.value });
      setIsOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const onVerifyOtpPressed = () => {
    // Logic to verify the OTP entered
    if (otp.value.length !== OTP_LENGTH) {
      setOtp({ ...otp, error: "OTP must be 4 digits." });
      return;
    }

    // Call your API to verify OTP
    // Example: await axios.post('http://your-server-url/verify-otp', { mobile: mobile.value, otp: otp.value });

    // If OTP is verified successfully
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome.</Header>
      {!isOtpSent ? (
        <>
          <TextInput
            label="Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: "" })}
            error={!!name.error}
            errorText={name.error}
          />
          <TextInput
            label="Mobile"
            returnKeyType="next"
            value={mobile.value}
            onChangeText={(text) => setMobile({ value: text, error: "" })}
            error={!!mobile.error}
            errorText={mobile.error}
          />
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}
          >
            Send OTP
          </Button>
        </>
      ) : (
        <>
          <TextInput
            label="Enter OTP"
            returnKeyType="done"
            value={otp.value}
            onChangeText={(text) => setOtp({ value: text, error: "" })}
            error={!!otp.error}
            errorText={otp.error}
            keyboardType="number-pad"
            maxLength={OTP_LENGTH} // Limit to 4 digits
          />
          <Button
            mode="contained"
            onPress={onVerifyOtpPressed}
            style={{ marginTop: 24 }}
          >
            Verify OTP
          </Button>
        </>
      )}
      <View style={styles.row}>
        <Text>I already have an account!</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
