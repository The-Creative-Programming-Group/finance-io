import React, { useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useColorScheme,
} from 'react-native';
import AppText from '~/components/AppText';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Link } from 'lucide-react-native';
import { trpc } from '../../utils/trpc';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { welcomeSchema, WelcomeSchema } from '~/components/zodSchema';

const Home = () => {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const createAccount = trpc.account.create.useMutation({
    onSuccess: () => {
      Alert.alert('Success', 'Account created successfully!');
      reset();
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Failed to create account');
    },
  });

  // Validation with Zod
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<WelcomeSchema>({
    resolver: zodResolver(welcomeSchema),
    defaultValues: {
      bankName: "",
      currentAmount: "",
      reference: "",
      usage: "",
    },
    mode: 'onChange', // Validate on change
  });

  useEffect(() => {
    if (user?.id) {
      setValue('userId', user.id);
    }
  }, [user, setValue]);

  const handleCreateAccount = async (data: WelcomeSchema) => {
    if (!user?.id) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }
    await createAccount.mutateAsync({
      ...data,
      userId: user.id,
      currentAmount: Number(data.currentAmount),
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('../(auth)/sign-in');
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView>
        <View className="flex-row items-center justify-center mt-[70px]">
          <Image
            source={require('../../assets/images/icon.png')}
            className="w-[50px] h-[50px] mr-3 rounded-xl"
          />
          <AppText className="text-center text-text dark:text-dark-text text-2xl">
            Finance.io
          </AppText>
        </View>
        <AppText className="mt-10 text-text dark:text-dark-text font-bold text-center text-lg">
          {isLoaded && user ? `Hello ${user.firstName}! 👋` : 'undefined'}
        </AppText>
        {/* Setting up account information */}
        <View className="flex-1 justify-center items-center mt-5 mx-5">
          <View className="items-start w-full">
            <AppText className="text-text dark:text-dark-text text-1xl font-semibold text-center w-full">
              Just a few quick answers and{`\n`}we&apos;ll set up the perfect personal {`\n`}account for you.
            </AppText>
          </View>
        </View>
        {/*Link Icon*/}
        <View className="flex-row items-center justify-center mt-10">
          <Link
            color={colorScheme === 'dark' ? '#E0E0E0' : '#111827'}
            size={18}
            style={{ marginRight: 8 }}
          />
          <AppText className="text-text dark:text-dark-text font-bold text-center text-lg">
            Connect your first Account
          </AppText>
        </View>
        {/*Input Fields*/}
        <AppText className="mt-5 ml-6 text-base font-bold text-text dark:text-dark-text">
          Bank Name
        </AppText>
        <Controller
          control={control}
          name="bankName"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex-row items-center bg-secondary dark:bg-dark-secondary rounded-[15px] h-[65px] my-[6px] pl-2.5 mx-4">
              <View className="w-[35px] h-[35px] bg-primary dark:bg-dark-primary rounded-full items-center justify-center mr-2.5">
                <Image
                  source={require('../../assets/Icons/bank.png')}
                  className="w-[17px] h-[17px]"
                  style={{ resizeMode: 'contain' }}
                />
              </View>
              <TextInput
                className="flex-1 my-[6px] h-[70px] rounded-[15px] text-text dark:text-dark-text"
                placeholder="Revolut"
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="default"
                accessibilityLabel="Bank name"
                accessibilityHint="Enter your bank name"
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

        <AppText className="mt-2 ml-6 text-base font-bold text-text dark:text-dark-text">
          Current Amount
        </AppText>
        <Controller
          control={control}
          name="currentAmount"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex-row items-center bg-secondary dark:bg-dark-secondary rounded-[15px] h-[65px] my-[6px] pl-2.5 mx-4">
              <View className="w-[35px] h-[35px] bg-primary dark:bg-dark-primary rounded-full items-center justify-center mr-2.5">
                <Image
                  source={require('../../assets/Icons/money.png')}
                  className="w-[17px] h-[17px]"
                  style={{ resizeMode: 'contain' }}
                />
              </View>
              <TextInput
                className="flex-1 text-text dark:text-dark-text"
                placeholder="2000.00"
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                accessibilityLabel="Current amount"
                accessibilityHint="Enter the current amount in your account"
                value={value}
                onBlur={onBlur}
                onChangeText={(text) => {
                  // Only allow numbers and one decimal point
                  const formattedText = text.replace(/[^0-9.]/g, '');
                  onChange(formattedText);
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

        <AppText className="mt-2 ml-6 text-base font-bold text-text dark:text-dark-text">
          Reference
        </AppText>
        <Controller
          control={control}
          name="reference"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex-row items-center bg-secondary dark:bg-dark-secondary rounded-[15px] h-[65px] my-[6px] pl-2.5 mx-4">
              <View className="w-[35px] h-[35px] bg-primary dark:bg-dark-primary rounded-full items-center justify-center mr-2.5">
                <Image
                  source={require('../../assets/Icons/reference.png')}
                  className="w-[20px] h-[20px]"
                  style={{ resizeMode: 'contain' }}
                />
              </View>
              <TextInput
                className="flex-1 text-text dark:text-dark-text"
                placeholder="Business, Private, others"
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="default"
                accessibilityLabel="Reference"
                accessibilityHint="Reference for the account"
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

        <AppText className="mt-2 ml-6 text-base font-bold text-text dark:text-dark-text">
          Usage
        </AppText>
        <Controller
          control={control}
          name="usage"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex-row items-center bg-secondary dark:bg-dark-secondary rounded-[15px] h-[65px] my-[6px] pl-2.5 mx-4">
              <View className="w-[35px] h-[35px] bg-primary dark:bg-dark-primary rounded-full items-center justify-center mr-2.5">
                <Image
                  source={require('../../assets/Icons/usage.png')}
                  className="w-[17px] h-[17px]"
                  style={{ resizeMode: 'contain' }}
                />
              </View>
              <TextInput
                className="flex-1 text-text dark:text-dark-text"
                placeholder="Daily, Safe Account, Depot"
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="default"
                accessibilityLabel="Usage"
                accessibilityHint="Usage of the account, e.g. Daily, Safe Account, Depot"
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
          className={`mt-5 self-center rounded-xl px-8 py-2.5 ${isSubmitting ? 'bg-gray-400' : 'bg-[#3d73e9]'
            }`}
          onPress={handleSubmit(handleCreateAccount)}
          disabled={isSubmitting}
        >
          <AppText className="text-primary text-base font-semibold">
            {isSubmitting ? 'Creating...' : 'Create'}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-5 self-center rounded-md bg-[#007AFF] px-5 py-2.5"
          onPress={handleLogout}
        >
          <AppText>Logout</AppText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
