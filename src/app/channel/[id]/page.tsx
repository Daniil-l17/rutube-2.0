import { axiosBase } from '@/config/axiosConfig';
import { ProvaderChannelUserProfile } from '@/provaders/ProvaderChannelUserProfile';
import { Iuser } from '@/types/IUser';
import { Metadata } from 'next';
import { Fragment } from 'react';

/*export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { data } = await axiosBase.get<Iuser>(`/user/by-id/${params.id}`);
  return {
    title: `${data.name.trim() ? data.name : `Пользователь ${data.id}`}`,
  };
};*/

export const metadata: Metadata = {
  title: 'Мой канал',
};

const page = ({ params }: { params: { id: string } }) => {
  return (
    <ProvaderChannelUserProfile id={params.id}>
      <Fragment />
    </ProvaderChannelUserProfile>
  );
};

export default page;
