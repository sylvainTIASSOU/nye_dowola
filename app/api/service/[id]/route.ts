
import {CategoryModel} from "@/models/CategoryModel";
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import { ServiceModel } from "@/models/ServiceModel";


export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const service: ServiceModel = await req.json();
        const serviceValidate = Dto.serviceDto().validate(service);
        const serv = await prismadb.service.update({
            where: {id: id },
            data: serviceValidate.value
        });
        return NextResponse.json({
            services: serv,
            ok: true,
        });
    }catch (error) {
        console.error("[service_PUT]", error);
        return NextResponse.json({
            error: 'Internal error status: 500 ',
            ok: false,
        });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const serv = await prismadb.service.delete({
            where: { id: id }
        });

        return NextResponse.json({
            services: serv,
            ok: true,
        });
    } catch (error) {
        console.error('[DELET_CATEGORY]', error);
        return NextResponse.json({
            error: 'Internal error status: 500 ',
            ok: false,
        });    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const servvice = await prismadb.service.findUnique({
            where: { id },
            include: {
                category: true
            }
        });

        return NextResponse.json(servvice);
    } catch (error) {
        console.error('[getOne]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}