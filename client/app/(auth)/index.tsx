import useSocialAuth from '@/hooks/useSocialAuth';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const AuthScreen = () => {
    const { loadingStrategy, handleSocialAuth } = useSocialAuth();
    return (
        <View className="px-8 flex-1 items-center justify-center bg-white">
            <Image
                source={require('../../assets/images/auth-image.png')}
                className="size-96"
                resizeMode="contain"
            />
            <View className="mt-3 gap-2 px-8">
                {/* GOOGLE SIGN IN BUTTON */}
                <TouchableOpacity
                    className="flex-row items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3"
                    onPress={() => handleSocialAuth('oauth_google')}
                    disabled={loadingStrategy !== null}
                    style={{
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 1,
                        elevation: 2, // this is for android
                    }}>
                    {loadingStrategy === "oauth_google" ? (
                        <ActivityIndicator size={'small'} color={'#4285f4'} />
                    ) : (
                        <View className="flex-row items-center justify-center">
                            <Image
                                source={require('../../assets/images/google.png')}
                                className="mr-3 size-10"
                                resizeMode="contain"
                            />
                            <Text className="text-2xl text-black">Continue with Google </Text>
                        </View>
                    )}
                </TouchableOpacity>
                {/* APPLE SIGN IN BUTTON */}
                <TouchableOpacity
                    className="flex-row items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-4"
                    onPress={() => handleSocialAuth('oauth_apple')}
                    disabled={loadingStrategy !== null}
                    style={{
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 1,
                        elevation: 2, // this is for android
                    }}>
                    {loadingStrategy === "oauth_apple" ? (
                        <ActivityIndicator size={'small'} color={'#4285f4'} />
                    ) : (
                        <View className="flex-row items-center justify-center">
                            <Image
                                source={require('../../assets/images/apple.png')}
                                className="mr-3 size-7"
                                resizeMode="contain"
                            />
                            <Text className="text-2xl text-black">Continue with Apple </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <Text className="mt-6 px-2 text-center font-semibold leading-4 text-gray-500">
                By signing up, you agree to our{' '}
                <Text className="text-blue-500">Terms, Privacy Policy </Text>and{' '}
                <Text className="text-blue-500">Cookie use </Text>
            </Text>
        </View>
    );
};

export default AuthScreen;
