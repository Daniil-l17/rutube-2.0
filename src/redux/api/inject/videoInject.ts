import { Ivideo } from "@/types/Ivideo";
import { api } from "../api";


interface iVideoDto {

  id: number
    name:string

    isPublick?:boolean
  
    description:string
  
    videoPath:string
  

}

export const videoApi = api.injectEndpoints({
  endpoints: builder => ({
    GetVideo: builder.query<Ivideo[],void>({
      query: () => '/video',
      providesTags: () => [{type: 'Video'}]
    }),
    PopularVideo: builder.query<Ivideo[],null>({
      query: () => '/video/most-popular'
    }),
    getVideoBySearchTermL: builder.query<Ivideo[],string>({
      query: (searchTerm) => ({
        url: '/video/searchTerm',
        params: {
          searchTerm
        }
      })
    }),
    getVideoById: builder.query<Ivideo,number>({
      query: (id) => `/video/${id}`,
      providesTags: (result,error,id) => [{type: 'Video',id}]
    }),
    createVideo: builder.mutation<string,void>({
      query: () => ({
        url: '/video',
        method: 'POST'
      }),
      invalidatesTags: () => [{type: 'Profile'}]
    }),
    updateVideo: builder.mutation<Ivideo,iVideoDto>({
      query: ({id,...body}) => ({
        url: `/video/${id}`,
        method: 'POST',
        body
      }),
      invalidatesTags: (result,error,{id}) => [{type: 'Video',id},{type: 'Profile'}]
    }),
    deleteVideo: builder.mutation<void,number>({
      query: (id) => ({
        url: `/video/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{type: 'Video'},{type: 'Profile'}]
    })
  })
})

export const {usePopularVideoQuery,useCreateVideoMutation,useDeleteVideoMutation,useGetVideoQuery} = videoApi