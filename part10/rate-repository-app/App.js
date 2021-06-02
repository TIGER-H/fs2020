import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/main';

export default function App() {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
