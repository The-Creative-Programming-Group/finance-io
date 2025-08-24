import React, { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import AppText from "~/components/AppText";

type InputOtpProps = {
  onCodeChange: (code: string) => void;
};

const InputOtp = ({ onCodeChange }: InputOtpProps) => {
  const inputLength = 6;
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [values, setValues] = useState<string[]>(Array(inputLength).fill(""));
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
    onCodeChange(newValues.join(""));

    if (text && index < inputLength - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !values[index]) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <View className="my-3 flex w-full items-center justify-center">
      <View className="flex w-11/12 flex-row items-center justify-between">
        {values.slice(0, 3).map((value, i) => (
          <TextInput
            key={i}
            ref={inputRefs[i]}
            maxLength={1}
            className={`h-14 w-14 rounded-2xl border-2 bg-secondary text-center text-xl leading-none text-text dark:bg-dark-secondary dark:text-dark-text ${
              focusedIndex === i
                ? "border-accent"
                : "border-stroke dark:border-dark-stroke"
            }`}
            keyboardType="number-pad"
            value={value}
            onFocus={() => setFocusedIndex(i)}
            onChangeText={(text) => handleChange(text, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
          />
        ))}
        <AppText className="text-3xl text-text dark:text-dark-text">-</AppText>
        {values.slice(3, 6).map((value, i) => (
          <TextInput
            key={i + 3}
            ref={inputRefs[i + 3]}
            maxLength={1}
            className={`h-14 w-14 rounded-2xl border-2 bg-secondary text-center text-xl leading-none text-text dark:bg-dark-secondary dark:text-dark-text ${
              focusedIndex === i + 3
                ? "border-accent"
                : "border-stroke dark:border-dark-stroke"
            }`}
            keyboardType="number-pad"
            value={value}
            onFocus={() => setFocusedIndex(i + 3)}
            onChangeText={(text) => handleChange(text, i + 3)}
            onKeyPress={(e) => handleKeyPress(e, i + 3)}
          />
        ))}
      </View>
    </View>
  );
};

export default InputOtp;
