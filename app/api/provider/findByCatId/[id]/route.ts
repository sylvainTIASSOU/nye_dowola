
import {CategoryModel} from "@/models/CategoryModel";
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import { ServiceModel } from "@/models/ServiceModel";
import {ProviderModel} from "@/models/ProviderModel";



export async function GET(req: Request, { params  }: { params: {id: string}}) {

    try {

        const id = Number(params.id);


        const prov = await prismadb.provider.findMany({
            where: {
                isActive: true,
                service: {
                    category: {
                        id: id,
                    },
                },
            },
            include: {
                user: true,
                service: {
                    include: {
                        category: true
                    }
                },
            },
        });

        return NextResponse.json(prov);
    } catch (error) {
        console.error('[getOne]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}