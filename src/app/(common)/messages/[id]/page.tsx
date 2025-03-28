



"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import ChatArea from "@/components/messages/ChatArea";
import ChatSidebar from "@/components/messages/ChatSidebar";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "@/redux/api/baseApi";

export default function Home() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatMembers, setChatMembers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [tempMessage, setTempMessage] = useState<any>(null); // For optimistic updates
  const [loadingMessages, setLoadingMessages] = useState(false); // Loading state for previous messages

  const pathName = usePathname();
  const user = useSelector((state: any) => state?.user?.user);
  const currentSelectedUserId = pathName.split("/")[2];
  const userId = user?.id;
  const { data: otherUser, isLoading: otherUserLoading } = useGetUserByIdQuery(
    currentSelectedUserId
  );

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
    }
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle socket events and state updates
  useEffect(() => {
    if (!socket || !userId) return;

    const handleGetAllChatMembers = (members: any[]) => {
      if (otherUser?.data) {
        const isOtherUserInList = members.some(
          (member) => member.id === otherUser.data.id
        );
        if (!isOtherUserInList) {
          members = [...members, otherUser.data];
        }
      }
      setChatMembers(members.reverse());
    };

    const handleMessageHistory = (history: any[]) => {
      setMessages(history);
      setLoadingMessages(false);
    };

    const handleReceiveMessage = (message: any) => {
      // Add received messages to the messages array
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleSentMessage = (message: any) => {
      // // console.log({message})
      // // Replace the temporary message with the actual message from the server
      // setMessages((prevMessages) =>
      //   prevMessages.map((msg) =>
      //     msg.createdAt === tempMessage?.createdAt ? message : msg
      //   )
      // );
      // setTempMessage(null); 
    };

    // Fetch chat members when the component mounts
    socket.emit("getAllChatMembers", { userId });

    // Attach event listeners
    socket.on("getAllChatMembers", handleGetAllChatMembers);
    socket.on("messageHistory", handleMessageHistory);
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("sentMessage", handleSentMessage);

    // Cleanup event listeners
    return () => {
      socket.off("getAllChatMembers", handleGetAllChatMembers);
      socket.off("messageHistory", handleMessageHistory);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("sentMessage", handleSentMessage);
    };
  }, [socket, userId, otherUser?.data, tempMessage]);

  // Automatically select the user from the URL on first render
  useEffect(() => {
    if (otherUser?.data) {
      setSelectedUser(otherUser.data);
      setLoadingMessages(true);
      if (socket && userId) {
        socket.emit("joinSingleChat", {
          participant1Id: userId,
          participant2Id: otherUser.data.id,
        });
      }
    }
  }, [otherUser?.data, socket, userId]);

  // Memoized function to handle user clicks
  const handleUserClick = useCallback(
    (user: any) => {
      setSelectedUser(user);
      setLoadingMessages(true);
      if (socket && userId) {
        socket.emit("joinSingleChat", {
          participant1Id: userId,
          participant2Id: user?.id,
        });
      }
      setIsSidebarVisible(false);
    },
    [socket, userId]
  );

  // Memoized function to send messages with optimistic UI
  const sendMessage = useCallback(
    (content: string) => {
      if (socket && selectedUser && userId) {
        // Create a temporary message object
        const tempMsg = {
          senderId: userId,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date().toISOString(),
          isTemp: true, // Mark as temporary
        };

        // Optimistically update the UI
        // setMessages((prevMessages) => [...prevMessages, tempMsg]);
        // setTempMessage(tempMsg);

        // Emit the message to the socket
        socket.emit("sendMessage", {
          senderId: userId,
          receiverId: selectedUser.id,
          content,
          createdAt: tempMsg.createdAt, // Use the same createdAt for matching
        });
      }
    },
    [socket, selectedUser, userId]
  );

  // Memoized chat members and messages to prevent unnecessary re-renders
  const memoizedChatMembers = useMemo(() => chatMembers, [chatMembers]);
  const memoizedMessages = useMemo(() => messages, [messages]);

  if (otherUserLoading) return <div>Loading...</div>;

  return (
    <main className="flex flex-col md:flex-row min-h-[calc(100vh-90px)]">
      {/* Sidebar Toggle Button (Mobile Only) */}
      <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className="fixed right-2 z-50 p-2 bg-gray-600 text-white rounded-md md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar (Mobile and Desktop) */}
      <div
        className={`fixed inset-y-0 z-40 w-[300px] bg-white transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-[350px] lg:w-[400px] transition-transform duration-200 ease-in-out`}
      >
        <ChatSidebar
          chatMembers={memoizedChatMembers}
          onUserClick={handleUserClick}
          selectedUser={selectedUser}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 w-full">
        {selectedUser ? (
          <ChatArea
            selectedUser={selectedUser}
            messages={memoizedMessages}
            onSendMessage={sendMessage}
            loadingMessages={loadingMessages}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </main>
  );
}