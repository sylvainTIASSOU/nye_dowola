"use client"

import Confetti from 'react-confetti'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export default function Congratulation() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const router = useRouter()

    useEffect(() => {
            setHeight(window.innerWidth)
            setWidth(window.innerHeight)
    }, );
    return(
        <main className={"flex flex-col md:my-2 my-0 space-y-5 items-center justify-center  mx-3 md:mx-20  "}>
            <Confetti
                width={width}
                height={height}
            />
            <Image src={"/illustration/Business merger-rafiki.svg"}
                   alt={""}
                   width={400}
                   height={400}
                   priority={true}
                   quality={100}
                   className={" w-full md:w-[400px] "}
            />

            <div className={"w-full"}>
                <h1 className={"text-center font-bold text-[40px] text-cyan-600"}>
                    Félicitations ! <br/>
                    Votre réservation est confirmée.
                </h1>

                <h1 className={"text-[15px] text-center "}>
                    Nous sommes ravis de vous informer que votre réservation a été confirmée avec succès ! Vous avez pris une excellente décision en choisissant <span className={"font-bold text-xl text-secondaryColor"}> Nyé Dowola</span> pour vos besoins en services à domicile. <br/>

                    Un e-mail de confirmation vous a été envoyé avec tous les détails de votre réservation. Vous pouvez également consulter vos réservations à tout moment en vous connectant à votre compte sur notre site web. <br/>

                    Nous tenons à vous remercier de votre confiance. Notre équipe de professionnels est impatiente de répondre à vos besoins et de vous offrir une expérience exceptionnelle.
                </h1>
            </div>

            <div>
                <Button size={"sm"}
                        onClick={() => {
                            router.push("/history")
                        }}
                        className={"bg-secondaryColor"}>Continuez vers votre Historique</Button>
            </div>


        </main>
    )
}