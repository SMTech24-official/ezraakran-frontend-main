"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrDislike, GrLike } from "react-icons/gr";
import { LiaComments } from "react-icons/lia";
import { useDeleteGroupPostMutation } from "@/redux/api/groupApi";
import { usePostReactionMutation } from "@/redux/api/baseApi";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Loading from "../Loading";
import PostComment from "./PostComment";
import { count } from "console";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Comment {
  id: number;
  name: string;
  comment: string;
  time: string;
}

interface Post {
  id: string;
  title: string;
  images: string[];
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}

const GroupPostCard = ({ groupPost }: { groupPost: Post[] }) => {
  const user = useSelector((state: RootState) => state?.user?.user);
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

  const [deleteGroupPost] = useDeleteGroupPostMutation();
  const [postReaction] = usePostReactionMutation();

  const isUserLiked = groupPost?.some((post: any) =>
    post?.GroupPostReaction?.some(
      (reaction: any) =>
        reaction?.userId === user?.id && reaction?.type === "LIKE"
    )
  );
  const isUserUnLiked = groupPost?.some((post: any) =>
    post?.GroupPostReaction?.some(
      (reaction: any) =>
        reaction?.userId === user?.id && reaction?.type === "UNLIKE"
    )
  );
  // const isUserPost = groupPost?.some((post: any) => post.userId === user?.id);
  // console.log(isUserPost, "isuse");

  const handleDeletePost = async (id: string) => {
    try {
      const res = await deleteGroupPost({ id }).unwrap();
      toast.success(res.message || "Group post deleted successfully")
      console.log(res);
    } catch (err: any) {
      console.log(err, "err");
      toast.error(err.data.message || "Error deleting post");
    }
  };

  const handlePostReactions = async (groupPostId: string, type: string) => {
    try {
      const response = await postReaction({ groupPostId, type });
      console.log(response, "response");
    } catch (error: any) {
      toast.error(error.data.message || "Error handling post reaction");
      console.error("Error handling post reaction:", error);
    }
  };

  return (
    <div className="container flex flex-col gap-5 md:gap-0 py-3 px-0 md:px-8 mt-6 md:mt-12">
      {groupPost?.map((post: any) => {
        const timeAgo = formatDistanceToNow(new Date(post?.createdAt), {
          addSuffix: true,
        });
        return (
          <div
            key={post?.id}
            className="w-full py-6 md:py-10 md:px-8 md:my-10 px-6  rounded-3xl bg-green shadow-customMd"
          >
            <div className="flex justify-between">
              <div className="flex gap-5 items-center">
                <div className="h-12 w-12 md:h-20 md:w-20 rounded-full bg-black overflow-hidden">
                  <Image
                    src={post?.user?.profilePicture}
                    width={80}
                    height={80}
                    alt="Profile"
                  />
                </div>
                <div>
                  <h3 className="text-sm md:text-xl lg:text-2xl font-bold">
                    {post?.user?.firstName} {post?.user?.lastName}
                  </h3>
                  <p className="text-sm opacity-80">{timeAgo}</p>
                </div>
              </div>
              {post.userId === user.id && (
                <div className="cursor-pointer relative">
                  <div
                    className="p-1"
                    onClick={() => setDeletePost(!deletePost)}
                  >
                    <BsThreeDotsVertical />
                  </div>
                  {deletePost && (
                    <ul className="bg-white rounded-lg text-black absolute top-[45%] right-0 w-fit py-2 md:py-3">
                      <li
                        className="py-1 px-4 font-bold text-nowrap  text-sm md:text-base"
                        onClick={() => handleDeletePost(post?.id)}
                      >
                        Delete post
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="mt-5 md:mt-8 ">
              <h2 className="font-bold text-base md:text-xl">{post?.title}</h2>
              <div className="overflow-hidden mt-4 md:mt-6">
                {post?.images && post?.images.length > 0 ? (
                  <div
                    className={`grid gap-4 ${
                      post.images.length === 1
                        ? "grid-cols-1"
                        : post.images.length === 2
                        ? "md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-3"
                    }`}
                  >
                    {post.images.map((img: string, index: number) => (
                      <div
                        key={index}
                        className={`w-full rounded-2xl overflow-hidden bg-[#00000037] ${
                          post.images.length === 1
                            ? "h-[200px] md:h-[500px]"
                            : "h-[200px] md:h-[400px]"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Post Image ${index + 1}`}
                          width={300}
                          height={200}
                          className="w-full md:h-full object-cover rounded-2xl"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-[300px] relative z-10 overflow-hidden rounded-3xl">
                    <div className="absolute z-20 left-0 top-0 bg-[#00000050] w-full h-full flex items-center justify-center">
                      <span className="text-base text-black font-medium">
                        No images found
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between py-6 ">
                <div className="flex gap-4 md:gap-6 text-lg">
                  {/* Like Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePostReactions(post?.id, "LIKE")}
                    className={`flex items-center gap-2 p-2 rounded-lg border border-gray-300 transition-all duration-300 ${
                      isUserLiked ? "bg-red" : " text-gray-200 hover:bg-red"
                    }`}
                  >
                    <GrLike className="text-lg md:text-xl" />
                    <span className="font-semibold">Like</span>
                    {post.likeCount > 0 && (
                      <span className="text-lg font-bold">
                        {post.likeCount}
                      </span>
                    )}
                  </motion.button>

                  {/* Unlike Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePostReactions(post?.id, "UNLIKE")}
                    className={`flex items-center gap-2 p-2 rounded-lg border border-gray-300 transition-all duration-300 ${
                      isUserUnLiked
                        ? "bg-yellow text-gray-600"
                        : " hover:text-gray-600 hover:bg-yellow"
                    }`}
                  >
                    <GrDislike className="text-lg md:text-xl" />
                    <span className="font-semibold">Unlike</span>
                    {post.unlikeCount > 0 && (
                      <span className="text-lg font-bold">
                        {post.unlikeCount}
                      </span>
                    )}
                  </motion.button>
                </div>

                <h3
                  className={`flex items-center gap-2 p-2 rounded-lg border border-gray-300 transition-all duration-300 hover:text-gray-200 hover:bg-red cursor-pointer`}
                  onClick={() => {
                    setCommentSectionVisible(!commentSectionVisible);
                  }}
                >
                  <LiaComments className="text-xl" /> Comments
                  {post._count?.GroupPostComment > 0 && (
                    <span className="text-lg font-bold">
                      {post._count.GroupPostComment}
                    </span>
                  )}
                </h3>
              </div>
              {commentSectionVisible && <PostComment postId={post?.id} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupPostCard;
