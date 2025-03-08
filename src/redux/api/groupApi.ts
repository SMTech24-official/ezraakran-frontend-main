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
        // group status
        getGroupStatus: builder.query({
            query: ({ groupId }) => ({
                url: `/group-member/${groupId}`, 
                method: "GET",
            }),
        }),
        // join group
        joinGroup: builder.mutation({
            query: ({ id }) => ({
                url: `/group-member/join/${id}`,
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
        }),
        // get Posts By Group
        getPostsByGroupId: builder.query({
            query: (groupId) => `/group-post/group/${groupId}`,
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
    })
});

export const {
    useCreateGroupMutation,
    useGetGroupsQuery,
    useGetMyGroupsQuery,
    useSingleGroupQuery,
    useGetGroupStatusQuery,
    useJoinGroupMutation,
    useLeaveGroupMutation,
    useGetPostsByGroupIdQuery,
    useCreateGroupPostMutation,
    useDeleteGroupPostMutation,
    useGetGroupMemberByGroupIdQuery

} = groupApi;