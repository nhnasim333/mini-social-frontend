import { baseApi } from "../../api/baseApi";


const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpense: builder.query({
      query: (args) => {
        return {
          url: `/expenses`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["expenses"],
    }),
    createExpense: builder.mutation({
      query: (data) => {
        return {
          url: `/expenses/create`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["expenses"]
    }),
  }),
});

export const {useCreateExpenseMutation, useGetAllExpenseQuery} = expenseApi
