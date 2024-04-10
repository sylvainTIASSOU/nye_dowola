import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import {PaymentModel} from "@/models/PaymentModel";


export async function POST(req: Request) {
    try {
        const paiement: PaymentModel = await req.json();
        const paiementValidate = Dto.paiementDto().validate(paiement);
        const pay = await prismadb.payment.create({data: paiementValidate.value});
        return NextResponse.json({
            category: pay,
            ok: true,
        });
    }catch (error) {
        console.error("[CATEGORY_POST]", error);
        return NextResponse.json({
            error: 'Internal error status: 500 ',
            ok: false,
        });
    }
}


export async function GET(req: Request) {
    try {
        const pay = await prismadb.payment.findMany();
        return NextResponse.json(pay);
    } catch (error) {
        console.error('[GET_CATEGORY]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}