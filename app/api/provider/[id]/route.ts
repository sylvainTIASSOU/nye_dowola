
import {CategoryModel} from "@/models/CategoryModel";
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import { ServiceModel } from "@/models/ServiceModel";
import {ProviderModel} from "@/models/ProviderModel";


export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const provider: ProviderModel = await req.json();
        const providerValidate = Dto.providerDto().validate(provider);
        const prov = await prismadb.provider.update({
            where: {id: id },
            data: providerValidate.value
        });
        return NextResponse.json({
            providers: prov,
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
        const prov = await prismadb.provider.delete({
            where: { id: id }
        });

        return NextResponse.json({
            services: prov,
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
        const prov = await prismadb.provider.findUnique({
            where: { id },
            include: {
                user: true,
                service: {
                    include: {
                        category: true
                    }
                },
            }
        });

        return NextResponse.json(prov);
    } catch (error) {
        console.error('[getOne]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}