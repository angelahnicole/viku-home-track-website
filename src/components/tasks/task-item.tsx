"use client";

import VikuTask from "@/lib/vikunja/viku-task";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Paper, Chip, Typography } from "@mui/material";
import invariant from "ts-invariant";

// ================================================================================================

interface TaskItemProps {
    task: VikuTask;
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
                    color={task.priorityColor}
                    size="small"
                    className="mt-2"
                />
            )}
        </Paper>
    );
}
