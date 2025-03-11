import { baseApi } from "./baseApi";

const groupApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // create group
        createGroup: builder.mutation({
            query: (data) => ({
                url: "/group",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Group"],
        }),

        // get all groups
        getGroups: builder.query<any, void>({
            query: () => ({
                url: "/group",
                method: "GET",
            }),
            providesTags: ["Group"],
        }),

        // get My groups
        getMyGroups: builder.query<any, void>({
            query: () => ({
                url: "/group/owner",
                method: "GET",
            }),
            providesTags: ["Group"],
        }),

        // get single group
        singleGroup: builder.query({
            query: (id) => ({
                url: `/group/${id}`,
                method: "GET",
            }),
            providesTags: ["Group"],
        }),

       
        // join group
        joinGroup: builder.mutation({
            query: ({ id }) => ({
                url: `/group-member/joinRequest/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Group"],
        }),
        // leave Group
        leaveGroup: builder.mutation({
            query: ({ id }) => ({
                url: `/group-member/leave/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Group"],
        }),
        // get Posts By Group
        getPostsByGroupId: builder.query({
            query: (groupId) => `/group-post/group/${groupId}`,
            providesTags: ["Post"],
        }),

        // get my Posts By Group
        getMyPostsByGroupId: builder.query({
            query: (groupId) => `/group-post/user/${groupId}`,
            providesTags: ["Post"],
        }),

        // create groups posts
        createGroupPost: builder.mutation({
            query: ({ groupId, formData }) => ({
                url: `/group-post/${groupId}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Post"],
        }),
        // delete group post
        deleteGroupPost: builder.mutation({
            query: ({ id }) => ({
                url: `/group-post/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"],
        }),



        // group member by group id
        getGroupMemberByGroupId: builder.query({
            query: (groupId) => ({
                url: `/group-member/${groupId}`,
                method: "GET",
            }),
            providesTags: ["Group"],
        }),

        // get IS group member by group id
        getIsGroupMemberGroupId: builder.query({
            query: (groupId) => ({
                url: `/group-member/member/${groupId}`,
                method: "GET",
            }),
            providesTags: ["Group"],
        }),

        // group member by group id
        getJoinRequestsByGroupId: builder.query({
            query: (groupId) => ({
                url: `/group-member/joinRequest/${groupId}`,
                method: "GET",
            }),
            providesTags: ["Group"],
        }),

        //update join status
        updateJoinStatus: builder.mutation({
            query: ({ groupId, memberId, status }) => {
              return {
                url: `/group-member/joinRequest/${groupId}`,
                method: "PUT",
                body: { memberId, status },
              };
            },
            invalidatesTags: ["Group"],
          }),

        //update member block status
        updateBlockStatus: builder.mutation({
            query: ({ groupId, memberId }) => ({
                url: `/group-member/${groupId}`,
                method: "PUT",
                body: { memberId },
            }),
            invalidatesTags: ["Group"],
        })
    })
});

export const {
    useCreateGroupMutation,
    useGetGroupsQuery,
    useGetMyGroupsQuery,
    useSingleGroupQuery,
    useJoinGroupMutation,
    useLeaveGroupMutation,
    useGetPostsByGroupIdQuery,
    useGetMyPostsByGroupIdQuery,
    useCreateGroupPostMutation,
    useDeleteGroupPostMutation,
    useGetGroupMemberByGroupIdQuery,
    useGetIsGroupMemberGroupIdQuery,
    useGetJoinRequestsByGroupIdQuery,
    useUpdateJoinStatusMutation,
    useUpdateBlockStatusMutation

} = groupApi;