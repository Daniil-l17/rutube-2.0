import { ProvaderChannelUserProfile } from '@/provaders/ProvaderChannelUserProfile';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'profile',
};

const page = ({ params }: { params: { id: string } }) => {
  return (
    <ProvaderChannelUserProfile id={params.id}>
      <Fragment/>
    </ProvaderChannelUserProfile>
  );
};

export default page;
