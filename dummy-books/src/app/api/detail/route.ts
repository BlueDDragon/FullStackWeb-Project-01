import { fetchItemSearch } from "@/utils/api/fetchServer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get("q");

    if (!q) {
        return NextResponse.json({
            item: [],
        });
    }

    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/ItemLookUp.aspx`;
    apiURL += `?ttbKey=${process.env.NEXT_PUBLIC_API_KEY}`;
    apiURL += `&itemType=ISBN13`;
    apiURL += `&itemId=${q}`;
    apiURL += `&Cover=Big`;
    apiURL += `&OptResult=ratingInfo,reviewList,Toc,Story,phraseList`
    apiURL += `&Output=JS`;
    apiURL += `&Version=20131101`;

    // const data = await fetchItemSearch(q as string, 4);
    const response = await fetch(apiURL, { cache: "no-store", });
    const data = await response.json();

    return NextResponse.json(data);
}