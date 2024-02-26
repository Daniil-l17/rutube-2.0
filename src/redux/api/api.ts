import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { Iuser } from "@/types/IUser";


export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Profile'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4200/api',
    prepareHeaders: (headers,{getState}) => {
      const token = (getState() as RootState).auth.acessToken
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<Iuser,any>({
      query: () => '/user/profile',
      providesTags: () => [{ type: 'Profile' }],
    }),
  })
})

export const { useGetProfileQuery } = api