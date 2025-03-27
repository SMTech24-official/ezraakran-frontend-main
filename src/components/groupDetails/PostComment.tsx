import React, { useState } from "react";
import { HiArrowTurnUpLeft } from "react-icons/hi2";
import { IoSendSharp } from "react-icons/io5";
import {
  useGetPostCommentsQuery,
  useCreateCommentMutation,
} from "@/redux/api/baseApi";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { smartDateFormatter } from "@/utils/dateDistance";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}

type TGroupPostComment = {
  id: string;
  groupPostId: string;
  userId: string;
  comment: string;
  createdAt: string; 
  updatedAt: string; 
  user: User; 
}
const PostComment = ({postId}:{postId:string}) => {

  const [createComment, { isLoading: isSubmitting }] =
    useCreateCommentMutation();

const {data:commentsData}= useGetPostCommentsQuery(postId)
console.log(commentsData, 'commentsData')

  const [newComment, setNewComment] = useState<string>("");
  const [showAllComments, setShowAllComments] = useState<boolean>(true);
  const [isAddingComment, setIsAddingComment] = useState<boolean>(true);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return;
    try {
      const res = await createComment({
        postId,
        comment: newComment,
      }).unwrap();
      setNewComment("");
     toast.success(res?.message || "Comment added successfully!");
    } catch (error:any) {
toast.error(error?.data?.message || "Error adding comment!");
      console?.error("Error posting comment:", error);
    }
  };

  const isLoading = false;
  const isError = false;
  return (
    <div className="bg-white p-5 md:p-10 rounded-3xl text-gray-600 shadow-lg">
      {/* {!isAddingComment && (
        <div
          onClick={() => setIsAddingComment(true)}
          className="cursor-pointer text-sm md:text-base font-bold text-gray-500 hover:text-gray-800 transition"
        >
          Add a Comment
        </div>
      )} */}

      {isAddingComment && (
        <div className="flex mt-5">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col gap-2 ml-2 md:ml-5 w-full">
            <h2 className="text-base md:text-2xl font-bold">Your Name</h2>
            <div className="relative w-full">
              <textarea
                className="text-sm md:text-base text-gray-600 font-medium py-2 px-4 rounded-md w-full border border-gray-300 outline-none focus:ring focus:ring-sky-300 resize-none"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-darkBlue text-2xl"
                onClick={handleSubmitComment}
                disabled={isSubmitting}
              >
                <IoSendSharp
                  className={`transition ${
                    isSubmitting ? "opacity-50" : "hover:scale-110"
                  }`}
                />
              </button>
            </div>
            <h3
              className="text-sm md:text-base font-bold underline mt-1 cursor-pointer hover:opacity-70 transition-all"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments ? "Hide comments" : "Show all comments"}
            </h3>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-gray-500 mt-4">Loading comments...</p>
      ) : isError ? (
        <p className="text-red-500 mt-4">Failed to load comments.</p>
      ) : (
        showAllComments &&
        (commentsData?.data?.length > 0 ? (
          commentsData.data.map((item: TGroupPostComment) => (
            <div
              key={item.id}
              className="border border-gray-300 py-4 px-4 mt-4 rounded-2xl shadow-sm"
            >
              <div className="flex gap-4">
              <Avatar>
                <AvatarImage
                  src={
                    item?.user.profilePicture ||
                    "https://github.com/shadcn.png"
                  }
                  alt="Avatar"
                  className="border border-gray-200 rounded-full"
                />
              </Avatar>
                <div className="flex flex-col">
                  <h2 className="text-sm md:text-xl font-bold">{item?.user?.firstName} {item?.user?.lastName}</h2>
                  <p className="text-xs md:text-sm text-gray-500 italic">
                   <span className="text-gray-600 ">{smartDateFormatter(new Date(item?.createdAt))}</span>
                  </p>
                  <h1 className="text-sm md:text-lg font-medium">
                    {item.comment}
                  </h1>
                  {/* <div className="reply flex items-center gap-2 mt-2 cursor-pointer hover:opacity-70 transition">
                    <HiArrowTurnUpLeft className="text-gray-600" />
                    <span className="font-bold text-sm md:text-base">
                      Reply
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4 ml-20">
            No comments yet. Be the first to comment!
          </p>
        ))
      )}
    </div>
  );
};

export default PostComment;
