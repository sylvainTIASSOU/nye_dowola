"use client"
import React, {useEffect, useState} from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Api} from "@/app/api/Api";
import {HistoryInterface} from "@/models/ServiseProviderInterface";
import { Select } from 'antd';
import {AppointmentModel} from "@/models/AppointmentModel";
import {useRouter} from "next/navigation"
import {useToast} from "@/components/ui/use-toast";
interface DataType {
    key: string;
    name: string;
    nameService: string;
    appointementDate: string;
    appointementHours: string;
    address: string;
    status: string;
    userId: string;
}


export default function Reservations() {
    const [books, setBooks] = useState<HistoryInterface[]>([]);
    const uid = useSelector((state: RootState) => state.authReducer.value.uid);
    const [tableData, setTableData] = useState<DataType[]>([]);
    const router = useRouter();
    const {toast} = useToast();

    useEffect(() => {
        
        Api.create(`/api/appointment/findByProviderId/6`, {status: "planifier"}).then((values: any[]) => {
            const newData: DataType[] = []

            values.forEach((ele: any) => {
                newData.push({
                    key: ele.id,
                    name: ele.user.firstName,
                    nameService: ele.provider.service.serviceName,
                    appointementDate: ele.appointmentDate,
                    appointementHours: ele.appointmentHours,
                    address: ele.address,
                    status: ele.appointmentStatus,
                    userId: ele.userId,
                });

            })
            setTableData(newData);
        })

    }, []);


    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Service',
            dataIndex: 'nameService',
            key: 'nameService',
        },
        {
            title: 'Date du rendez-vous',
            dataIndex: 'appointementDate',
            key: 'appointementDate',
        },
        {
            title: 'Heure du rendez-vous',
            dataIndex: 'appointementHours',
            key: 'appointementHours',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text:any) => (<span className={text=="termine" ? "bg-red-600 text-white p-2 rounded-sm" : "bg-lime-600 text-white p-2 rounded-sm"}>{text}</span>),
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
                        onChange={async (value: string) => {
                            const appointmentModel = new AppointmentModel(record.appointementDate, record.appointementHours, record.address, value, Number(uid), Number(record.userId), Number(record.key));
                            const respons = await Api.update(`/api/appointment/${record.key}`, appointmentModel);
                            if(respons.ok) {
                                toast({
                                    title: "Le rendez-vous a à été bien mise a jour!!"
                                });
                                router.refresh();
                            }
                            else {
                                toast({
                                    title: "Une erreur est survénu lors de la mise a jour!!",
                                    variant: "destructive"
                                });
                            }


                        }}
                        options={[
                            {
                                value: 'termine',
                                label: 'terminer',
                            },
                            {
                                value: 'enCours',
                                label: 'En cours',
                            },
                        ]}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className={"w-full"}>
            <Table columns={columns} dataSource={tableData} />
        </div>
    );
}