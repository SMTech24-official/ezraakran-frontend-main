"use client";
import React, { useEffect, useState } from "react";
import group1Image from "@/assets/groups/group1.png";
import Image from "next/image";
import Link from "next/link";
import CreatePost from "./CreateGroupPost";
import { useParams } from "next/navigation";
import {
  useGetGroupMemberByGroupIdQuery,
  useGetIsGroupMemberGroupIdQuery,
  useJoinGroupMutation,
  useSingleGroupQuery,
} from "@/redux/api/groupApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { group } from "console";
import Loading from "../Loading";

const GroupBanner = () => {
  const { id: groupId } = useParams(); 
  const { data: singleGroup, isLoading } = useSingleGroupQuery(groupId);
  const [createPost, setCreatePost] = useState(false);
  const [joinGroup, { isLoading: joinLoading }] = useJoinGroupMutation(); 
  
  const user = useSelector(
    (state: { user: { user: { id: string } } }) => state.user.user
  );
  const userId = user?.id;
  const { data } = useGetGroupMemberByGroupIdQuery(groupId);
  const member = data?.data?.data.length;

  // Filter group members based on userId
  interface GroupMember {
    userId: string;
  }

  const isOwner = singleGroup?.data?.ownerId === userId;

    const { data:isGroupMember } = useGetIsGroupMemberGroupIdQuery(groupId);
    const isMember = isGroupMember?.data

 const handleJoinGroup = async () => {

    try {
      const response = await joinGroup({ id: groupId }).unwrap();
      console.log(response);
      toast.success(response?.message || "Joined group successfully!");
    } catch (error:any) {
      toast.error(error?.data?.message || "Error joining group!");
      console.error("Error joining group:", error);
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="relative">
      {createPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="rounded-3xl py-6 px-7 md:py-10 md:px-12 bg-customGreen text-white w-full mt-8 md:mt-20 h-auto md:h-[500px] flex md:flex-row flex-col md:items-center md:justify-center gap-5">
        {/* left */}
        <div className="left w-full md:w-1/2 flex flex-col gap-2">
          <div className="px-4 py-1 bg-pink text-gray-600 w-fit rounded-full">
            <h3 className="text-sm  font-bold">Community Group</h3>
          </div>
          <h1 className="text-xl md:text-5xl  text-white font-bold md:mt-4">
            {singleGroup?.data?.name || "Group Name"}
          </h1>
          <h3 className="text-sm opacity-80 md:text-base md:mt-4 font-bold ">
            {member} Members
          </h3>

          <div className="flex md:flex-row flex-col gap-5 mt-1 md:mt-5">
            {isMember?.status === "APPROVED" ? (
              <button
                className="py-3 text-base px-7 bg-green text-white rounded-md font-bold md:text-nowrap text-center  cursor-not-allowed"
              >
                Joined ✅
              </button>
            ) : isMember?.status === "PENDING" ? (
              <button
                className="py-3 text-base px-7 bg-green text-white rounded-md font-bold md:text-nowrap text-center  cursor-not-allowed"
              >
                Requested 🥺
              </button>
            ) : (
              <button
                onClick={handleJoinGroup}
                disabled={joinLoading}
                className="py-3  text-base px-7 bg-green text-white rounded-md font-bold md:text-nowrap text-center hover:bg-yellow transition duration-300 hover:text-gray-600"
              >
                {joinLoading ? "Joining..." : "Join Group"}
              </button>
            )}

            {/* Show 'Create Post' button if joined */}
            {isMember?.status === "APPROVED" && (
              <button
                onClick={() => setCreatePost(true)}
                className="py-3 text-base px-7 bg-green text-white rounded-md font-bold md:text-nowrap text-center hover:bg-yellow duration-300 transition-all hover:text-gray-600"
              >
                Create Post
              </button>
            )}
            {/* <Link
              onClick={() => setCreatePost(true)}
              href=""
              className="py-3 text-base px-7 bg-green text-white rounded-md font-bold md:text-nowrap text-center hover:bg-yellow duration-300 transition-all hover:text-gray-600"
            >
              Create Post
            </Link> */}
            {createPost && <CreatePost setCreatePost={setCreatePost} />}
          </div>
        </div>
        {/* right */}
        <div className="right w-full md:w-1/2 md:h-full h-[200px] overflow-hidden md:py-5">
          <Image
            src={singleGroup?.data?.image || ""}
            alt="group-image"
            height={400}
            width={400}
            className="h-full   w-full rounded-3xl "
          />
        </div>
      </div>
    </div>
  );
};

export default GroupBanner;
