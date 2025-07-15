import { ID, Account, Client } from 'appwrite';
import Config from 'react-native-config';

import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();
const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppWriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  //create a new record of user inside appwrite
  async createAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        //TODO: create login feature
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('AppWrite service :: createAccount() :: ', error);
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('AppWrite service :: loginAccount() :: ', error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('AppWrite service :: getCurrentUser() :: ', error);
    }
  }

  async logOut() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      console.log('AppWrite service :: logOut() :: ', error);
    }
  }
}

export default AppWriteService;
