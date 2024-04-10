import {UserModel} from "@/models/UserModel";
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import { LoginModel } from "@/models/LoginModel";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const updatedUserData: UserModel = body;

        if (updatedUserData.passwords) {
            updatedUserData.passwords = await bcrypt.hash(updatedUserData.passwords, 10);
        }

        const dataValidate = Dto.userDto().validate(updatedUserData);

        const user = await prismadb.user.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('[updateUser]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const user = await prismadb.user.delete({
            where: { id: id }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('[deleteUser]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const user = await prismadb.user.findUnique({
            where: { id }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('[deleteUser]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}