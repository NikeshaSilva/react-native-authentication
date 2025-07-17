import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';
import React, { useContext, useState } from 'react';

import { FAB } from '@rneui/themed';
import Snackbar from 'react-native-snackbar';

import { AppWriteContext } from '../appwrite/AppWriteContext';

//Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

type User = {
  name: string;
  email: string;
  password: string;
};

const Signup = ({ navigation }: SignupScreenProps) => {
  const { appwrite, setIsLoggedIn } = useContext(AppWriteContext);

  const [error, setError] = useState<string>('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleSignUp = () => {
    if (
      userData.name.length < 1 ||
      userData.email.length < 1 ||
      userData.password.length < 1 ||
      userData.repeatPassword.length
    ) {
      setError('All fields are required!');
    } else if (userData.password !== userData.repeatPassword) {
      setError('Passwords do not match!');
    } else {
      const user: User = {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      };

      appwrite
        .createAccount(user)
        .then(response => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Signup Success',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Name */}
        <TextInput
          value={userData.name}
          onChangeText={text => {
            setError('');
            setUserData(prev => ({
              ...prev,
              name: text,
            }));
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Name"
          style={styles.input}
        />

        {/* Email */}
        <TextInput
          value={userData.email}
          keyboardType="email-address"
          onChangeText={text => {
            setError('');
            setUserData(prev => ({
              ...prev,
              email: text,
            }));
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={userData.password}
          onChangeText={text => {
            setError('');
            setUserData(prev => ({
              ...prev,
              password: text,
            }));
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        {/* Repeat password */}
        <TextInput
          secureTextEntry
          value={userData.repeatPassword}
          onChangeText={text => {
            setError('');
            setUserData(prev => ({
              ...prev,
              repeatPassword: text,
            }));
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Repeat Password"
          style={styles.input}
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Signup button */}
        <Pressable
          onPress={handleSignUp}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        {/* Login navigation */}
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginContainer}
        >
          <Text style={styles.haveAccountLabel}>
            Already have an account?{'  '}
            <Text style={styles.loginLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
});

export default Signup;
