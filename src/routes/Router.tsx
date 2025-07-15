import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AppWriteContext } from '../appwrite/AppWriteContext';
import Loading from '../components/Loading';

//Routes
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppWriteContext);

  useEffect(() => {
    appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false);
        if (response) {
          setIsLoggedIn(true);
        }
      })
      .catch(error => {
        setIsLoading(false);
        setIsLoggedIn(false);
        console.log(error);
      });
  }, [appwrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
