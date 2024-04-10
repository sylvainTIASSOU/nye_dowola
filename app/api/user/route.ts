import {UserModel} from "@/models/UserModel";
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import { LoginModel } from "@/models/LoginModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userModel: UserModel = body;
        userModel.passwords = await bcrypt.hash(userModel.passwords, 10);
        const dataValidate = Dto.userDto().validate(userModel);

        const user = await prismadb.user.create({ data: dataValidate.value });

        return NextResponse.json(user);
    } catch (error) {
        console.error('[user_post]', error);
        return new NextResponse('Internal error', {status: 500});
    }
}
export async function GET(req: Request) {
    try {
        const users = await prismadb.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error('[getUsers]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
