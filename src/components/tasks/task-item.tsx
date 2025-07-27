"use client";

import { ModelsTask as Task } from "@/lib/vikunja/gen-client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Paper, Chip, Typography } from "@mui/material";
import invariant from "ts-invariant";

// ================================================================================================

const priorityColors = {
    "DO NOW": "error",
    urgent: "error",
    high: "warning",
    medium: "info",
    low: "primary",
    unset: "default",
} as const;

function getPriorityString(priority: number | string | undefined): string {
    if (typeof priority === "number") {
        switch (priority) {
            case 1:
                return "DO NOW"; // DO NOW
            case 2:
                return "urgent"; // urgent
            case 3:
                return "high"; // high
            case 4:
                return "medium"; // medium
            case 5:
                return "low"; // low
            default:
                return "default"; // unset or unknown
        }
    }

    return "default"; // Fallback for unknown priority strings
}

function getPriorityColor(priority: number | string | undefined) {
    const priorityString = getPriorityString(priority);
    return priorityColors[priorityString.toLowerCase() as keyof typeof priorityColors] || "default";
}

// ------------------------------------------------------------------------------------------------

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
    invariant(task.id, "Task ID is required"); // For some reason this task ID in the spec is optional, but it shouldn't be
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging
            ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
            : "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        cursor: "grab",
    };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="rounded-md bg-white p-3"
        >
            <Typography variant="body2">{task.title}</Typography>
            {task.priority && (
                <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority)}
                    size="small"
                    className="mt-2"
                />
            )}
        </Paper>
    );
}
