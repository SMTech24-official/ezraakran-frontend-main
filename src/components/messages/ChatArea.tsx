// "use client";
// import { Send } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { formatMessageTime } from "./formatMessageTime";

// interface ChatAreaProps {
//   selectedUser: any;
//   messages: any[];
//   onSendMessage: (content: string) => void;
// }

// export default function ChatArea({ selectedUser, messages, onSendMessage }: ChatAreaProps) {
//   const [message, setMessage] = useState("");
//   const user = useSelector((state: any) => state?.user?.user);
//   const userId = user?.id;
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       onSendMessage(message);
//       setMessage("");
//     }
//   };
// console.log({selectedUser})
//   // Auto-scroll to the bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col w-full h-[calc(100vh-83px)]">
//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {messages.length === 0 ? (
//           <p className="text-center text-white font-bold italic">No messages yet.</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.senderId === userId ? "justify-end" : "justify-start"
//               } mb-4`}
//             >
//               <div
//                 className={`flex flex-col ${
//                   msg.senderId === userId ? "items-end" : "items-start"
//                 }`}
//               >
//                 {/* Display the formatted time above the message */}
//                 <span className="text-xs text-white mb-1">
//                   {formatMessageTime(msg.createdAt)}
//                 </span>
//                 <div
//                   className={`p-3 rounded-lg ${
//                     msg.senderId === userId
//                       ? "bg-blue font-bold text-white"
//                       : "bg-blue font-bold text-white"
//                   }`}
//                   style={{
//                     wordWrap: "break-word",
//                     overflowWrap: "break-word",
//                     whiteSpace: "pre-wrap", // Preserve line breaks and wrap text
//                     maxWidth: "300px", // Fixed width for messages
//                   }}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} /> {/* Scroll anchor */}
//       </div>

//       {/* Message Input */}
//       <div className="p-4 border-t shadow-sm flex items-center gap-3">
//         <Input
//           placeholder="Type a message..."
//           className="flex-1 bg-blue rounded-lg border-none focus:ring-2 focus:ring-blue-400"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-blue-500 text-white hover:bg-blue-600"
//           onClick={handleSendMessage}
//         >
//           <Send className="h-6 w-6" />
//         </Button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { Send } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { formatMessageTime } from "./formatMessageTime";

// interface ChatAreaProps {
//   selectedUser: any;
//   messages: any[];
//   onSendMessage: (content: string) => void;
//   loadingMessages: boolean;
// }

// export default function ChatArea({
//   selectedUser,
//   messages,
//   onSendMessage,
//   loadingMessages,
// }: ChatAreaProps) {
//   const [message, setMessage] = useState("");
//   const user = useSelector((state: any) => state?.user?.user);
//   const userId = user?.id;
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       onSendMessage(message);
//       setMessage("");
//     }
//   };

//   // Auto-scroll to the bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col w-full h-[calc(100vh-83px)]">
//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {loadingMessages ? (
//           <p className="text-center text-white font-bold italic">Loading messages...</p>
//         ) : messages.length === 0 ? (
//           <p className="text-center text-white font-bold italic">No messages yet.</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.senderId === userId ? "justify-end" : "justify-start"
//               } mb-4`}
//             >
//               <div
//                 className={`flex flex-col ${
//                   msg.senderId === userId ? "items-end" : "items-start"
//                 }`}
//               >
//                 <span className="text-xs text-white mb-1">
//                   {formatMessageTime(msg.createdAt)}
//                 </span>
//                 <div
//                   className={`p-3 rounded-lg ${
//                     msg.senderId === userId
//                       ? "bg-blue font-bold text-white"
//                       : "bg-blue font-bold text-white"
//                   }`}
//                   style={{
//                     wordWrap: "break-word",
//                     overflowWrap: "break-word",
//                     whiteSpace: "pre-wrap",
//                     maxWidth: "300px",
//                   }}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} /> {/* Scroll anchor */}
//       </div>

//       {/* Message Input */}
//       <div className="p-4 border-t shadow-sm flex items-center gap-3">
//         <Input
//           placeholder="Type a message..."
//           className="flex-1 bg-blue rounded-lg border-none focus:ring-2 focus:ring-blue-400"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-blue-500 text-white hover:bg-blue-600"
//           onClick={handleSendMessage}
//         >
//           <Send className="h-6 w-6" />
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";
import { MoreHorizontal, Phone, Send, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { formatMessageTime } from "./formatMessageTime";

interface ChatAreaProps {
  selectedUser: any;
  messages: any[];
  onSendMessage: (content: string) => void;
  loadingMessages: boolean;
}

export default function ChatArea({
  selectedUser,
  messages,
  onSendMessage,
  loadingMessages,
}: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const user = useSelector((state: any) => state?.user?.user);
  const userId = user?.id;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col w-full h-[calc(100vh-83px)]">
      {/* chat header */}
      <div className="flex items-center justify-between p-4 border-b bg-red text-white">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={selectedUser?.profilePicture || "https://github.com/shadcn.png"} />
          </Avatar>
          <div className="ml-4">
            <h3 className="font-bold text-lg">
              {selectedUser?.firstName} {selectedUser.lastName}
            </h3>
            <p className="text-sm text-[#]">Online</p>
          </div>
        </div>
        <div className="flex space-x-4">
          {/*<Phone className="text-gray-200 text-xl cursor-pointer" />*/}
          {/* <Video className="text-gray-200 text-xl cursor-pointer" /> */}
         {/* <MoreHorizontal className="text-gray-200 text-xl cursor-pointer" /> */}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {loadingMessages ? (
          <div className="flex justify-center items-center h-full">
            {/* Tailwind CSS Spinner */}
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-white font-bold italic">
            No messages yet.
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"
                } mb-4`}
            >
              <div
                className={`flex flex-col ${msg.senderId === userId ? "items-end" : "items-start"
                  }`}
              >
                <span className="text-xs text-white mb-1">
                  {formatMessageTime(msg.createdAt)}
                </span>
                <div
                  className={`p-3 rounded-lg ${msg.senderId === userId
                      ? "bg-blue font-bold text-white"
                      : "bg-blue font-bold text-white"
                    }`}
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    maxWidth: "300px",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} /> {/* Scroll anchor */}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t shadow-sm flex items-center gap-3">
        <Input
          placeholder="Type a message..."
          className="flex-1 bg-blue rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          variant="ghost"
          size="icon"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          <Send className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
