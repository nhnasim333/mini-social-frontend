import { baseApi } from "../../api/baseApi";


const subCategoryAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategory: builder.query({
      query: (id) => {
        return {
          url: `/subcategories/${id}`,
          method: "GET",
        };
      },
      providesTags: ["subcategories"],
    }),
    createSubCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/subcategories/create`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["subcategories"]
    }),
  }),
});

export const {useGetAllSubCategoryQuery, useCreateSubCategoryMutation} = subCategoryAPi
