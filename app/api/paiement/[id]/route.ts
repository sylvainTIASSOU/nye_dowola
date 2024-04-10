import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import {PaymentModel} from "@/models/PaymentModel";


export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const payment: PaymentModel = await req.json();
        const paymentValidate = Dto.paiementDto().validate(payment);
        const pay = await prismadb.payment.update({
            where: {id: id },
            data: paymentValidate.value
        });
        return NextResponse.json({
            category: pay,
            ok: true,
        });
    }catch (error) {
        console.error("[CATEGORY_PUT]", error);
        return NextResponse.json({
            error: 'Internal error status: 500 ',
            ok: false,
        });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const pay = await prismadb.payment.delete({
            where: { id: id }
        });

        return NextResponse.json({
            category: pay,
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
        const pay = await prismadb.payment.findUnique({
            where: { id }
        });

        return NextResponse.json(pay);
    } catch (error) {
        console.error('[deleteUser]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}