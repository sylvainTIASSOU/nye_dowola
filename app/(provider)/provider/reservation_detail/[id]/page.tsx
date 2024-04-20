"use client"
import React, {useEffect, useState} from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Api} from "@/app/api/Api";
import {HistoryInterface} from "@/models/ServiseProviderInterface";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
export default function ReservationDetail({params}: {params: {id: string}}) {
    const [books, setBooks] = useState<HistoryInterface[]>([]);
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)

    useEffect(() => {
        Api.create(`/api/appointment/findByCustomerId/2`, {status: "planifier"}).then((values: any[]) => {
            console.log(values);
            const newValues: HistoryInterface[] = [];
            values.forEach((ele) => {
                newValues.push({
                    id: ele.id,
                    address: ele.address,
                    date: ele.appointmentDate,
                    hours: ele.appointmentHours,
                    providerName: ele.provider.user.firstName,
                    serviceName: ele.provider.service.serviceName,
                    serviceImage: ele.provider.service.imageUrl[0]
                })
            })
            setBooks(newValues)
        })

        console.log(books);
    }, []);
    return (
        <div className={"w-full"}>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}