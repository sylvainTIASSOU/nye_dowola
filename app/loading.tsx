import Image from "next/image";

export default function Loading() {
    return <div className={"flex h-screen items-center justify-center"}>

        <Image src={"/icons/logo.gif"}
               alt={""}
               priority={true}
               quality={100}
               width={500}
               height={500}
               className={"object-cover bg-center"}/>
    </div>
}