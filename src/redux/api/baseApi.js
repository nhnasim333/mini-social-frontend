import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://mini-social-backend.vercel.app/api/v1",
  // baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState()).auth.token;
    if (token) {
      headers.set(`authorization`, `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["users", "comments"],
  endpoints: () => ({}),
});
