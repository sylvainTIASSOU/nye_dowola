import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import {ServiceModel} from "@/models/ServiceModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const serviceModel: ServiceModel = body;
        const dataValidate = Dto.serviceDto().validate(serviceModel);

        const serv = await prismadb.service.create({data: dataValidate.value});

        return NextResponse.json({
            service: serv,
            ok: true
        });
    } catch (error) {
        console.error('[user_post]', error);
        return NextResponse.json({
            errors: 'Internal error {status: 500}',
            ok: false
        });
    }
}
    export async function GET() {
        try {
            const service = await prismadb.service.findMany({
                include: {
                    category: true
                }
            });
            return NextResponse.json(service);
        } catch (error) {
            console.error('[getUsers]', error);
            return new NextResponse('Internal error', {status: 500});
        }
    }
