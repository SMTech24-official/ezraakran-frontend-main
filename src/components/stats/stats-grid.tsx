"use client";

import { StatCard } from "@/components/ui/stat-card";
import { useGetAllUsersQuery, useGetPostsQuery } from "@/redux/api/baseApi";
import { useGetGroupsQuery } from "@/redux/api/groupApi";
import { PersonStanding, ShoppingBag, Users } from "lucide-react";

export function StatsGrid() {
  const {data:users}=useGetAllUsersQuery({});
  const {data:posts}= useGetPostsQuery();
  const {data:groups}= useGetGroupsQuery();

console.log(groups?.data)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      <StatCard
        icon={<PersonStanding />}
        link="/members"
        value={users?.data?.length}
        label="members"
        className="bg-customGreen"
      />
      <StatCard
        icon={<Users />}
        link="/groups"
        value={groups?.data?.length}
        label="groups"
        className="bg-customGreen"
      />
      <StatCard
        icon={<ShoppingBag />}
        link="/shop"
        value={posts?.data?.meta?.total}
        label="items for sell"
        className="bg-customGreen"
      />
      {/* <StatCard value="4.9" label="320+ ratings" className="bg-white" /> */}
    </div>
  );
}
