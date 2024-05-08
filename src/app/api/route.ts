import { NextResponse } from "next/server";
import prisma from "../lib/prisma";

export async function getWord(word: string) {
    let data; 

    switch(word) {
        case ('fourletter'):
            data = await prisma.fourletter.findMany();
            break;
        case ('fiveletter'):
            data = await prisma.fiveletter.findMany();
            break;
        case ('sixletter'):
            data = await prisma.sixletter.findMany();
            break;
        default:
            data = await prisma.fiveletter.findMany();
            break;
    }

    return data.map(item => item.words).filter(word => word !== null) as string[];
}

export async function GET({ word }: { word: string }) {
    try {
        const words = await getWord(word);
        return NextResponse.json(words, { status: 200 });
    } catch (error) {
        console.error('error fetching data: ', error);
        return NextResponse.error();
    }
}