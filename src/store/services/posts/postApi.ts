import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    // ? Query: Get All Posts
    getPosts: builder.query<IPost[], string>({
      query: (pageNumber) => `posts?_page=${pageNumber}&_limit=5`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Posts" as const,
                id,
              })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
      // ? Transform the result to prevent nested data
      // transformResponse: (response: { data: { posts: IPost[] } }) =>
      //   response.data.posts,
    }),
    // ? Query: Get a single post
    getPost: builder.query<IPost, string>({
      query(id) {
        return `posts/${id}`;
      },
      transformResponse: (response: { data: { post: IPost } }, _args, _meta) =>
        response.data.post,
      providesTags: (_result, _error, id) => [{ type: "Posts", id }],
    }),
    // ? Mutation: Create a post
    createPost: builder.mutation<IPost, FormData>({
      query(data) {
        return {
          url: "posts",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
      transformResponse: (response: { data: { post: IPost } }) =>
        response.data.post,
    }),
    // ? Mutation: Update Product
    updatePost: builder.mutation<IPost, { id: string; formData: FormData }>({
      query({ id, formData }) {
        return {
          url: `posts/${id}`,
          method: "PATCH",
          credentials: "include",
          body: formData,
        };
      },
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: "Posts", id },
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
      transformResponse: (response: { data: { post: IPost } }) =>
        response.data.post,
    }),
    // ? Mutation: Delete post
    deletePost: builder.mutation<null, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useGetPostQuery,
  usePrefetch,
} = postApi;
