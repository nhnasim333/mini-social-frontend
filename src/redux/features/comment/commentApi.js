import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a comment
    createComment: builder.mutation({
      query: (data) => {
        return {
          url: `/comments`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["comments"]
    }),

    // Get all comments with pagination and sorting
    getAllComments: builder.query({
      query: ({ page = 1, limit = 10, sortBy = "newest" }) => {
        return {
          url: `/comments?page=${page}&limit=${limit}&sortBy=${sortBy}`,
          method: "GET",
        };
      },
      providesTags: ["comments"]
    }),

    // Get statistics about comments
    getCommentStats: builder.query({
      query: () => {
        return {
          url: `/comments/statistics`,
          method: "GET",
        };
      },
      providesTags: ["comments"]
    }),

    // Get single comment
    getSingleComment: builder.query({
      query: (id) => {
        return {
          url: `/comments/${id}`,
          method: "GET",
        };
      },
      providesTags: ["comments"]
    }),

    // Update comment
    updateComment: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/comments/${id}`,
          method: "PATCH",
          body: data
        };
      },
      invalidatesTags: ["comments"]
    }),

    // Delete comment
    deleteComment: builder.mutation({
      query: (id) => {
        return {
          url: `/comments/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comments"]
    }),

    // Like a comment
    likeComment: builder.mutation({
      query: (id) => {
        return {
          url: `/comments/${id}/like`,
          method: "POST",
        };
      },
      invalidatesTags: ["comments"]
    }),

    // Dislike a comment
    dislikeComment: builder.mutation({
      query: (id) => {
        return {
          url: `/comments/${id}/dislike`,
          method: "POST",
        };
      },
      invalidatesTags: ["comments"]
    }),

    // Get replies for a comment
    getReplies: builder.query({
      query: (id) => {
        return {
          url: `/comments/${id}/replies`,
          method: "GET",
        };
      },
      providesTags: ["comments"]
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetAllCommentsQuery,
  useGetSingleCommentQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useDislikeCommentMutation,
  useGetRepliesQuery,
  useGetCommentStatsQuery
} = commentApi;