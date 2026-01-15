import { baseApi } from "../../api/baseApi";


const incomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllIncome: builder.query({
      query: (args) => {
        return {
          url: `/incomes`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["incomes"],
    }),
    createIncome: builder.mutation({
      query: (data) => {
        return {
          url: `/incomes/create`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["incomes"]
    }),
  }),
});

export const {useCreateIncomeMutation, useGetAllIncomeQuery} = incomeApi
