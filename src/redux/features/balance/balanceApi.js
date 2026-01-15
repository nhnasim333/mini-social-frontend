import { baseApi } from "../../api/baseApi";


const balanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: (args) => {
        return {
          url: `/balance`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["incomes", "salaries", "expenses"],
    }),
  }),
});

export const {useGetBalanceQuery} = balanceApi
