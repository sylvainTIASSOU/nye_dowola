"use client"

import Image from "next/image";
import {Button, Input} from "antd";
import {Instagram, Facebook, Linkedin} from "lucide-react";
import {FaFacebook, FaLinkedin, FaSquareInstagram, FaWhatsapp, FaXTwitter} from "react-icons/fa6";
import Link from "next/link";
import {IoLogoWhatsapp, IoMailSharp} from "react-icons/io5";
import emailjs from '@emailjs/browser';
import {LegacyRef, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";


const siteMap = [
    "A propos",
    "categories",
    "services"
];

const help = [
    "Etat du reseau",
    "FAQ",
    "Nous contacter"
];

const reseau = [
    {
        icon: <FaSquareInstagram />,
        link: "https://www.instagram.com/sylvtias?igsh=NGtjMWtlMnV5dW5o"
    },
    {
        icon: <FaFacebook />,
        link: "https://www.facebook.com/sylvain.tiassou.1"
    },
    {
        icon: <FaXTwitter />,
        link: "https://x.com/STiassou?t=1HMFMzSxdtbgW9QG3aA_ww&s=08"
    },
    {
        icon: <FaLinkedin />,
        link: "https://www.linkedin.com/in/sylvain-tiassou-444b9b26a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
        icon: <IoMailSharp />,
        link: "tiassousylvain6120@gmail.com"
    },

    {
        icon: <IoLogoWhatsapp />,
        link: "https://wa.me/qr/F4O5UACE4RTXE1"
    },

]
const FooterCustomer = () => {
    const currentYear = new Date().getFullYear();
    const form = useRef<HTMLFormElement>();
    const { toast } = useToast()

    //fonction to send email
    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm( "service_ne8iyfu" ,  "template_hpb9r8j", form.current!, {publicKey: 'zU_9B3POaiaWspEr4',})
            .then((result) => {
                toast({
                    description: "Email envoyer avec succès",
                })
            }, () => {
                toast({
                    variant: 'destructive',
                    description: "Un problème est survenu lors de l'envoi de l'email",

                })
            });
    };

    return(<main className={"relative bottom-0 mt-10 md:p-5 p-3 bg-cyan-50"}>
            <div
                className={" flex flex-col space-y-10 space-x-0 md:space-y-0 md:flex-row md:space-x-10 items-center justify-center"}>
                <Image src={"/illustration/3d-casual-life-cleaning-service.png"} alt={""}
                       priority={true}
                       quality={100}
                       width={250}
                       height={250}
                       className={" bg-center self-center object-cover bg-cover"}
                />

                <div className={"flex flex-col space-y-5"}>
                    <div className={"flex  justify-between content-between md:flex-row md:space-x-10"}>
                        {/*plat du site*/}
                        <div>
                            <h1 className={"font-bold mb-1 text-black"}>Plan du site</h1>
                            <div className={"flex flex-col space-y-3 font-light"}>
                                {
                                    siteMap.map((items, index) => {
                                        return <h1 key={index} className={"text-black"}>
                                            {items}
                                        </h1>
                                    })
                                }
                            </div>
                        </div>

                        {/*help */}
                        <div>
                            <h1 className={"font-bold mb-1 text-black"}>Aide</h1>
                            <div className={"flex flex-col space-y-3 font-light"}>
                                {
                                    help.map((items, index) => {
                                        return <h1 key={index} className={"text-black"}>
                                            {items}
                                        </h1>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/*reseau*/}
                    <div className={"flex space-x-5"}>
                        {
                            reseau.map((items, index) => {
                                return <Link href={items.link} key={index} className={"text-black"}>
                                    {items.icon}
                                </Link>
                            })
                        }
                    </div>

                </div>


                {/*contact as*/}
                <div>
                    <h1>Nous Contacté</h1>
                    <form ref={form as LegacyRef<HTMLFormElement> } onSubmit={sendEmail} className={"flex flex-col space-y-3 md:flex-row md:space-x-3"}>


                        <div className={"flex flex-col space-y-3 "}>
                            <Input type={"text"}
                                   name={"name"}
                                   placeholder={"Votre nom"}
                                   required
                                   className={" md:w-[350px]"}

                            />
                            <Input type={"email"}
                                   name={"email"}
                                   placeholder={"Votre email"}
                                   required
                                   className={" md:w-[350px]"}

                            />
                            <Input type={"text"}
                                   name={"content"}
                                   placeholder={"Entrez votre message"}
                                   className={"h-[100px] md:w-[350px]"}
                            />


                        </div>
                        <Button htmlType={"submit"} className={"md:self-end"}>
                            Envoyer
                        </Button>

                    </form>
                </div>


            </div>

            <div className={"mt-5  items-center md:mx-10 flex justify-between content-between"}>
                <div className={"text-red-600"}>&copy; {currentYear} <span className={"text-secondaryColor"}>Tous droits réservés</span> </div>

                <Image src={"/icons/logo2.svg"} alt={""}
                       priority={true}
                       quality={100}
                       width={150}
                       height={150}
                       className={" bg-center self-center object-cover bg-cover"}
                />
            </div>
        </main>
    );
}
export default FooterCustomer;