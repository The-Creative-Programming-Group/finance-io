import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useColorScheme,
} from "react-native";
import AppText from "~/components/AppText";
import { Image } from "expo-image";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Link } from "lucide-react-native";
import { trpc } from "~/utils/trpc";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import "~/i18n";
import { languageService } from "~/services/languageService";

// Form validation schema
const welcomeSchema = (t: any) =>
  z.object({
    bankName: z
      .string()
      .min(1, { message: t("bankNameRequired", "Bank name is required") })
      .min(2, {
        message: t(
          "bankNameTooShort",
          "Bank name must be at least 2 characters",
        ),
      })
      .max(50, {
        message: t(
          "bankNameTooLong",
          "Bank name must be less than 50 characters",
        ),
      })
      .regex(/^[a-zA-Z0-9\s-]+$/, {
        message: t(
          "bankNameFormat",
          "Bank name can only contain letters, numbers, spaces, and hyphens",
        ),
      }),
    currentAmount: z.coerce
      .number({
        invalid_type_error: t("amountNumeric", "Amount must be numeric"),
      })
      .positive(t("amountPositive", "Amount must be positive"))
      .min(0.01, t("amountMin", "Amount must be at least 0.01")),
    reference: z
      .string()
      .min(1, { message: t("referenceRequired", "Reference is required") })
      .min(2, {
        message: t(
          "referenceTooShort",
          "Reference must be at least 2 characters",
        ),
      })
      .max(50, {
        message: t(
          "referenceTooLong",
          "Reference must be less than 50 characters",
        ),
      }),
    usage: z
      .string()
      .min(1, { message: t("usageRequired", "Usage is required") })
      .min(2, {
        message: t("usageTooShort", "Usage must be at least 2 characters"),
      })
      .max(50, {
        message: t("usageTooLong", "Usage must be less than 50 characters"),
      }),
  });

type WelcomeFormValues = {
  bankName: string;
  currentAmount: number;
  reference: string;
  usage: string;
};

const Home = () => {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [amountDisplay, setAmountDisplay] = useState("");
  const { t } = useTranslation();

  // Initialize language when component mounts with better error handling
  useEffect(() => {
    const initLanguage = async () => {
      try {
        console.log("Home page: Initializing language...");
        await languageService.initializeLanguage();
        console.log("Home page: Language initialized successfully");
      } catch (error) {
        console.error("Home page: Error initializing language:", error);
      }
    };

    initLanguage();
  }, []);

  const createAccount = trpc.account.create.useMutation({
    onSuccess: () => {
      Alert.alert(t("success"), t("accountCreated"));
      reset();
      setAmountDisplay("");
    },
    onError: (error) => {
      Alert.alert(t("error"), error.message || t("accountCreationFailed"));
    },
  });

  // Validation with Zod
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<WelcomeFormValues>({
    resolver: zodResolver(welcomeSchema(t)),
    defaultValues: {
      bankName: "",
      currentAmount: 0,
      reference: "",
      usage: "",
    },
    mode: "onChange", // Validate on change
  });

  const handleCreateAccount = async (data: WelcomeFormValues) => {
    await createAccount.mutateAsync({
      ...data,
      currentAmount: data.currentAmount,
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("../(auth)/sign-in");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView>
        <View className="mt-[70px] flex-row items-center justify-center">
          <Image
            source={require("../../assets/images/icon.png")}
            className="mr-3 h-[50px] w-[50px] rounded-xl"
          />
          <AppText className="text-center text-2xl text-text dark:text-dark-text">
            Finance.io
          </AppText>
        </View>
        <AppText className="mt-10 text-center text-lg font-bold text-text dark:text-dark-text">
          {isLoaded && user
            ? `${t("hello")} ${user.firstName}! 👋`
            : t("loading")}
        </AppText>
        {/* Setting up account information */}
        <View className="mx-5 mt-5 flex-1 items-center justify-center">
          <View className="w-full items-start">
            <AppText className="text-1xl w-full text-center font-semibold text-text dark:text-dark-text">
              {t("accountSetupIntro")}
            </AppText>
          </View>
        </View>
        {/*Link Icon*/}
        <View className="mt-10 flex-row items-center justify-center">
          <Link
            color={colorScheme === "dark" ? "#E0E0E0" : "#111827"}
            size={18}
            style={{ marginRight: 8 }}
          />
          <AppText className="text-center text-lg font-bold text-text dark:text-dark-text">
            {t("connectFirstAccount")}
          </AppText>
        </View>
        {/*Input Fields*/}
        <AppText className="ml-6 mt-5 text-base font-bold text-text dark:text-dark-text">
          {t("bankName")}
        </AppText>
        <Controller
          control={control}
          name="bankName"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mx-4 my-[6px] h-[65px] flex-row items-center rounded-[15px] bg-secondary pl-2.5 dark:bg-dark-secondary">
              <View className="mr-2.5 h-[35px] w-[35px] items-center justify-center rounded-full bg-primary dark:bg-dark-primary">
                <Image
                  source={require("../../assets/Icons/bank.png")}
                  style={{ width: 17, height: 17 }}
                  contentFit="contain"
                  transition={300}
                  priority="high"
                />
              </View>
              <TextInput
                className="my-[6px] h-[70px] flex-1 rounded-[15px] text-text dark:text-dark-text"
                placeholder="Revolut"
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="default"
                accessibilityLabel={t("bankName")}
                accessibilityHint={t("enterBankName")}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                maxLength={50}
              />
            </View>
          )}
        />
        {errors.bankName && (
          <AppText className="ml-6 mt-[1px] text-sm text-error">
            {errors.bankName.message}
          </AppText>
        )}

        <AppText className="ml-6 mt-2 text-base font-bold text-text dark:text-dark-text">
          {t("currentAmount")}
        </AppText>
        <Controller
          control={control}
          name="currentAmount"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mx-4 my-[6px] h-[65px] flex-row items-center rounded-[15px] bg-secondary pl-2.5 dark:bg-dark-secondary">
              <View className="mr-2.5 h-[35px] w-[35px] items-center justify-center rounded-full bg-primary dark:bg-dark-primary">
                <Image
                  source={require("../../assets/Icons/money.png")}
                  style={{ width: 17, height: 17 }}
                  contentFit="contain"
                  transition={300}
                  priority="high"
                />
              </View>
              <TextInput
                className="flex-1 text-text dark:text-dark-text"
                placeholder={t("currentAmountPlaceholder", "2000.00")}
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                accessibilityLabel={t("currentAmount")}
                accessibilityHint={t("enterCurrentAmount")}
                value={amountDisplay}
                onBlur={onBlur}
                onChangeText={(text) => {
                  // Only allow numbers and one decimal point
                  const sanitized = text.replace(/[^0-9.]/g, "");
                  // Ensure only one decimal point is allowed
                  const parts = sanitized.split(".");
                  const formattedText =
                    parts.length > 2
                      ? parts[0] + "." + parts.slice(1).join("")
                      : sanitized;

                  // Limit decimal places to 2
                  let finalText = formattedText;
                  if (parts.length === 2 && parts[1].length > 2) {
                    finalText = parts[0] + "." + parts[1].slice(0, 2);
                  }

                  setAmountDisplay(finalText);

                  // Update form value
                  if (finalText === "" || finalText === ".") {
                    onChange(0);
                  } else {
                    onChange(parseFloat(finalText) || 0);
                  }
                }}
              />
            </View>
          )}
        />
        {errors.currentAmount && (
          <AppText className="ml-6 mt-[1px] text-sm text-error">
            {errors.currentAmount.message}
          </AppText>
        )}

        <AppText className="ml-6 mt-2 text-base font-bold text-text dark:text-dark-text">
          {t("reference")}
        </AppText>
        <Controller
          control={control}
          name="reference"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mx-4 my-[6px] h-[65px] flex-row items-center rounded-[15px] bg-secondary pl-2.5 dark:bg-dark-secondary">
              <View className="mr-2.5 h-[35px] w-[35px] items-center justify-center rounded-full bg-primary dark:bg-dark-primary">
                <Image
                  source={require("../../assets/Icons/reference.png")}
                  style={{ width: 20, height: 20 }}
                  contentFit="contain"
                  transition={300}
                  priority="high"
                />
              </View>
              <TextInput
                className="flex-1 text-text dark:text-dark-text"
                placeholder={t("referencePlaceholder")}
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="default"
                accessibilityLabel={t("reference")}
                accessibilityHint={t("referenceHint")}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        {errors.reference && (
          <AppText className="ml-6 mt-[1px] text-sm text-error">
            {errors.reference.message}
          </AppText>
        )}

        <AppText className="ml-6 mt-2 text-base font-bold text-text dark:text-dark-text">
          {t("usage")}
        </AppText>
        <Controller
          control={control}
          name="usage"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mx-4 my-[6px] h-[65px] flex-row items-center rounded-[15px] bg-secondary pl-2.5 dark:bg-dark-secondary">
              <View className="mr-2.5 h-[35px] w-[35px] items-center justify-center rounded-full bg-primary dark:bg-dark-primary">
                <Image
                  source={require("../../assets/Icons/usage.png")}
                  style={{ width: 17, height: 17 }}
                  contentFit="contain"
                  transition={300}
                  priority="high"
                />
              </View>
              <TextInput
                className="flex-1 text-text dark:text-dark-text"
                placeholder={t("usagePlaceholder")}
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="default"
                accessibilityLabel={t("usage")}
                accessibilityHint={t("usageHint")}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        {errors.usage && (
          <AppText className="ml-6 mt-[1px] text-sm text-error">
            {errors.usage.message}
          </AppText>
        )}

        <TouchableOpacity
          className={`mt-5 self-center rounded-xl px-8 py-2.5 ${
            isSubmitting ? "bg-gray-400" : "bg-[#3d73e9]"
          }`}
          onPress={handleSubmit(handleCreateAccount)}
          disabled={isSubmitting}
        >
          <AppText className="text-base font-semibold text-primary">
            {isSubmitting ? t("creating") : t("create")}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-5 self-center rounded-md bg-[#007AFF] px-5 py-2.5"
          onPress={handleLogout}
        >
          <AppText>{t("logout")}</AppText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
