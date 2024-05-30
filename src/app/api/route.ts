// import { NextResponse } from "next/server";
// import prisma from "../lib/prisma";

// export async function getWord(word: string) {
//     let data; 

//     switch(word) {
//         case ('fourletter'):
//             data = await prisma.fourletter.findMany();
//             break;
//         case ('fiveletter'):
//             data = await prisma.fiveletter.findMany();
//             break;
//         case ('sixletter'):
//             data = await prisma.sixletter.findMany();
//             break;
//         default:
//             data = await prisma.fiveletter.findMany();
//             break;
//     }

//     return data.map(item => item.words).filter(
//         word => word !== null) as string[];
// }

// export const GET = async(req: any) => {
//     const url = new URL(req.url);
//     const param = new URLSearchParams(url.searchParams);
//     try {
//         const words = await getWord(param.get('word')!);
//         return NextResponse.json(words, { status: 200 });
//     } catch (error) {
//         console.error('error fetching data: ', error);
//         return NextResponse.error();
//     }
// }

// commented out as a server is hosted on heroku