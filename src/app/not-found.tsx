import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Image alt="non-found" src={'/Group 3.png'} width={600} height={400} />
      <Link href={'/'}>
        <Button color="danger" variant="flat">
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
}
