import {UserModel} from "@/models/UserModel";
import Joi from "joi";

export class Dto {
     static userDto() {
        const shema = Joi.object({
             firstName: Joi.string().required(),
             lastName: Joi.string().required(),
            address: Joi.string().required(),
            role: Joi.string().required(),
             email: Joi.string().email().required(),
             phone: Joi.number().required().integer(),
             passwords: Joi.string().required(),
             imageUrl: Joi.string().optional(),
            isVisible: Joi.boolean().optional(),
            isActive: Joi.boolean().optional()
     });
        return shema;
    }

    static loginDto() {
         const shema = Joi.object({
             phone: Joi.number().required().integer(),
             passwords: Joi.string().required(),
         })

        return shema;
    }

    static categoryDto() {
         const schema = Joi.object({
             categoryName: Joi.string().required(),
             imageUrl: Joi.string().required(),
             isVisible: Joi.boolean().optional(),
             isActive: Joi.boolean().optional()
         })
        return schema;
     }

    static serviceDto() {
        const schema = Joi.object({
            serviceName: Joi.string().required(),
            description: Joi.string().required(),
            imageUrl: Joi.array<string>().required(),
            categoryId: Joi.number().required(),
            isVisible: Joi.boolean().optional(),
            isActive: Joi.boolean().optional()
        })
        return schema;
    }

    static providerDto() {
        const schema = Joi.object({
            availability: Joi.string().required(),
            estimatedDuration: Joi.number().required(),
            tarif: Joi.number().required(),
            userId: Joi.number().required(),
            serviceId: Joi.number().required(),
            isVisible: Joi.boolean().optional(),
            isActive: Joi.boolean().optional(),
        })
        return schema;
    }

    static appointmentDto() {
        const schema = Joi.object({
            appointmentDate: Joi.string().required(),
            appointmentHours: Joi.string().required(),
            address: Joi.string().required(),
            appointmentStatus: Joi.string().required(),
            providerId: Joi.number().required(),
            userId: Joi.number().required(),
        })
        return schema;
    }

    static paiementDto() {
        const schema = Joi.object({
            amount: Joi.number().required(),
            paymentDate: Joi.string().required(),
            paymentStatus: Joi.string().required(),
            customerId: Joi.number().required(),
            appId: Joi.number().required(),
        })
        return schema;
    }

    static rattingDto() {
        const schema = Joi.object({
            comment: Joi.string().required(),
            note: Joi.number().required(),
            userId: Joi.number().required(),
            appId: Joi.number().required(),
            isVisible: Joi.boolean().optional(),
            isActive: Joi.boolean().optional(),
        })
        return schema;
    }
}