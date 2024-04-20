"use client"

import React, {useEffect, useState} from "react";
import {Api} from "@/app/api/Api";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Select } from 'antd';
import {AppointmentModel} from "@/models/AppointmentModel";
import {useToast} from "@/components/ui/use-toast";
import {ProviderModel} from "@/models/ProviderModel";
import {useRouter} from "next/navigation"
import {useDispatch} from "react-redux";
import {activate, desactivate} from "@/redux/features/activation_slice";


interface ProviderInter {
    key: string;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    tarif: string;
    serviceName: string;
    status: string;
    availability: string;
    estimatedDuration: number;
    userId: number;
    serviceId: number;
    isVisible?: boolean;
    isActive?: boolean;
}


export default function Prestataires() {
    const [prestataireData, setPrestataireData] = useState<ProviderInter[]>([])
    const {toast} = useToast();
    const router = useRouter();
    const dispatch = useDispatch();


    useEffect(() => {
        Api.read('/api/provider').then((values: any[]) => {
            const newData: ProviderInter[] = [];
            values.forEach((ele: any) => {
                newData.push({
                    key: ele.id,
                    email: ele.user.email,
                    firstName: ele.user.firstName,
                    lastName: ele.user.lastName,
                    phone: ele.user.phone,
                    serviceName: ele.service.serviceName,
                    tarif: ele.tarif,
                    status: ele.isActive == true ? "active": "désactiver",
                    availability: ele.availability,
                    estimatedDuration: ele.estimatedDuration,
                    userId: ele.userId,
                    serviceId: ele.userId,
                    isVisible: ele.isVisible,
                    isActive: ele.isActive,
                })
            });

            setPrestataireData(newData);
        })
    }, []);


    const columns: TableProps<ProviderInter>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'lastName',
            key: 'lastName',

        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',

        },
        {
            title: 'Nom du service',
            dataIndex: 'serviceName',
            key: 'serviceName',

        },

        {
            title: 'tarif',
            dataIndex: 'tarif',
            key: 'tarif',

        },

        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (text:any) => (<span className={text=="désactiver" ? "bg-red-600 text-white p-2 rounded-sm" : "bg-lime-600 text-white p-2 rounded-sm"}>{text}</span>),

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Select
                        showSearch
                        placeholder="Changer la status"
                        optionFilterProp="children"
                        onChange={async (value: boolean) => {
                            const providerModel = new ProviderModel(record.availability, record.estimatedDuration, Number(record.tarif), Number(record.userId), Number
                            (record.serviceId), record.isVisible, value);
                            const resp = await Api.update(`/api/provider/${record.key}`,  providerModel)
                            if(resp.ok) {
                                if(value){
                                    dispatch(activate(true))
                                }else{
                                    dispatch(desactivate())
                                }
                                toast({
                                    title: "prestatteur Activé "
                                });
                                router.refresh()
                            }
                            else{
                                toast({
                                    title: "Problème survénue",
                                    variant: "destructive"
                                })
                            }
                            console.log(value)
                        }}
                        options={[
                            {
                                value: true,
                                label: 'Activer',
                            },
                            {
                                value: false,
                                label: 'Désactiver',
                            },
                        ]}
                    />
                </Space>
            ),
        },
    ]
    return(
        <div className={"w-full"}>
            <h1 className={"text-[30px]"}>Pestataires</h1>
            <Table columns={columns} dataSource={prestataireData} />
        </div>
    )
}