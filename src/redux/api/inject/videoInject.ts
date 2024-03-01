import { Ivideo } from "@/types/Ivideo";
import { api } from "../api";

export const videoApi = api.injectEndpoints({
  endpoints: builder => ({
    PopularVideo: builder.query<Ivideo[],null>({
      query: () => '/video/most-popular'
    })
  })
})

export const {usePopularVideoQuery} = videoApi