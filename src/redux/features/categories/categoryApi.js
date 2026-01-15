import { baseApi } from "../../api/baseApi";


const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (args) => {
        return {
          url: `/categories`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/categories/create`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["categories"]
    }),
  }),
});

export const {useGetAllCategoryQuery, useCreateCategoryMutation} = categoryApi
