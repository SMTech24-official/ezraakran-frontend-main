
"use client";
import { useParams } from "next/navigation";
import GroupPostCard from "./groupPostCard";
import { useGetPostsByGroupIdQuery } from "@/redux/api/groupApi";
import Loading from "../Loading";


const GroupPost = () => {
  const params = useParams();
  const { data: groupItems, isLoading } = useGetPostsByGroupIdQuery(params?.id);

    const groupPost = groupItems?.data;

    if (isLoading) return <Loading />;
  return (
    <div>
      <GroupPostCard groupPost={groupPost} />
    </div>
  );
};

export default GroupPost;