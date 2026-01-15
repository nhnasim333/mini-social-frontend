import { baseApi } from "../../api/baseApi";


const salaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSalary: builder.query({
      query: (args) => {
        return {
          url: `/salaries`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["salaries"],
    }),
    createSalary: builder.mutation({
      query: (data) => {
        return {
          url: `/salaries/create`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["salaries"]
    }),
  }),
});

export const {useCreateSalaryMutation, useGetAllSalaryQuery} = salaryApi
