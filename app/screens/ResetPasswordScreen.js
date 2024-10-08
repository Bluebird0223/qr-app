import React, { useState } from "react";
import { Alert } from "react-native"; // Import Alert for user feedback
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { mobileValidator } from "../helpers/mobileValidator";
import axios from 'axios';

const OTP_LENGTH = 4;

export default function ResetPasswordScreen({ navigation }) {
  const [mobile, setMobile] = useState({ value: "", error: "" });
  const [otp, setOtp] = useState({ value: "", error: "" });
  const [isOtpSent, setIsOtpSent] = useState(false);

  const sendResetPasswordMobile = async () => {
    const mobileError = mobileValidator(mobile.value);
    if (mobileError) {
      setMobile({ ...mobile, error: mobileError });
      return;
    }

    try {
      // Simulate sending an OTP
      // await axios.post('http://your-server-url/send-otp', { mobile: mobile.value });
      setIsOtpSent(true); // Update state to show OTP input
      Alert.alert("OTP sent!", "Please check your mobile for the OTP.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  const onVerifyOtpPressed = async () => {
    if (otp.value.length !== OTP_LENGTH) {
      setOtp({ ...otp, error: "OTP must be 4 digits." });
      return;
    }

    try {
      // Verify the OTP
      // const response = await axios.post('http://your-server-url/verify-otp', {
      //   mobile: mobile.value,
      //   otp: otp.value,
      // });

      // Handle successful verification
      Alert.alert("Success", "OTP verified successfully!");
      navigation.navigate("NewPasswordScreen", { mobile: mobile.value }); 
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Reset your password.</Header>
      {!isOtpSent ? (
        <>
          <TextInput
            label="Mobile"
            returnKeyType="done"
            value={mobile.value}
            onChangeText={(text) => setMobile({ value: text, error: "" })}
            error={!!mobile.error}
            errorText={mobile.error}
            autoCapitalize="none"
            autoCompleteType="mobile"
            textContentType="mobile"
            keyboardType="phone-pad"
          />
          <Button
            mode="contained"
            onPress={sendResetPasswordMobile}
            style={{ marginTop: 16 }}
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
            maxLength={OTP_LENGTH}
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
    </Background>
  );
}
