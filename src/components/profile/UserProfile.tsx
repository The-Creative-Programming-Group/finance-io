import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import { Header } from "~/components/Header";
import { BottomNavigation } from "~/components/BottomNavigation";
import AppText from "~/components/ui/AppText";
import AppImage from "~/components/ui/AppImage";

interface UserProfileScreenProps {
  onNavigate: (screen: string) => void;
}

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  validate,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  validate?: (text: string) => string | null;
}) => {
  const { colors } = useTheme();
  const [touched, setTouched] = useState(false);

  const error = validate ? validate(value) : null;
  const isValid = touched && !error;

  return (
    <View className="mb-6">
      {/* Label */}
      <AppText
        semibold
        className="mb-2 text-base"
        style={{ color: colors.text }}
      >
        {label}
      </AppText>

      {/* Input container */}
      <View
        className="flex-row items-center rounded-xl border px-4 py-3"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: !touched
            ? colors.border
            : error
              ? colors.error
              : colors.success,
        }}
      >
        <TextInput
          className="flex-1 text-base"
          autoCapitalize="none"
          onChangeText={(text) => {
            if (!touched) setTouched(true);
            onChangeText(text);
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          selectionColor={colors.primary}
          value={value}
          style={{
            color: "white",
            backgroundColor: colors.cardBackground, // add background color
            outlineStyle: "none" as any, // remove browser yellow outline
          }}
        />

        {/* Validation Icon */}
        {touched && (
          <View
            className="h-6 w-6 items-center justify-center rounded-full"
            style={{
              backgroundColor: error
                ? colors.error
                : isValid
                  ? colors.success
                  : colors.textSecondary,
            }}
          >
            <AppText className="text-white text-xs">
              {error ? "✕" : "✓"}
            </AppText>
          </View>
        )}
      </View>

      {/* Error Text */}
      {touched && error && (
        <AppText className="mt-2 text-sm" style={{ color: colors.error }}>
          {error}
        </AppText>
      )}
    </View>
  );
};

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  onNavigate,
}) => {
  const { colors, isDark } = useTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Validation functions
  const validateRequired = (text: string) =>
    text.trim().length === 0 ? "This field is required" : null;

  const validateEmail = (text: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text.trim().length === 0) return "Email is required";
    if (!regex.test(text)) return "Sorry, this email format is invalid!";
    return null;
  };

  const allValid =
    !validateRequired(firstName) &&
    !validateRequired(lastName) &&
    !validateEmail(email);

  const handleSave = () => {
    console.log("Saving profile:", { firstName, lastName, email });
    // Replace with API call
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-20 pb-36"
      >
        <Header title="Julia's - User" />

        {/* Avatar */}
        <View className="my-8 items-center">
          <AppImage
            source={require("~/assets/images/avatar.png")}
            className="mb-4 h-[120px] w-[120px] rounded-full"
          />
          <TouchableOpacity>
            <AppText className="text-accent">Change Picture</AppText>
          </TouchableOpacity>
        </View>

        {/* Fields */}
        <InputField
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          validate={validateRequired}
          placeholder="Enter your first name"
        />
        <InputField
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          validate={validateRequired}
          placeholder="Enter your last name"
        />
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          validate={validateEmail}
          placeholder="Enter your email address"
        />

        {/* Change Password */}
        <TouchableOpacity
          className="mt-6 flex-row items-center self-center rounded-xl border px-3 py-2"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          <AppImage
            source={require("~/assets/Icons/key-2.png")}
            style={{ width: 18, height: 18 }}
            resizeMode="contain"
            className="mr-2"
          />
          <AppText medium className="text-base" style={{ color: colors.text }}>
            Change Password
          </AppText>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          disabled={!allValid}
          onPress={handleSave}
          className={`mt-8 rounded-xl px-5 py-4 ${
            allValid ? "bg-accent" : "bg-gray-400"
          }`}
        >
          <AppText medium className="text-white text-center text-base">
            Save Changes
          </AppText>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation
        activeTab="Settings"
        onTabPress={(tab) => console.log(tab)}
      />
    </SafeAreaView>
  );
};
