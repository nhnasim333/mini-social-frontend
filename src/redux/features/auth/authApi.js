import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => {
        return {
          url: `/users/create`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["users"]
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: `/users/login`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["users"]
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation} = authApi;
