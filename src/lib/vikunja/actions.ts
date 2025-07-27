"use server";

import VikuTask from "@/lib/vikunja/viku-task";
import dayjs from "dayjs";

import { revalidatePath } from "next/cache";

// ================================================================================================

// This is a Server Action. It runs securely on the server.
// Here, you would use your database client or fetch from a secure API.
export async function updateTasksAction(tasks: VikuTask[]): Promise<VikuTask[]> {
    console.log("Server Action: Updating tasks on the server...", tasks);

    // --- SECURE DATABASE/API CALL ---
    // Example: await db.tasks.updateMany(...);
    // Example: await fetch('https://api.internal/tasks', { headers: { Authorization: `Bearer ${process.env.API_TOKEN}` } });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, you'd get the result from your DB call.
    // For this demo, we'll just return the tasks passed in.

    // Revalidate the path to ensure the UI is fresh on the next full page load.
    revalidatePath("/");

    return tasks;
}

// Stub fetchTasks for React Query
export async function fetchTasks(): Promise<VikuTask[]> {
    console.log("Fetching tasks on the SERVER...");
    // In a real app, you'd use your API token here securely.
    // const response = await fetch('https://api.yourservice.com/tasks', {
    //   headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    // });
    // const tasks = await response.json();

    // Simulate network delay and return dynamic mock data
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const today = dayjs();
    const startOfThisWeek = today.startOf("isoWeek");

    const mockTasks: VikuTask[] = [
        {
            id: 1,
            title: "Design the new dashboard",
            bucketDay: null,
            priority: "high",
            priorityColor: "warning",
        },
        {
            id: 2,
            title: "Develop API endpoints",
            bucketDay: startOfThisWeek.add(0, "day").toISOString(),
            priority: "high",
            priorityColor: "warning",
        },
        {
            id: 3,
            title: "Review pull requests",
            bucketDay: startOfThisWeek.add(1, "day").toISOString(),
            priority: "medium",
            priorityColor: "warning",
        },
        {
            id: 4,
            title: "Write documentation for feature X",
            bucketDay: null,
            priority: "low",
            priorityColor: "warning",
        },
        {
            id: 5,
            title: "Team meeting",
            bucketDay: startOfThisWeek.add(2, "day").toISOString(),
            priority: "low",
            priorityColor: "warning",
        },
        {
            id: 6,
            title: "Fix bug #123",
            bucketDay: null,
            priority: "high",
            priorityColor: "warning",
        },
        {
            id: 7,
            title: "Plan next sprint",
            bucketDay: startOfThisWeek.add(4, "day").toISOString(),
            priority: "medium",
            priorityColor: "warning",
        },
    ];

    return mockTasks;
}
