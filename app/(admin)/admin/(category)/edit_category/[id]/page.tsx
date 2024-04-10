"use client"
import * as Yup from "yup";
import { useFormik } from "formik";
import {useEffect, useState} from "react";
import {Button, Input} from "antd";
import ImageUpload from "@/components/ImageUpload";
import {ArrowLeft, Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useRouter} from "next/navigation";
import {CategoryModel} from "@/models/CategoryModel";
import {Api} from "@/app/api/Api";
import {useToast} from "@/components/ui/use-toast";

import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
const EditCategory = ({params}: {params: {id: string}}) => {
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {toast} = useToast();
    const [categories, setCategories] = useState<CategoryModel>()
    const [active, setActive] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const cat: CategoryModel = await Api.read(`/api/category/${params.id}`);
                setCategories(cat);
                const initialVal = {
                    name: cat.categoryName || '',
                };
                setImage(cat.imageUrl);
                setVisible(Boolean(cat.isVisible));
                setActive(Boolean(cat.isActive));
                formik.setValues(initialVal);
            }catch (error) {
                console.error("Error fetching category data:", error);
            }
        };
        fetchCat();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("le nom de la categorie est obligatoire.")
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const categoryModel = new CategoryModel(values.name, image, Boolean(visible), Boolean(active));
            const resp = await Api.update(`/api/category/${params.id}`, categoryModel);
            if(resp.ok) {
                toast({
                    title: "La catégorie a été modifier avec succès"
                });
                setImage("");
                values.name= "";
            }
            else {
                toast({
                    title: "Une est survenue lors de la modification",
                    variant: "destructive"
                });
                setIsLoading(false);

            }
            setIsLoading(false);
        }
    })

    const onChangeActive: CheckboxProps['onChange'] = (e) => {
        setActive(e.target.checked);
    };

    const onChangeVisible: CheckboxProps['onChange'] = (e) => {
        setVisible(e.target.checked);
    };
    return(
            <div className={"mx-10"}>
                <section className={"flex justify-between content-between items-center"}>
                    <div className={"flex flex-col"}>
                        <h1 className={"text-[40px] font-bold"}>Editer la Categorie</h1>
                        <h1 className={"text-[18px] font-light"}>Gestion des categories</h1>
                    </div>

                    <Button className={"flex space-x-2 text-secondaryColor"}
                            type={"dashed"}
                            onClick={() => {
                                router.push("/admin/categories");
                            }}

                    >
                        <ArrowLeft />
                        <h1></h1>
                    </Button>
                </section>

                <Separator className={"mt-5 w-full "} />
            <form onSubmit={formik.handleSubmit}
                  className={"flex flex-col space-y-5 w-[300px] mt-10"}
            >
                <div className={"flex flex-col"}>
                    <label>Image de la catégorie</label>
                    <div>
                        <ImageUpload
                            value={image}
                            disable={isLoading}
                            onChange={(url: string) => {
                                if (url != "") {
                                    setImage(url);
                                }

                            }}
                            onRemove={() => {
                                    setImage("");
                            }}

                        />
                    </div>
                </div>

                <div className={"flex flex-col"}>
                    <label className={formik.touched.name && formik.errors.name ? "text-red-600" : ""}>
                        {
                            formik.touched.name && formik.errors.name ? formik.errors.name : "Nom de la catégorie"
                        }
                    </label>

                    <Input
                        type={"text"}
                        name={"name"}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className={""}
                    />
                </div>

                <div className={"flex justify-between content-between"}>
                    <Checkbox defaultChecked={active} onChange={onChangeActive} className={"dark:text-white"}>Activer</Checkbox>
                    <Checkbox defaultChecked={visible} onChange={onChangeVisible} className={"dark:text-white"}>Visible</Checkbox>
                </div>

                <Button className={"bg-primaryColor"}
                        htmlType={"submit"}
                        size={"large"}
                        loading={isLoading}
                >
                    Modifier
                </Button>
            </form>
        </div>
    )
}
export default EditCategory;