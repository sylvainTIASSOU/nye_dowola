"use client"
import React, { useState } from 'react';
import {Badge, Button, Drawer} from 'antd';
import {Bell} from "lucide-react";
import Image from "next/image"
const NotificationsCustomer = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div  onClick={showDrawer}>
                <Badge count={0} color='#faad14'>
                    <Bell className={" mt-2 dark:text-white"}/>
                </Badge>
            </div>
            <Drawer title="notifications" onClose={onClose} open={open}>
                <h1 className={"font-bold text-2xl"}>Notifications</h1>

                <div className={"flex self-center flex-col space-y-5 items-center justify-center"}>
                    <Image src={"/illustration/cloche.gif"}
                           alt={""}
                           width={150}
                           height={150}
                           className={"bg-cover bg-center"} />

                    <h1 className={"text-red-600 font-bold text-md"}>Oops!! cette fonctionnalité <br/> n'est pas encors disponible</h1>
                </div>
            </Drawer>
        </>
    );
}

export default NotificationsCustomer;