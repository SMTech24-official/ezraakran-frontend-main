


// import { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";

// interface ChatSidebarProps {
//   chatMembers: any[];
//   onUserClick: (user: any) => void;
//   selectedUser: any;
// }

// // Debounce function
// const debounce = (func: Function, delay: number) => {
//   let timeoutId: NodeJS.Timeout;
//   return (...args: any[]) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func(...args), delay);
//   };
// };

// export default function ChatSidebar({
//   chatMembers,
//   onUserClick,
//   selectedUser,
// }: ChatSidebarProps) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredChatMembers, setFilteredChatMembers] = useState<any[]>(chatMembers);

//   // Update filtered chat members when searchTerm or chatMembers change
//   useEffect(() => {
//     const filterMembers = () => {
//       const filtered = chatMembers.filter(
//         (user) =>
//           user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredChatMembers(filtered);
//     };

//     // Debounce the filter function
//     const debouncedFilter = debounce(filterMembers, 300);
//     debouncedFilter();

//     // Cleanup debounce on unmount
//     return () => {
//       debouncedFilter();
//     };
//   }, [searchTerm, chatMembers]);

//   return (
//     <div className="w-full border-r flex flex-col h-[calc(100vh-83px)] shadow-lg">
//       {/* Header */}
//       <div className="p-4 border-b flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-red">Chats</h1>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//           <Input
//             placeholder="Search chats"
//             className="pl-10 bg-blue rounded-lg border-none focus:ring-2 focus:ring-blue-400"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Chat Members List */}
//       <div className="flex-1 overflow-y-auto p-2">
//         {filteredChatMembers?.map((user) => (
//           <div
//             key={user?.id}
//             className={`flex items-center gap-3 p-2 transition-colors my-2 rounded-md cursor-pointer hover:bg-emerald-400 ${
//               selectedUser?.id === user.id ? "bg-emerald-500" : "bg-emerald-100"
//             }`}
//             onClick={() => onUserClick(user)}
//           >
//             <Avatar>
//               <AvatarImage src={user?.avatar} />
//               <AvatarFallback className="bg-blue font-bold rounded-full text-white">
//                 {user?.firstName?.[0]}
//               </AvatarFallback>
//             </Avatar>

//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-center">
//                 <p className="text-red font-bold truncate">{user.firstName}</p>
//                 <span className="text-xs text-red">{user.lastSeen}</span>
//               </div>
//               <p className="text-sm text-red truncate">{user.lastMessage}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



















// import { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";

// interface ChatSidebarProps {
//   chatMembers: any[];
//   onUserClick: (user: any) => void;
//   selectedUser: any;
// }

// // Debounce function
// const debounce = (func: Function, delay: number) => {
//   let timeoutId: NodeJS.Timeout;
//   return (...args: any[]) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func(...args), delay);
//   };
// };

// export default function ChatSidebar({
//   chatMembers,
//   onUserClick,
//   selectedUser,
// }: ChatSidebarProps) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredChatMembers, setFilteredChatMembers] = useState<any[]>(chatMembers);

//   // Update filtered chat members when searchTerm or chatMembers change
//   useEffect(() => {
//     const filterMembers = () => {
//       const filtered = chatMembers.filter(
//         (user) =>
//           user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredChatMembers(filtered);
//     };

//     // Debounce the filter function
//     const debouncedFilter = debounce(filterMembers, 300);
//     debouncedFilter();

//     // Cleanup debounce on unmount
//     return () => {
//       debouncedFilter();
//     };
//   }, [searchTerm, chatMembers]);

//   return (
//     <div className="w-full border-r flex flex-col h-[calc(100vh-83px)] shadow-lg">
//       {/* Header */}
//       <div className="p-4 border-b flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-red">Chats</h1>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//           <Input
//             placeholder="Search chats"
//             className="pl-10 bg-blue rounded-lg border-none focus:ring-2 focus:ring-blue-400"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Chat Members List */}
//       <div className="flex-1 overflow-y-auto p-2">
//         {filteredChatMembers?.map((user) => (
//           <div
//             key={user?.id}
//             className={`flex items-center gap-3 p-2 transition-colors my-2 rounded-md cursor-pointer hover:bg-emerald-400 ${
//               selectedUser?.id === user.id ? "bg-emerald-500" : "bg-emerald-100"
//             }`}
//             onClick={() => onUserClick(user)}
//           >
//             <Avatar>
//               <AvatarImage src={user?.avatar} />
//               <AvatarFallback className="bg-blue font-bold rounded-full text-white">
//                 {user?.firstName?.[0]}
//               </AvatarFallback>
//             </Avatar>

//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-center">
//                 <p className="text-red font-bold truncate">{user.firstName}</p>
//                 <span className="text-xs text-red">{user.lastSeen}</span>
//               </div>
//               <p className="text-sm text-red truncate">{user.lastMessage}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface ChatSidebarProps {
  chatMembers: any[];
  onUserClick: (user: any) => void;
  selectedUser: any;
}

// Debounce function
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export default function ChatSidebar({
  chatMembers,
  onUserClick,
  selectedUser,
}: ChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChatMembers, setFilteredChatMembers] = useState<any[]>(chatMembers);

  // Update filtered chat members when searchTerm or chatMembers change
  useEffect(() => {
    const filterMembers = () => {
      const filtered = chatMembers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChatMembers(filtered);
    };

    // Debounce the filter function
    const debouncedFilter = debounce(filterMembers, 300);
    debouncedFilter();

    // Cleanup debounce on unmount
    return () => {
      debouncedFilter();
    };
  }, [searchTerm, chatMembers]);

  return (
    <div className="w-full border-r flex flex-col h-[calc(100vh-83px)] shadow-lg">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red">Chats</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search chats"
            className="pl-10 bg-blue rounded-lg border-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Chat Members List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredChatMembers?.map((user) => (
          <div
            key={user?.id}
            className={`flex items-center gap-3 p-2 transition-colors my-2 rounded-md cursor-pointer hover:bg-emerald-400 ${
              selectedUser?.id === user.id ? "bg-emerald-500" : "bg-emerald-100"
            }`}
            onClick={() => onUserClick(user)}
          >
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-blue font-bold rounded-full text-white">
                {user?.firstName?.[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="text-red font-bold truncate">{user.firstName}</p>
                <span className="text-xs text-red">{user.lastSeen}</span>
              </div>
              <p className="text-sm text-red truncate">{user.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}