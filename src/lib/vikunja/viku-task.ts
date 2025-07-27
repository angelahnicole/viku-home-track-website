import type { ModelsTask } from "@/lib/vikunja/gen-client";

import dayjs from "dayjs";

// ================================================================================================

export default interface VikuTask extends Omit<ModelsTask, "id" | "title" | "priority"> {
    id: number;
    title: string;
    bucketDay: string | null; // store as ISO string or null
    priority: VikuPriority;
    priorityColor: VikuPriorityColor;
}

export function toVikuTask(task: ModelsTask): VikuTask {
    if (typeof task.id !== "number" || !task.title) {
        throw new Error("Task must have id and title");
    }
    // Use startDate or your own logic for bucketDay
    const bucketDay = task.startDate ? dayjs(task.startDate).toISOString() : null;
    const priority = makeVikuPriority(task.priority);
    const priorityColor = getPriorityColor(priority);
    return {
        ...task,
        id: task.id,
        title: task.title,
        priority: priority,
        priorityColor: priorityColor,
        bucketDay,
    };
}

export function fromVikuTask(task: VikuTask): ModelsTask {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { bucketDay, priority, priorityColor, ...rest } = task;
    return {
        ...rest,
        id: task.id,
        title: task.title,
        startDate: bucketDay ?? undefined,
        priority: getPriorityNumber(priority),
    };
}

// ------------------------------------------------------------------------------------------------

export type VikuPriority = "DO NOW" | "urgent" | "high" | "medium" | "low" | "unset" | "default";
export type VikuPriorityColor = "error" | "warning" | "info" | "primary" | "default";

function makeVikuPriority(priority: number | string | undefined): VikuPriority {
    if (typeof priority === "number") {
        switch (priority) {
            case 1:
                return "DO NOW";
            case 2:
                return "urgent";
            case 3:
                return "high";
            case 4:
                return "medium";
            case 5:
                return "low";
            default:
                return "default";
        }
    }

    return "default"; // Fallback for unknown priority strings
}

function getPriorityColor(priority: VikuPriority): VikuPriorityColor {
    switch (priority) {
        case "DO NOW":
            return "error";
        case "urgent":
            return "error";
        case "high":
            return "warning";
        case "medium":
            return "info";
        case "low":
            return "primary";
        default:
            return "default";
    }
}

function getPriorityNumber(priority: VikuPriority): number | undefined {
    switch (priority) {
        case "DO NOW":
            return 1;
        case "urgent":
            return 2;
        case "high":
            return 3;
        case "medium":
            return 4;
        case "low":
            return 5;
        default:
            return undefined;
    }
}
