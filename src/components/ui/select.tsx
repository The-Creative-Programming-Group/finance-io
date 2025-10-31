import React, { useMemo, useState } from "react";
import { Modal, Platform, Pressable, ScrollView, View } from "react-native";
import AppText from "~/components/ui/AppText";
import { Check, ChevronDown } from "lucide-react-native";

export type SelectItem = { label: string; value: string };

export type SelectProps = {
  items: SelectItem[];
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  testID?: string;
  /** Optional leading element to align with other inputs (e.g., icon in a circle) */
  leftIcon?: React.ReactNode;
};

const Select: React.FC<SelectProps> = ({
  items,
  value,
  onChange,
  placeholder = "Select...",
  label,
  disabled,
  testID,
  leftIcon,
}) => {
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => items.find((i) => i.value === value),
    [items, value],
  );

  const openModal = () => {
    if (!disabled) setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const handlePick = (val: string) => {
    onChange(val);
    closeModal();
  };

  return (
    <View className="w-full">
      {label ? (
        <AppText className="mb-1 ml-1 text-base font-bold text-text dark:text-dark-text">
          {label}
        </AppText>
      ) : null}

      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessibilityLabel={label || placeholder}
        accessibilityHint="Opens selection list"
        className={`mx-4 my-[6px] h-[65px] flex-row items-center rounded-[15px] bg-secondary pl-3 pr-3 dark:bg-dark-secondary ${disabled ? "opacity-60" : ""}`}
        onPress={openModal}
      >
        {leftIcon ? <View className="mr-2.5">{leftIcon}</View> : null}
        <AppText
          numberOfLines={1}
          medium
          className={`flex-1 ${selected ? "text-text dark:text-dark-text" : "text-backgroundText"}`}
        >
          {selected?.label ?? placeholder}
        </AppText>
        <ChevronDown size={18} color="#888" />
      </Pressable>

      <Modal
        animationType={Platform.OS === "ios" ? "slide" : "fade"}
        transparent
        visible={open}
        onRequestClose={closeModal}
      >
        <Pressable
          className="bg-black/40 flex-1"
          onPress={closeModal}
          accessibilityRole="button"
          accessibilityLabel="Close selection list"
        >
          <View className="mt-auto max-h-[65%] rounded-t-2xl bg-secondary p-4 dark:bg-dark-secondary">
            <View className="bg-gray-400 mb-3 h-1.5 w-12 self-center rounded-full" />
            {label ? (
              <AppText className="mb-2 text-center text-lg font-semibold text-text dark:text-dark-text">
                {label}
              </AppText>
            ) : null}
            <ScrollView keyboardShouldPersistTaps="handled">
              {items.map((itm) => {
                const isActive = itm.value === value;
                return (
                  <Pressable
                    key={itm.value}
                    onPress={() => handlePick(itm.value)}
                    className={`mb-1 flex-row items-center justify-between rounded-xl p-3 ${isActive ? "bg-primary/10 dark:bg-dark-primary/20" : "active:bg-primary/10 dark:active:bg-dark-primary/20"}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    accessibilityLabel={itm.label}
                  >
                    <AppText className="text-base text-text dark:text-dark-text">
                      {itm.label}
                    </AppText>
                    {isActive ? <Check size={18} color="#16a34a" /> : null}
                  </Pressable>
                );
              })}
              <View className="h-2" />
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Select;
