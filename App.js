import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { AuthProvider } from './context/AuthContext';
import StackNav from './StackNav';


export default function App() {
  //Start App
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNav />
      </AuthProvider>
    </NavigationContainer>
  )
}
