import { axiosBase } from '@/config/axiosConfig';
import { VideoProvader } from '@/provaders/VideoProvader';
import { Ivideo } from '@/types/Ivideo';
import { Metadata } from 'next';
import React, { Fragment } from 'react';

/*export const generateMetadata = async ({
  params,
}: {
  params: { videoId: string };
}): Promise<Metadata> => {
  const { data } = await axiosBase.get<Ivideo>(`/video/${params.videoId}`);
  return {
    title: `${data.name}`,
  };
};
*/
export const metadata: Metadata = {
  title: 'Видео',
};

const page = ({ params }: { params: { videoId: string } }) => {
  return <VideoProvader id={+params.videoId}></VideoProvader>;
};

export default page;
