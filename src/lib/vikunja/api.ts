import "server-only";

import { TaskApi, ServiceApi, Configuration } from "@/lib/vikunja/gen-client";

import invariant from "ts-invariant";

// ================================================================================================

// Grab env vars for Vikunja API config
const { VIKUNJA_API_BASE_URL, VIKUNJA_API_TOKEN } = process.env;
invariant(VIKUNJA_API_BASE_URL, "VIKUNJA_API_BASE_URL environment variable is required");
invariant(VIKUNJA_API_TOKEN, "VIKUNJA_API_TOKEN environment variable is required");

/**
 * Configuration for Vikunja API clients.
 */
const VikunjaConfig = new Configuration({
    basePath: VIKUNJA_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${VIKUNJA_API_TOKEN}`,
    },
});

/**
 * API client to access the "service" endpoints of the Vikunja API.
 */
const VikunjaServiceApi = new ServiceApi(VikunjaConfig);

/**
 * API client to access the "task" endpoints of the Vikunja API.
 */
const VikunjaTaskApi = new TaskApi(VikunjaConfig);

export { VikunjaServiceApi, VikunjaTaskApi };
