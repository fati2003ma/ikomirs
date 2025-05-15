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
    <View className="flex-1 bg-[#f3f4f6] px-2 pt-6">
      {/* Search Bar */}
      <View className="flex-row items-center bg-white rounded-xl px-4 py-2 mb-4 shadow-sm border border-gray-200">
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/search--v1.png' }}
          className="w-5 h-5 mr-2 opacity-60"
        />
        <TextInput
          className="flex-1 text-base"
          placeholder="Search products"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
      </View>

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
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 2 }}
        contentContainerStyle={{ paddingBottom: 20, gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white rounded-2xl p-3 mb-2 flex-1 shadow-md border border-gray-100">
            <View className="items-center mb-2">
              <Image
                source={{ uri: item.image }}
                className="w-24 h-24"
                resizeMode="contain"
              />
            </View>
            <Text className="font-semibold text-sm mb-1" numberOfLines={2}>
              {item.title}
            </Text>
            <Text className="text-yellow-500 font-bold text-base mb-1">
              ${item.price}
            </Text>
            <View className="flex-row items-center mb-1">
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/000000/star.png' }}
                className="w-4 h-4 mr-1"
              />
              <Text className="text-xs text-gray-500">
                {item.rating?.rate ?? '4.5'} ({item.rating?.count ?? '100'})
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}