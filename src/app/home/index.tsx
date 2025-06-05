import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AppText from '~/components/AppText';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Link } from 'lucide-react-native';

const Home = () => {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const router = useRouter();

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
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}
        >
          <Image
            source={require('../../assets/images/icon.png')}
            style={{ width: 50, height: 50, marginRight: 12 }}
          />
          <AppText className="text-dark-text text-center" style={{ fontSize: 24 }}>
            Finance.io
          </AppText>
        </View>
        <AppText className={'mt-10 text-dark-text font-bold text-center text-lg'}>
          {isLoaded && user ? `Hello ${user.firstName}! 👋` : 'undefined'}
        </AppText>
        {/* Setting up account information */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <AppText
              className="text-dark-text text-1xl font-semibold"
              style={{ textAlign: 'left', width: '100%' }}
            >
              Just a few quick answers and{'\n'}
              we&apos;ll set up the perfect personal {'\n'}
              account for you.
            </AppText>
          </View>
        </View>
        {/*Link Icon*/}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
          <Link color="white" size={18} style={{ marginRight: 8 }} />
          <AppText className="text-dark-text font-bold text-center text-lg">
            Connect your first Account
          </AppText>
        </View>

        {/*Input Fields*/}
        <AppText className="mt-5 ml-6 text-base font-bold dark:text-dark-text">
          Bank Name
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#121111', // light gray background for the input
            borderRadius: 15,
            height: 65,
            marginVertical: 6,
            paddingLeft: 10,
            marginHorizontal: 16,
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: '#212121', // for the icon
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
          >
            <Image
              source={require('../../assets/Icons/bank.png')}
              style={{
                width: 17,
                height: 17,
                resizeMode: 'contain',
              }}
            />
          </View>

          <TextInput
            style={{
              flex: 1,
              height: '100%',
              fontSize: 16,
            }}
            placeholder="Revolut"
            placeholderTextColor="gray"
            autoCapitalize="none"
            keyboardType="default"
            accessibilityLabel="Bank name"
            accessibilityHint="Revoult"
          />
        </View>

        <AppText className="mt-2 ml-6 text-base font-bold dark:text-dark-text">
          Current Amount
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#121111', // light gray background for the input
            borderRadius: 15,
            height: 65,
            marginVertical: 6,
            paddingLeft: 10,
            marginHorizontal: 16,
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: '#212121', // for the icon
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
          >
            <Image
              source={require('../../assets/Icons/money.png')}
              style={{
                width: 17,
                height: 17,
                resizeMode: 'contain',
              }}
            />
          </View>

          <TextInput
            style={{
              flex: 1,
              height: '100%',
              fontSize: 16,
            }}
            placeholder="2000€"
            placeholderTextColor="gray"
            autoCapitalize="none"
            keyboardType="numeric"
            accessibilityLabel="Current amount"
            accessibilityHint="Amount of money in the account"
          />
        </View>

        <AppText className="mt-2 ml-6 text-base font-bold dark:text-dark-text">
          Reference
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#121111', // light gray background for the input
            borderRadius: 15,
            height: 65,
            marginVertical: 6,
            paddingLeft: 10,
            marginHorizontal: 16,
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: '#212121', // for the icon
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
          >
            <Image
              source={require('../../assets/Icons/reference.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </View>

          <TextInput
            style={{
              flex: 1,
              height: '100%',
              fontSize: 16,
            }}
            placeholder="Bussiness, Privat, others"
            placeholderTextColor="gray"
            autoCapitalize="none"
            keyboardType="default"
            accessibilityLabel="Reference"
            accessibilityHint="Reference for the account"
          />
        </View>

        <AppText className="mt-2 ml-6 text-base font-bold dark:text-dark-text">
          Usage
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#121111', // light gray background for the input
            borderRadius: 15,
            height: 65,
            marginVertical: 6,
            paddingLeft: 10,
            marginHorizontal: 16,
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: '#212121', // for the icon
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
          >
            <Image
              source={require('../../assets/Icons/usage.png')}
              style={{
                width: 17,
                height: 17,
                resizeMode: 'contain',
              }}
            />
          </View>

          <TextInput
            style={{
              flex: 1,
              height: '100%',
              fontSize: 16,
            }}
            placeholder="Daily, Safe Account, Depot"
            placeholderTextColor="gray"
            autoCapitalize="none"
            keyboardType="default"
            accessibilityLabel="Usage"
            accessibilityHint="Usage of the account, e.g. Daily, Safe Account, Depot"
          />
        </View>

        <TouchableOpacity className="mt-5 self-center rounded-xl bg-[#3d73e9] px-8 py-2.5">
          <AppText className="text-primary text-base font-semibold">Create</AppText>
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
