"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import { fetchChatMessages, fetchChatUnreadCount, markChatUserRead, sendChatMessage } from "@/utilities/api";

const useChat = (email, { onNewMessage } = {}) => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const typingTimeoutRef = useRef(null);

  // Initialize Socket
  useEffect(() => {
    if (!email) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "localhost:5000";
    const socketUrl = baseUrl.startsWith("http") ? baseUrl : `http://${baseUrl}`;
    const newSocket = io(socketUrl);
    
    setSocket(newSocket);

    newSocket.emit("join_room", { room: email, isAdmin: false });

    // Initial Fetch
    fetchMessages();
    fetchUnreadCount();

    return () => {
      newSocket.disconnect();
    };
  }, [email]);

  // Socket Listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("new_message_from_admin", (data) => {
      setMessages((prev) => [...prev, { ...data, isAdmin: true }]);
      fetchUnreadCount();
      if (onNewMessage) onNewMessage(data);
    });

    socket.on("typing", (data) => {
      if (data.isAdmin) {
        setIsAdminTyping(true);
      }
    });

    socket.on("stop_typing", (data) => {
      if (data.isAdmin) {
        setIsAdminTyping(false);
      }
    });

    socket.on("messages_read_by_admin", () => {
        setMessages((prev) => 
            prev.map(msg => !msg.isAdmin ? { ...msg, adminRead: true } : msg)
        );
    });

    return () => {
      socket.off("new_message_from_admin");
      socket.off("typing");
      socket.off("stop_typing");
      socket.off("messages_read_by_admin");
    };
  }, [socket]);

  const triggerGreetings = useCallback(() => {
    const g1 = { 
      id: "greet-1", 
      isAdmin: true, 
      message: "Welcome to WiztecBD, the house of software wizards.", 
      createdAt: new Date().toISOString() 
    };
    const g2 = { 
      id: "greet-2", 
      isAdmin: true, 
      message: "How can we help you.", 
      createdAt: new Date().toISOString() 
    };
    
    setMessages([g1]);
    setTimeout(() => {
      setMessages(prev => prev.length === 1 ? [...prev, g2] : prev);
    }, 1000);
  }, []);

  const fetchMessages = async (page = 1) => {
    if (!email) return;
    setLoading(true);
    try {
      const data = await fetchChatMessages(email, page, 100);
      if (data?.status === 200) {
        const history = (data.messages || []).reverse();
        if (history.length === 0) {
          triggerGreetings();
        } else {
          setMessages(history);
        }
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    if (!email) return;
    try {
      const data = await fetchChatUnreadCount(email);
      if (data?.status === 200) {
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const markAsRead = async () => {
    if (!email) return;
    try {
      await markChatUserRead(email);
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const sendMessage = async (text, file) => {
    if (!email) return;
    
    const formData = new FormData();
    formData.append("email", email);
    formData.append("message", text);
    formData.append("isAdmin", false);
    if (file) {
      formData.append("file", file);
    }

    // Optimistic Update
    const tempMessage = {
      id: Date.now(),
      email,
      message: text,
      file: file ? URL.createObjectURL(file) : null,
      isAdmin: false,
      createdAt: new Date().toISOString(),
      adminRead: false
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      await sendChatMessage(formData);
      if (socket) {
        socket.emit("stop_typing", { room: "admin" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const sendTyping = (isTyping) => {
    if (!socket || !email) return;
    
    if (isTyping) {
      socket.emit("typing", { room: "admin", isAdmin: false, email });
      
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stop_typing", { room: "admin", isAdmin: false, email });
      }, 3000);
    } else {
      socket.emit("stop_typing", { room: "admin", isAdmin: false, email });
    }
  };

  return {
    messages,
    unreadCount,
    isAdminTyping,
    loading,
    sendMessage,
    markAsRead,
    fetchMessages,
    sendTyping,
  };
};

export default useChat;
