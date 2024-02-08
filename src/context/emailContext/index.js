import React, { createContext, useState, useContext } from 'react';

const EmailContext = createContext();

export const useEmails = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [selectedEmails, setSelectedEmails] = useState([]);

  const value = {
    selectedEmails,
    setSelectedEmails
  };

  return <EmailContext.Provider value={value}>{children}</EmailContext.Provider>;
};
