"use client"
import * as Yup from "yup";
import { useFormik } from "formik";
import {useState} from "react";
import {Button, Input} from "antd";
import ImageUpload from "@/components/ImageUpload";
import {ArrowLeft, Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useRouter} from "next/navigation";
import {CategoryModel} from "@/models/CategoryModel";
import {Api} from "@/app/api/Api";
import {useToast} from "@/components/ui/use-toast";
const AddCategory = () => {
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {toast} = useToast();
    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("le nom de la categorie est obligatoire.")
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const categoryModel = new CategoryModel(values.name, image, true, true);
            const resp = await Api.create('/api/category', categoryModel);
            if(resp.ok) {
                toast({
                    title: "La catégorie a été ajouter avec succès"
                });
                setImage("");
                values.name= "";
            }
            else {
                toast({
                    title: "Une est survenue lors de l'ajout",
                    variant: "destructive"
                });
                setIsLoading(false);

            }
            setIsLoading(false);
        }
    })
    return(
            <div className={"mx-10"}>
                <section className={"flex justify-between content-between items-center"}>
                    <div className={"flex flex-col"}>
                        <h1 className={" text-[40px] font-bold"}>Ajouter une Categorie</h1>
                        <h1 className={" text-md md:text-[18px] font-light"}>Gestion des categories</h1>
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
                  className={"flex flex-col space-y-5 w-[300px]  mt-10"}
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

                <Button className={"bg-primaryColor"}
                        htmlType={"submit"}
                        size={"large"}
                        loading={isLoading}
                >
                    Enrégistrer
                </Button>
            </form>
        </div>
    )
}
export default AddCategory;