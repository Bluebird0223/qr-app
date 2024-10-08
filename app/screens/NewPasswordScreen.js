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
import { passwordValidator } from "../helpers/passwordValidator";

export default function NewPasswordScreen({ navigation, route }) {
    const { mobile } = route.params; // Get mobile number from route parameters
    const [newPassword, setNewPassword] = useState({ value: "", error: "" });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });

    const onSubmitPressed = async () => {
        const passwordError = passwordValidator(newPassword.value);
        const confirmPasswordError = confirmPassword.value !== newPassword.value ? "Passwords do not match." : "";

        if (passwordError || confirmPasswordError) {
            setNewPassword({ ...newPassword, error: passwordError });
            setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
            return;
        }

        try {
            // Replace with your API endpoint
            //   await axios.post('http://your-server-url/reset-password', {
            // mobile, // Include mobile if needed
            // newPassword: newPassword.value,
            //   });

            // After successfully resetting the password, navigate to the login screen
            navigation.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }],
            });
        } catch (error) {
            console.error("Error resetting password:", error);
            Alert.alert("Error", "Failed to reset password. Please try again.");
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Set New Password</Header>
            <TextInput
                label="New Password"
                returnKeyType="done"
                value={newPassword.value}
                onChangeText={(text) => setNewPassword({ value: text, error: "" })}
                error={!!newPassword.error}
                errorText={newPassword.error}
                secureTextEntry
            />
            <TextInput
                label="Confirm Password"
                returnKeyType="done"
                value={confirmPassword.value}
                onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
                error={!!confirmPassword.error}
                errorText={confirmPassword.error}
                secureTextEntry
            />
            <Button
                mode="contained"
                onPress={onSubmitPressed}
                style={{ marginTop: 24 }}
            >
                Reset Password
            </Button>
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
