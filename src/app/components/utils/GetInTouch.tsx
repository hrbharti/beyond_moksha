"use client"
import Image from 'next/image'
import { Button } from './Button'
import { Input } from './Input'

export default function GetInTouch() {

    return <div className=" h-full text-black flex flex-col justify-center items-center ">

        <div className="flex flex-col items-center justify-center  gap-3 ">
            <div className="text-4xl tracking-wider bg-gradient-to-t from-[#1F3A52] to-[#4682B8]  bg-clip-text text-transparent font-lora font-normal">Get in touch with us</div>
            <div className='mt-6'>We are here to help you through this difficult time. Reach out to us anytime</div>

        </div>
        <div className='flex flex-col'>
            <div className="px-2 text-xl py-[2.75rem]">Send us an Email</div>
            <div className="h-[90%] w-full border border-[#1F3A52]  rounded-md">
                {/* form */}
                <div className="h-full w-full  rounded-md border flex items-center justify-between p-10 ">
                    <div className=' h-full w-2/3 '>
                        {/* inputs */}



                        <div className='h-[25%] flex gap-2 w-full '>
                            <div className='w-2/5'><Input type='text' title='Name' required={true} /></div>
                            <div className='w-3/5'><Input type='text' title='Email Address' required={true} /></div>
                        </div>
                        <div className='h-[25%] flex gap-2 w-full'>
                            <div className='w-2/5'><Input type='number' title='Phone' required={false} /></div>
                            <div className='w-3/5'><Input type='text' title='Services' required={true} /></div>
                        </div>
                        <div className='h-[25%] '>
                            <div><Input type='textarea' title='Messages' required={true} /></div>
                        </div>
                        <div className='h-[25%]  flex items-center justify-items-start pt-3'>
                            <Button variantType='primary' size="lg" text='Send Message' onClick={() => console.log('message clicked')} />
                        </div>
                    </div>
                    <div className='h-full w-2/5 flex flex-col  items-center justify-between p-3'>
                        <div className='h-50 w-full bg-white flex items-center justify-center text-black'>
                            <Image src="/getInTouch.png" alt="message us" height={200} width={200} />
                        </div>
                        <div className='text-center pt-3 px-4'>
                            Effortlessly reach out to us using our contact form. We are committed to responding within minutes, ensuring your queries are addressed swiftly and efficiently.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}   