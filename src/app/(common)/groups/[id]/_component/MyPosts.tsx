"use client";
import GroupPostCard from '@/components/groupDetails/groupPostCard';
import { useGetMyPostsByGroupIdQuery } from '@/redux/api/groupApi';
import { useParams } from 'next/navigation';
import React from 'react';

const MyPosts = () => {
    const {id: groupId} = useParams();
    const {data} = useGetMyPostsByGroupIdQuery(groupId);
    // console.log(data?.data)
    return (
        <div>
            <GroupPostCard groupPost={data?.data} />
        </div>
    );
};

export default MyPosts;