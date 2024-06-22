"use client";

import {Button, Input, Select, SelectProps} from "antd";
import {useEffect, useState} from "react";
import {Api} from "@/app/api/Api";
import {ServiceModel} from "@/models/ServiceModel";
import * as Yup from "yup";
import { useFormik } from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {ProviderModel} from "@/models/ProviderModel";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {activateProcess} from "@/redux/features/process-slice";

const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
export default function Setting() {
    const [isLoading, setIsLoading] = useState(false);
    const [serviceArray, setServiceArray] = useState<SelectProps['options']>()
    const uid = useSelector((state: RootState) => state.authReducer.value.uid);
    const { toast } = useToast();
    const route = useRouter();
    const dispatch = useDispatch();


    useEffect(() => {
        Api.read("/api/service").then((serv: any[]) => {
            const newService: SelectProps['options'] = [];
            serv.forEach((element: ServiceModel) => {
                newService.push({
                    value: element.id,
                    label: element.serviceName
                });
                setServiceArray(newService);
            })
        })
    }, []);

    const formik = useFormik({
        initialValues: {
            availability: "",
            estimatedDuration: "",
            tarif: "",
            userId: "",
            serviceId: "",
        },
        validationSchema: Yup.object({
            availability: Yup.string().required("Votre disponibilité est requise") ,
            estimatedDuration: Yup.number().required("La durée est requise") ,
            tarif: Yup.number().integer('Entrer une tarif valide').required("La tarif est requise"),
            serviceId: Yup. number().integer("Entrer une valeur valide").required('les type de service est requise'),
        }),

        onSubmit: async (values) => {
            setIsLoading(true)
            const providerModel = new ProviderModel(values.availability, Number(values.estimatedDuration), Number(values.tarif), Number(uid), Number(values.serviceId), true, true);
            const resp = await Api.create("/api/provider", providerModel);

            if (resp.ok) {
                toast({
                    title: "Informations Enrégistrer avec succès."
                });
                dispatch(activateProcess(true));
                route.push('/provider/profil')
            }
            else {
                toast({
                    title: "Une erreur est survenu lors de l'enregistrement.",
                    variant: "destructive"
                });
                setIsLoading(false)
            }
            setIsLoading(false)
        }
    })
    return (
        <div className={"w-full h-screen flex items-center justify-center"}>
            <form onSubmit={formik.handleSubmit} className={" md:w-[600px] flex flex-col space-y-5"}>
                <h1 className={"font-bold text-[30px]"}>Complecter votre profil</h1>
                <h1 className={"text-center"}>Les champs précédés de * son obligatoire</h1>
                <div className={"flex flex-col "}>
                    <label className={formik.touched.availability && formik.errors.availability ? "text-red-600" : ""}>
                        {
                            formik.touched.availability && formik.errors.availability ? formik.errors.availability : "Disponibilité"
                        }

                        <span className={"text-red-600"}>*</span>
                    </label>
                    <Input type={"text"}
                           value={formik.values.availability}
                           name={"availability"}
                           onChange={formik.handleChange}
                           placeholder={"ex: De lundi a samédi: 8h à 18h"}

                    />
                </div>

                <div className={"flex flex-col "}>
                    <label className={formik.touched.estimatedDuration && formik.errors.estimatedDuration? "text-red-600 ": ""}>
                        {
                            formik.touched.estimatedDuration && formik.errors.estimatedDuration ? formik.errors.estimatedDuration: "Estimer la duré de votre travail"
                        }
                        <span className={"text-red-600"}>*</span> </label>
                    <Input type={"text"}
                           value={formik.values.estimatedDuration}
                           name={"estimatedDuration"}
                           onChange={formik.handleChange}
                           placeholder={"ex: 4"}
                    />
                </div>

                <div className={"flex flex-col "}>
                    <label className={formik.touched.tarif && formik.errors.tarif ? "text-red-600": ""}>
                        {
                            formik.touched.tarif && formik.errors.tarif ? formik.errors.tarif : "Votre Tarif pour un travail (en franc CFA)"
                        }
                        <span className={"text-red-600"}>*</span>
                </label>
                <Input type={"tel"}
                       value={formik.values.tarif}
                       name={"tarif"}
                       onChange={formik.handleChange}
                       placeholder={"ex: 30000"}
                    />
                </div>

                {/*selt form*/}
                <div className={"flex flex-col"}>
                    <label>Selectionner le type de service <span className={"text-red-600"}>*</span> </label>

                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onSelect={(value) => {
                            formik.values.serviceId = value;
                        }}

                        filterOption={filterOption}
                        options={serviceArray as {label: string; value: string; }[]}
                    />
                </div>

                <Button htmlType={"submit"} size={"large"} loading={isLoading} className={"bg-primaryColor w-[150px] self-end"}>
                    Continuer
                </Button>
            </form>
        </div>
    );
}

