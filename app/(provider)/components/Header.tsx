"use client"

import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return(
        <Link href={'/'} className={'w-full flex items-center justify-center mt-[2%] '}>
            <Image src={"/icons/logo1.svg"}
                   alt={"login image"}
                   priority={true}
                   width={400}
                   height={400}
                   className={"bg-cover bg-center bg-content "}
            />
        </Link>
    )
}
export default Header;