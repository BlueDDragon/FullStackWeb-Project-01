import { fetchItemSearch } from "@/utils/fetchServer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get("q");
    const maxResults = req.nextUrl.searchParams.get("maxResults");
    const page = req.nextUrl.searchParams.get("page");

    if (!q) {
        return NextResponse.json({
            item: [],
        });
    }

    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/ItemSearch.aspx`;
    apiURL += `?ttbKey=${process.env.NEXT_PUBLIC_API_KEY}`;
    apiURL += `&Query=${q}`;
    apiURL += `&SearchTarget=Book`;
    apiURL += `&Start=${page}`;
    apiURL += `&MaxResults=${maxResults}`;
    apiURL += `&Cover=MidBig`;
    apiURL += `&Output=JS`;
    apiURL += `&Version=20131101`;

    // const data = await fetchItemSearch(q as string, 4);
    const response = await fetch(apiURL, { cache: "no-store", });
    const data = await response.json();

    return NextResponse.json(data);
}