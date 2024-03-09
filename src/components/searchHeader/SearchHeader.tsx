import { Ivideo } from '@/types/Ivideo';
import { Avatar, Card, Image, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { Dispatch, Fragment, SetStateAction, memo } from 'react';


export const SearchHeader = memo(({ searchDate,setOpne }: { searchDate: Ivideo[] | undefined,setOpne:Dispatch<SetStateAction<boolean>>}) => {

  return (
    <Fragment>
      {searchDate?.map(el => (
                  <Card
                  key={el.id}
                  shadow="sm"
                  className="w-[230px] bg-[#222222] text-main h-[182px]"
                  isPressable
                  >
                  <Link onClick={() => setOpne(false)} href={`/video/${el.id}`}>
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={'hello'}
                      className="imgfil w-full object-cover h-[108px]"
                      src={`http://localhost:4200/uploads/thumbnails/${el?.thumbnaulPath}`}
                    />
                    <div className=" px-3 flex py-3 flex-col">
                      <div className="flex items-center gap-3">
                        <Tooltip
                          delay={300}
                          closeDelay={300}
                          placement={'top-start'}
                          content={el.user?.name}
                          offset={10}
                          className="bg-[#313131] text-main">
                          <Link onClick={() => setOpne(false)} href={`/channel/${el.user?.id}`}>
                            <Avatar
                              style={{ width: '40px', height: '40px' }}
                              src={`http://localhost:4200/uploads/avatar/${el.user?.avatarPath}`}
                            />
                          </Link>
                        </Tooltip>
                        <h2 className="textcontenthome text-start">{el.name}</h2>
                      </div>
                    </div>
                  </Link>
                </Card>
      ))}
    </Fragment>
  );
});
