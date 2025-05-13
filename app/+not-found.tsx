import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Notfound() {
  return<>
   <View className="flex-1 justify-center items-center bg-gray-50 p-6">
      <View className="items-center max-w-md">
        {/* Web Image - Replace with your preferred 404 image URL */}
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/024/217/744/non_2x/design-template-for-web-page-with-404-error-isometric-page-not-working-error-png.png' }}
          className="w-64 h-64 mb-8"
          resizeMode="contain"
          defaultSource={{ uri: 'https://static.vecteezy.com/system/resources/previews/024/217/744/non_2x/design-template-for-web-page-with-404-error-isometric-page-not-working-error-png.png' }} // Fallback image
        />
        
        {/* Title */}
        <Text className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</Text>
        
        {/* Description */}
        <Text className="text-lg text-gray-600 text-center mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </Text>
        
        {/* Back Button */}
        <Link href="/" asChild>
          <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg shadow-sm">
            <Text className="text-white font-medium text-lg">Go Back Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  </>
}