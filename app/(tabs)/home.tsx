import { FAKE_STORE_API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

const PRODUCTS_KEY = 'products_cache'

const fetchProducts = async () => {
  try {
    // Try to fetch from API 
    const res = await axios.get(FAKE_STORE_API_URL)
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(res.data))
    return res.data
  } catch (error) {
    // If offline, try to get from cache
    const cached = await AsyncStorage.getItem(PRODUCTS_KEY)
    if (cached) {
      return JSON.parse(cached)
    }
    throw error // No cache and no internet
  }
}

export default function Home() {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const filtered = data?.filter((item: any) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      <TextInput
        className="bg-white rounded-lg px-4 py-2 mb-4 border border-gray-200"
        placeholder="Search products"
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
      />
      {isLoading && <ActivityIndicator size="large" color="#000" />}
      {isError && <Text className="text-red-500 mb-2">Failed to load products.</Text>}
      {!isLoading && !isError && filtered?.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Image
            source={{ uri: 'https://www.dochipo.com/wp-content/uploads/2024/01/404-Error-Animation-4.gif' }} 
            className="w-36 h-32 mb-2"
            resizeMode="contain"
          />
        </View>
      )}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white rounded-xl flex-row items-center mb-4 p-3 shadow-sm">
            <Image source={{ uri: item.image }} className="w-16 h-16 mr-4" resizeMode="contain" />
            <View className="flex-1">
              <Text className="font-bold text-base mb-1" numberOfLines={2}>{item.title}</Text>
              <Text className="text-green-600 font-semibold text-lg">${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}