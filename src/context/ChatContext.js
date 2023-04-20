import React, { createContext, useState, } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  
    const [classSubject, setSubject] = useState(null);

    const [showChat, setShowChat] = useState(null);

    const [saveConvo, setSaveConvo] = useState({});

    const [role, setRole] = useState(null)


  return (
    <ChatContext.Provider
      value={{saveConvo, showChat, classSubject, setSubject ,setShowChat, setSaveConvo, role, setRole}}
    >
      {children}
    </ChatContext.Provider>
  );
};