import { NextResponse } from "next/server";
import { ServiceApi } from "@/lib/vikunja-client/apis/ServiceApi";
import { Configuration } from "@/lib/vikunja-client/runtime";

// ================================================================================================

/**
 * Handles the GET request for Vikunja info. Instantiates the client and returns the info as JSON.
 *
 * @returns {Promise<NextResponse>} The response containing Vikunja info or an error message.
 */
export async function GET(): Promise<NextResponse> {
    try {
        // Instantiate the client with the Vikunja API base URL
        // TODO: Use environment variable for basePath
        const api = new ServiceApi(
            new Configuration({
                basePath: "https://vikunja.polymorphix.org/api/v1",
            }),
        );
        const info = await api.infoGet();
        return NextResponse.json(info);
    } catch (error) {
        console.error("Error fetching Vikunja info:", error);
        return NextResponse.json({ error: "Failed to fetch Vikunja info" }, { status: 500 });
    }
}
