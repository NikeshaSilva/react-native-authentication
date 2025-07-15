import React, { createContext, FC, PropsWithChildren, useState } from 'react';

import AppWriteService from './service';

type AppContextType = {
  appwrite: AppWriteService;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const AppWriteContext = createContext<AppContextType>({
  appwrite: new AppWriteService(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AppWriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const defaultValue = {
    appwrite: new AppWriteService(),
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <AppWriteContext.Provider value={defaultValue}>
      {children}
    </AppWriteContext.Provider>
  );
};
