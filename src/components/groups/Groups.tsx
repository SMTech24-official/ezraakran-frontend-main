"use client";

import { useState, useEffect } from "react";
import GroupCard from "@/components/groups/group-card";
import { Pagination } from "@/components/members/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaPlus } from "react-icons/fa";
import Loading from "@/components/Loading";
import CreateGroup from "@/components/groups/CreateGroup";
import { useGetGroupsQuery, useGetMyGroupsQuery } from "@/redux/api/groupApi";
import { all } from "axios";

interface Group {
  id: string;
  name: string;
  type: string;
  description: string;
  memberCount: number;
  image: any;
}

export default function Groups() {
  const [createGroupModel, setCreateGroupModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 6;

  const { data: groups, isLoading } = useGetGroupsQuery();
  const { data: myGroups, isLoading: myGroupsLoading } = useGetMyGroupsQuery();
const apiGroups = groups?.data;
const apiMyGroups = myGroups?.data;
const allGroupsHandler = () => {
  // setSelectedFilter("all");
  setCurrentPage(1);
}

const myGroupsHandler = () => {
  // setSelectedFilter("my");
  setCurrentPage(1);
}


  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  if (isLoading) return <Loading />;

  return (
    <div className="relative">
      <div className="sm:mx-auto py-10 space-y-2 md:space-y-4 sm:w-full md:pl-12 px-4 mb-10 sm:container">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Groups
        </h1>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row items-between justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-row items-start gap-2 md:gap-4">
            <div
              className={`flex items-center text-sm sm:text-base font-bold cursor-pointer 
           `}
              onClick={allGroupsHandler}
            >
              All Groups
              <span className="ml-2 text-xs bg-red px-2 text-white rounded py-[2px]">
                {apiGroups.length}
              </span>
            </div>

            <div
              className={`flex items-center text-sm sm:text-base font-bold cursor-pointer
           }
              `}
              onClick={myGroupsHandler}
            >
              My Groups
              <span className="ml-2 text-xs bg-gray-200 px-2 rounded py-[2px]">
                {myGroups?.data?.length}
              </span>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center md:justify-center gap-5">
            {/* Create Group Button */}
            <button
              onClick={() => setCreateGroupModel(true)}
              className="bg-white py-2 px-5 md:text-base text-sm text-black rounded-md flex gap-2 items-center font-medium"
            >
              <FaPlus />
              <span
                className={`${
                  createGroupModel ? "block md:hidden" : "md:block hidden"
                }`}
              >
                Create Group
              </span>
            </button>
            {createGroupModel && (
              <CreateGroup setCreateGroupModel={setCreateGroupModel} />
            )}

            <div className="flex items-center gap-5">
              {/* Search Input */}

              <Select defaultValue="newest">
                <SelectTrigger className="md:min-w-[130px] md:text-base text-sm w-auto rounded-md px-3 py-2 h-10 focus:ring-1 focus:ring-gray-200 focus:ring-offset-0 bg-white text-black">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="md:text-base text-sm" value="most">
                    Most Members
                  </SelectItem>
                  <SelectItem className="md:text-base text-sm" value="newest">
                    Newest Registered
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {apiGroups.map((group: Group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        {/* Pagination */}
        {/* <Pagination
          currentPage={currentPage}
          totalItems={displayedGroups.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </div>
  );
}
