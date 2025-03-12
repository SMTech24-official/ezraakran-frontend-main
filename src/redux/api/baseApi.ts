import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BASEAPI = process.env.NEXT_PUBLIC_DEV_API_URL;

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["Group", "Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASEAPI,
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", ` ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Define the register mutation
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register", // Endpoint for user registration
        method: "POST", // HTTP method
        body: userData, // Payload for the request
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // Define the login mutation
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login", // Login endpoint
        method: "POST",
        body: credentials,
      }),
    }),
    // Define the forgot password mutation
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    // Define the update password mutation
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/update-password",
        method: "POST",
        body: data,
      }),
    }),

    // Define the Subscription mutation
    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscription/create",
        method: "POST",
        body: data,
      }),
    }),
    // Define the Subscription payment intent mutation
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/subscription/payment-intent",
        method: "POST",
        body: data,
      }),
    }),
    // Define the Subscription payment intent mutation
    createBuyProducts: builder.mutation({
      query: (data) => ({
        url: "/payment/buy-product",
        method: "POST",
        body: data,
      }),
    }),

    getPosts: builder.query<any, void>({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
    }),
    // get post by id
    getPostById: builder.query({
      query: (id) => `/post/${id}`,
    }),
    // Define the create shop post mutation
    createShopPost: builder.mutation({
      query: (data) => ({
        url: "/post/create-post",
        method: "POST",
        body: data,
        contentType: "multipart/form-data",
      }),
    }),
    // Define the create stripe account mutation
    createStripeAccount: builder.mutation({
      query: (data) => ({
        url: "/stripe/create-account",
        method: "POST",
        body: data,
      }),
    }),
    // Define the create stripe account links mutation
    createStripeAccountLinks: builder.mutation({
      query: (data) => ({
        url: "/stripe/create-account-link",
        method: "POST",
        body: data,
      }),
    }),
    // get all user
    getAllUsers:builder.query({
      query: ()=>`/users`
    }),
    // Define the get user by ID query
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`, // Using the user ID in the URL
    }),
    // update user profile
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: "users/update-profile",
        method: "PUT",
        body: userData,
      }),
    }),
   

    // get all react of the post
    getPostReactions: builder.query({
      query: (groupPostId) => `group-post-react/${groupPostId}`,
    }),
    // post reaction
    postReaction: builder.mutation({
      query: ({ groupPostId, type }) => ({
        url: "group-post-react", 
        method: "POST",
        body: {
          groupPostId,
          type: type, 
        },
      }),
      invalidatesTags: ["Post"],
    }),
    // get comments
    getPostComments: builder.query({
      query: (groupPostId) => `group-post-comment/${groupPostId}`,
      providesTags: ["Post"],
    }),
    // create comments
    createComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `group-post-comment/${postId}`, // Endpoint to handle comments
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          comment,
        },
      }),
      invalidatesTags:["Post"]
    }),
    // get all chat messages
    getUserConversations: builder.query({
      query: () => ({
        url: "/chat/conversations",
        method: "GET",
      }),
    }),

  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useUpdatePasswordMutation,
  useCreateSubscriptionMutation,
  useCreatePaymentIntentMutation,
  useGetPostsQuery,
  useCreateBuyProductsMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
  useCreateShopPostMutation,
  useCreateStripeAccountMutation,
  useCreateStripeAccountLinksMutation,
  useGetPostReactionsQuery,
  usePostReactionMutation,
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useGetUserConversationsQuery,
  useGetPostByIdQuery,
} = baseApi;
