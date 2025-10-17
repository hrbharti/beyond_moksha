"use client"
import Image from 'next/image'
import { Button } from './Button'
import { Input } from './Input'

export default function GetInTouch() {

    return <div className=" h-full text-black flex flex-col justify-center items-center">

        <div className="flex flex-col items-center justify-center  gap-3 ">
            <div className="text-[3rem] text-[#1F3A52] text-gradient-to-t from-[#1F3A52] to-[#4682B8] font-light">Get in touch with us</div>
            <div>We are here to help you through this difficult time. Reach out to us anytime</div>

        </div>
        <div>
            <div className="px-4">Send us an Email</div>
            <div className="h-[90%]  w-full  p-4">
                {/* form */}
                <div className="h-full w-full  rounded-md border flex items-center justify-between p-4">
                    <div className=' h-full w-1/2 '>
                        {/* inputs */}



                        <div className='h-[25%] flex gap-2 '>
                            <div><Input type='text' title='Name' required={true} /></div>
                            <div><Input type='text' title='Email Address' required={true} /></div>
                        </div>
                        <div className='h-[25%] flex gap-2'>
                            <div><Input type='number' title='Phone' required={false} /></div>
                            <div><Input type='text' title='Services' required={true} /></div>
                        </div>
                        <div className='h-[25%] '>
                            <div><Input type='textarea' title='Messages' required={true} /></div>
                        </div>
                        <div className='h-[25%]  flex items-center justify-items-start pt-3'>
                            <Button variantType='primary' size="lg" text='Send Message' onClick={() => console.log('message clicked')} />
                        </div>
                    </div>
                    <div className='h-full w-2/5 '>
                        <div className='h-50 w-full bg-white flex items-center justify-center text-black'>
                            <Image src="/getInTouch.png" alt="message us" height={200} width={200} />
                        </div>
                        <div className='text-center pt-3'>
                            ”Effortlessly reach out to us using our contact form. We're committed to responding within minutes, ensuring your queries are addressed swiftly and efficiently.”
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}   