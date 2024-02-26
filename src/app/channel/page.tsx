
import { ChannelProvader } from "@/provaders/ChannelProvader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мой канал",
};

const page = () => {
  return (
    <ChannelProvader>
        <h1>привет</h1>
    </ChannelProvader>
  )
}

export default page