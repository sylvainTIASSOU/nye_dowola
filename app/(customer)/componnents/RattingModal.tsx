import React, { useState } from 'react';
import {Input, Modal} from 'antd';
import {Button} from "@/components/ui/button";
import * as Yup from "yup";
import { useFormik } from "formik";
import {RattingModel} from "@/models/RattingModel";
import {Api} from "@/app/api/Api";
import {useToast} from "@/components/ui/use-toast";
import {MessageCircleHeart} from "lucide-react";

interface RattingInter {
    userId: number;
    appId: number;
}
const RattingModal = (
    {userId, appId} : RattingInter
) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {toast} = useToast()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            content: ""
        },
        onSubmit: async (values) => {
            const rattingModel = new RattingModel(values.content, 1, true, true, userId, appId);
            const resp = await Api.create('/api/ratting', rattingModel);
            if(resp.ok) {
                handleCancel();
                toast({
                    title: "Merci d'avoir donner votre avis!!"
                })
            }
            else {
                toast({
                    title: "Une erreur est survénu lors de l'envoi",
                    description: "Réessayer",
                    variant: "destructive"
                })
            }
        }
    })

    return (
        <>
            <Button size={"sm"} variant={"outline"}
                    className={"ml-3 text-white bg-secondaryColor"}
                    onClick={showModal}>
                <MessageCircleHeart />
            </Button>
            <Modal title="Commentaire sur le service fourni" open={isModalOpen} onCancel={handleCancel}>
                <form onSubmit={formik.handleSubmit} className={"flex flex-col space-y-5"}>
                    <Input type={"text"} name={"content"}
                           value={formik.values.content}
                           className={"h-[100px]"}
                           required
                           onChange={formik.handleChange}
                    />

                    <Button size={"sm"} type={"submit"} className={"self-end w-[100px]"}>Envoyer</Button>
                </form>
            </Modal>
        </>
    );
};

export default RattingModal;
