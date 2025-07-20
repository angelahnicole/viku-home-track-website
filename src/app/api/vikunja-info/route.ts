import { NextResponse } from "next/server";
import { ServiceApi } from "@/lib/vikunja-client/apis/ServiceApi";
import { Configuration } from "@/lib/vikunja-client/runtime";

export async function GET() {
    try {
        // Instantiate the client with the Vikunja API base URL
        const api = new ServiceApi(
            new Configuration({
                basePath: "https://vikunja.polymorphix.org/api/v1",
            }),
        );
        const info = await api.infoGet();
        return NextResponse.json(info);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch Vikunja info" }, { status: 500 });
    }
}
