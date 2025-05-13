
import { Link } from 'expo-router';
import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-purple-700">
      <StatusBar barStyle="light-content" />

       <View className="flex-1 px-6 pt-10 pb-8 items-center justify-between">
    {/* Header */}
    <View className="items-center">
      <Text className="text-4xl font-bold text-yellow-400">CYBER</Text>
      <Text className="text-4xl font-bold text-yellow-400 mb-4">LINIO</Text>

      {/* Discount Banner */}
      <View className="flex-row items-center mb-1">
        <Text className="text-4xl font-bold text-white mr-2">40%</Text>
        <View>
          <Text className="text-white text-sm">DSCNT</Text>
          <Text className="text-white text-sm">in technology</Text>
        </View>
      </View>

      {/* Free Shipping Tag */}
      <View className="bg-yellow-400 px-3 py-1 rounded-full mb-6">
        <Text className="text-xs font-semibold">FREE SHIPPING</Text>
      </View>
    </View>

    {/* Product Image & Icon */}
    <View className="items-center justify-center relative w-full h-[40%]">
      <Image
        source={{
          uri:
            'https://cdni.iconscout.com/illustration/premium/thumb/ecommerce-illustration-download-in-svg-png-gif-file-formats--add-to-cart-shopping-bag-e-commerce-pack-illustrations-3145686.png?f=webp',
        }}
        className="w-full h-full"
        resizeMode="contain"
      />

      
    </View>

    {/* Validity Text */}
    <Text className="text-xs text-gray-300 text-center mt-4">
      *Valid from 27/03 to 01/04 2025. Min stock: 1 unit
    </Text>

    {/* Button */}
    <View className="w-full items-center mt-4">
      <Link href="/home" asChild>
        <TouchableOpacity className="bg-white rounded-full w-full py-3">
          <Text className="text-orange-500 font-semibold text-center">
            SKIP
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  </View>
</SafeAreaView>

 
  );
}
