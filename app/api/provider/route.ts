import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import {ServiceModel} from "@/models/ServiceModel";
import {ProviderModel} from "@/models/ProviderModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const providerModel: ProviderModel = body;
        const dataValidate = Dto.providerDto().validate(providerModel);

        const prov = await prismadb.provider.create({data: dataValidate.value});

        return NextResponse.json({
            provider: prov,
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
            const prov = await prismadb.provider.findMany({
                where: {
                  isActive: true
                },
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
            console.error('[getUsers]', error);
            return new NextResponse('Internal error', {status: 500});
        }
    }
