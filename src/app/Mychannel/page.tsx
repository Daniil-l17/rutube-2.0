import { ChannelProvader } from '@/provaders/ChannelProvader';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Мой канал',
};

const page = () => {
  return (
    <ChannelProvader>
        <Fragment/>
    </ChannelProvader>
  );
};

export default page;
