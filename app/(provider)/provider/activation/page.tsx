"use client"
import Image from "next/image"
import {Button} from "@/components/ui/button";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useRouter} from 'next/navigation';

export default function Activation() {
    const process = useSelector((state: RootState) => state.processReducer.value.inProcessing)
    const router = useRouter();
    return(
        <div className={"w-full h-screen flex items-center justify-center"}>
            <div className={"bg-white w-[300px] h-[300px] p rounded-md flex flex-col space-y-5 items-center justify-center"}>
                <Image src={"/images/shield-check.png"}
                       alt={""}
                       width={100}
                       height={100}
                       className={"bg-cover b-center"} />

                {
                    process ?
                        <h1 className={"font-bold text-orange-600"}>Demande en cours de traitement</h1>
                        :
                        <h1 className={"font-bold text-red-600"}>Compte inactif</h1>
                }


                <Button type={"button"} size={"sm"}
                        variant={"destructive"}
                        className={""}
                        onClick={() => {
                            router.push('/provider/settings');
                        }}

                >
                    Activer Votre compte
                </Button>
            </div>
        </div>
    )
}