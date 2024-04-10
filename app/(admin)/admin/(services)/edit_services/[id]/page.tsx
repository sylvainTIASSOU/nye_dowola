"use client"
import * as Yup from "yup";
import { useFormik } from "formik";
import {useEffect, useState} from "react";
import {Button, Input, SelectProps} from "antd";
import ImageUpload from "@/components/ImageUpload";
import {ArrowLeft, Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useRouter} from "next/navigation";
import {CategoryModel} from "@/models/CategoryModel";
import {Api} from "@/app/api/Api";
import {useToast} from "@/components/ui/use-toast";
import { Select } from 'antd';
import {ServiceModel} from "@/models/ServiceModel";

import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';


let ImagesArray: string[] = [];
const initialOptions: SelectProps['options'] = undefined;

const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const removeInArray = (array: any[], element: any) =>{
    const newArray = array.filter(item => item !== element);
    if(array.length != newArray.length) {
        return true;
    }
    else
        return false;
}

let categoryArray: SelectProps['options'] = [];

const EditService = ({params}: {params: {id: string}}) => {
    const [catId, setCatId] = useState("")
    const [image, setImage] = useState("");
    const [images2, setImages2] = useState<string>('');
    const [images3, setImages3] = useState<string>('');
    const [images4, setImages4] = useState<string>('');
    const [imagesArrays, setImagesArrays] = useState<string[]>([])
    const [categoryArrays, setCategoryArrays] = useState<SelectProps['options']>(initialOptions);
    const [active, setActive] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(true);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {toast} = useToast();

    useEffect(() => {
        const fetchServ = async () => {
            try {
                const  serv: ServiceModel = await Api.read(`/api/service/${params.id}`)
                const initialaVal = {
                    serviceName: serv.serviceName || '',
                    description: serv.description || '',
                    categoryId: String(serv.categoryId) || '',
                }
                setImagesArrays(serv.imageUrl);
                formik.setValues(initialaVal);
            }
            catch (error) {
                console.error(error)
            }
        }


        Api.read("/api/category").then((cats: any[]) => {
            const newCategory: SelectProps['options'] = [];
            cats.forEach((element: CategoryModel) => {
                newCategory.push({
                    value: element.id,
                    label: element.categoryName,
                })
            })
            setCategoryArrays(newCategory);
        })
        fetchServ();
    }, []);

    const formik = useFormik({
        initialValues: {
            serviceName: "",
            description: "",
            categoryId: "",
        },
        validationSchema: Yup.object({
            serviceName: Yup.string().required("Le nom du service est obligatoire."),
            description: Yup.string().required('La description est obligatoire,'),
            categoryId: Yup.number().integer().required("La catégorie est obligatoire")
        }),

        onSubmit: async (values) => {
            setIsLoading(true)

            const serviceModel = new ServiceModel(values.serviceName, values.description, ImagesArray, Number(values.categoryId), visible, active);
            const resp = await Api.update(`/api/service/${params.id}`, serviceModel)
            if(resp.ok) {
                toast({
                    title: "Le service a été mise a jours avec succès"
                });
            }
            else {
                toast({
                    title: "Une erreur est survenu lors de la mise a jours",
                    variant: "destructive"
                });
                setIsLoading(false)
            }

            setIsLoading(false)
        }
    })

    const onChangeActive: CheckboxProps['onChange'] = (e) => {
        setActive(e.target.checked);
    };

    const onChangeVisible: CheckboxProps['onChange'] = (e) => {
        setVisible(e.target.checked);
    };
    // @ts-ignore
    // @ts-ignore
    return(
        <div className={"mx-10 pb-20"}>
            <section className={"flex justify-between content-between items-center"}>
                <div className={"flex flex-col"}>
                    <h1 className={" text-[40px] font-bold"}>Editer une Service</h1>
                    <h1 className={" text-md md:text-[18px] font-light"}>Gestion des Service</h1>
                </div>

                <Button className={"flex space-x-2 text-secondaryColor"}
                        type={"dashed"}
                        onClick={() => {
                            router.push("/admin/services");
                        }}

                >
                    <ArrowLeft/>
                    <h1></h1>
                </Button>
            </section>

            <Separator className={"mt-5 w-full "}/>

            <form onSubmit={formik.handleSubmit} className={"mt-10 flex flex-col space-y-5"}>
                {/*image form*/}
                <div className={"flex flex-col"}>
                    <label>Choisiser les images</label>
                    <div className={"flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-5"}>
                        {
                            imagesArrays.map((element, index) => {
                                return <div key={index}>
                                    <ImageUpload
                                        value={image!="" ? image : element}
                                        disable={isLoading}
                                        onChange={(url) => {

                                            setImage(url);
                                            if (url != "") {
                                                ImagesArray.push(url)
                                            }

                                        }}
                                        onRemove={() => {
                                            const result = removeInArray(ImagesArray, image);
                                            if (result) {
                                                setImage("");
                                            }
                                        }}

                                    />
                                </div>
                            })
                        }

                    </div>
                </div>

                <div className={"md:w-[400px] flex flex-col space-y-5"}>
                    {/*name form*/}
                    <div className={"flex flex-col"}>
                        <label
                            className={formik.touched.serviceName && formik.errors.serviceName ? "text-red-600" : ""}>
                            {
                                formik.touched.serviceName && formik.errors.serviceName ? formik.errors.serviceName : " Nom du service"
                            }
                        </label>
                        <Input type={"text"}
                               name={'serviceName'}
                               value={formik.values.serviceName}
                               onChange={formik.handleChange}
                        />
                    </div>

                    {/*description form*/}
                    <div className={"flex flex-col"}>
                        <label
                            className={formik.touched.description && formik.errors.description ? "text-red-600" : ""}>
                            {
                                formik.touched.description && formik.errors.description ? formik.errors.description : "Description"
                            }
                        </label>
                        <Input type={"text"}
                               name={'description'}
                               value={formik.values.description}
                               onChange={formik.handleChange}
                               className={'h-[100px]'}
                        />
                    </div>

                    {/*selt form*/}
                    <div className={"flex flex-col"}>
                        <label>Selectionner la catégorie</label>

                        <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onSelect={(value) => {
                                formik.values.categoryId = value
                            }}

                            filterOption={filterOption}
                            options={categoryArrays as {label: string; value: string; }[] }
                        />
                    </div>

                    <div className={"flex justify-between content-between"}>
                        <Checkbox defaultChecked={active} onChange={onChangeActive}
                                  className={"dark:text-white"}>Activer</Checkbox>
                        <Checkbox defaultChecked={visible} onChange={onChangeVisible}
                                  className={"dark:text-white"}>Visible</Checkbox>
                    </div>

                    <Button htmlType={"submit"} size={"large"} loading={isLoading} className={"bg-primaryColor"}>
                        Enregister
                    </Button>
                </div>

            </form>

        </div>
    )
}
export default EditService;