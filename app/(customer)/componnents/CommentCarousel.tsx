"use client"
import React, {useEffect, useRef, useState} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination , Autoplay} from 'swiper/modules';
import {Quote, User} from "lucide-react";
import {Api} from "@/app/api/Api";
import {Skeleton} from "@/components/ui/skeleton";
import Image from "next/image";


export default function CommentCarousel() {
    const [ratting, setRatting] = useState<any[]>()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        Api.read("/api/ratting").then((values) => {
            setRatting(values)
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);
    return (

            <Swiper
                effect={'coverflow'}
                spaceBetween={5}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2500,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper w-full md:w-[680px]"
            >
                {
                    ratting?.map((items, index) => {
                        if(isLoading) {
                            return <SwiperSlide key={index} className={"items-center"}>
                                <Skeleton className={"md:w-[500px] h-[200px] w-full"} />
                            </SwiperSlide>
                        }
                        else if(ratting?.length == 0) {

                        return <div key={index} className={"w-auto flex flex-col space-y-5 self-center "}>
                                    <Image src={"/illustration/Empty-pana.svg"} alt={""}
                                           priority={true}
                                           quality={100}
                                           width={400}
                                           height={400}
                                           className={"bg-center self-center object-cover bg-cover"}
                                    />
                                    <h1 className={"text-center text-[40px] text-red-600"}>Vide!!</h1>
                                </div>

                        }
                        else {
                            return <SwiperSlide key={index}
                                                className={" flex items-center justify-center"}>
                                <div className={"flex space-x-5 md:w-[400px]"}>
                                    <div
                                        className={"flex items-center text-white justify-center w-[40px] h-[40px] rounded-full border"}>
                                        <User/>
                                    </div>

                                    <h1 className={"text-[20px] text-white font-bold"}>{items.user.firstName} {items.user.lastName} </h1>
                                </div>
                                <div
                                    className={"p-3 md:w-[500px] flex flex-col space-y-3 items-center justify-center  h-[200px] rounded-[50px] border border-3 border-white "}>
                                    <Quote className={"flex self-start text-white"}/>
                                    <div className={"text-white"}>
                                        {items.comment}
                                    </div>
                                    <Quote className={"flex self-end text-white"}/>

                                </div>
                            </SwiperSlide>
                        }
                    })
                }


            </Swiper>

    );
}
