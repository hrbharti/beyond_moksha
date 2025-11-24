import Image from 'next/image'
import React from 'react';

interface IProps {
  id: string;
  title: string;
  image: string;
  date: string;
  needDivider?: boolean;
}

export default function SideCard(props: IProps) {
  return (
    <div>
      <div className='w-full p-2 flex items-center'>
        <Image
          className='w-[60px] h-[60px] rounded-full'
          src={props.image || "/blog.jpg"}
          alt='Blog_image'
          width={100}
          height={100}
        />
        <div className='ml-2'>
          <p className=''>{props.title}</p>
          <span className='text-gray-500 text-sm'>{props.date}</span>
        </div>
      </div>
      {props.needDivider && <hr />}
    </div>
  )
}
