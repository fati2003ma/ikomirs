
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
export default function TabsLayout() {
  return <>
    <Tabs>
      <Tabs.Screen name="home" options={{
        headerShown: false, tabBarIcon: ({ color, size, focused }) => (
          <AntDesign
            name={focused ? "home" : "home"}
            size={size}
            color={focused ? "orange" : "gray"}
          />
        )
      }} />
      <Tabs.Screen name="cart" options={{
        headerShown: false, tabBarIcon: ({ color, size, focused }) => (
          <AntDesign
            name={focused ? "home" : "home"}
            size={size}
            color={focused ? "purple" : "gray"}
          />
        )
      }} />

    </Tabs>
  </>
}