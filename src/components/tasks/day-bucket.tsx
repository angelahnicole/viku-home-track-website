"use client";

import type { ModelsTask } from "@/lib/vikunja/gen-client";
import TaskItem from "@/components/tasks/task-item";

import dayjs from "dayjs";
import { Paper, Typography } from "@mui/material";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

// ================================================================================================

interface DayBucketProps {
    day: dayjs.Dayjs;
    tasks: ModelsTask[];
}

export default function DayBucket({ day, tasks }: DayBucketProps) {
    const dayString = day.format("YYYY-MM-DD");
    const { setNodeRef, isOver } = useDroppable({
        id: `day-${dayString}`,
    });

    const style = {
        backgroundColor: isOver ? "#e0f7fa" : "#f8fafc",
        transition: "background-color 0.2s ease-in-out",
    };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            elevation={0}
            className="h-full rounded-lg border border-gray-200 p-3"
        >
            <Typography variant="subtitle1" className="text-center font-bold text-gray-600">
                {day.format("ddd")}
            </Typography>
            <Typography variant="body2" className="mb-3 text-center text-gray-400">
                {day.format("MMM D")}
            </Typography>
            <SortableContext
                items={tasks.map((task) => task.id ?? -1)}
                strategy={verticalListSortingStrategy}
            >
                <div className="min-h-[150px] space-y-3">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </SortableContext>
        </Paper>
    );
}
