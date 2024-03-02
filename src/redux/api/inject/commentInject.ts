import { Icomment } from "@/types/Icomment";
import { api } from "../api";


  interface iCommentDto {
    videoId: number,
    message: string
  }

export const commentApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<Icomment,iCommentDto>({
      query: (body) => ({
        url: '/comment',
        method: 'POST',
        body
      }),
      invalidatesTags: (result,error,{videoId}) => [{type: 'Video',id: videoId}]
    })
  })
})