import { VikunjaTaskApi } from "@/lib/vikunja/api";

import { NextResponse } from "next/server";

// ================================================================================================

/**
 * Handles the GET request for Vikunja info. Instantiates the client and returns the info as JSON.
 *
 * @returns {Promise<NextResponse>} The response containing Vikunja info or an error message.
 */
export async function GET(): Promise<NextResponse> {
    try {
        const tasks = await VikunjaTaskApi.tasksAllGet({
            page: 1,
            perPage: 10,
            sortBy: "created",
            orderBy: "desc",
        });
        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error fetching Vikunja info:", error);
        return NextResponse.json({ error: "Failed to fetch Vikunja info" }, { status: 500 });
    }
}
