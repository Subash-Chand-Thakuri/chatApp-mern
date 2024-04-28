import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  name: string;
  pic: string;
  email: string;
  token: string;
  _id:string;
}

export interface Chatdata {
  _id: string;
  content: string;
}

export interface Chats{
  _id: string;
  chatName: string;
  createdAt : Date;
  isGroupChat: boolean;
  updatedAt: Date;
  content: string;
  users: User[];
}

interface IChatContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedChat: Chatdata | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chatdata | null>>;
  chats : Chats[] | null;
  setChats: React.Dispatch<React.SetStateAction<Chats[] | []>>;
}

const ChatContext = createContext<IChatContext>({
  user: null,
  setUser: () => {},
  selectedChat: null,
  setSelectedChat: () => {},
  chats : null,
  setChats: () => {},

});

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chatdata | null>(null);
  const [chats, setChats] = useState<Chats[] | []>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
