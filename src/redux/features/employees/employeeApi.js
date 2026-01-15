import { baseApi } from "../../api/baseApi";


const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: (args) => {
        return {
          url: `/employees`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["employees"],
    }),
    createEmployee: builder.mutation({
      query: (data) => {
        return {
          url: `/employees/create`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["employees"]
    }),
  }),
});

export const {useGetAllEmployeeQuery, useCreateEmployeeMutation} = employeeApi
