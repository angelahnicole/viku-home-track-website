"use client";

import VikuTask from "@/lib/vikunja/viku-task";
import TaskItem from "@/components/tasks/task-item";

import React from "react";
import Fuse from "fuse.js";
import { Autocomplete, TextField, Paper, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

// ================================================================================================

interface TaskListProps {
    tasks: VikuTask[];
    query: string;
    setQuery: (query: string) => void;
}

export default function TaskList({ tasks, query, setQuery }: TaskListProps) {
    const { setNodeRef } = useDroppable({ id: "task-list-droppable" });

    const fuse = React.useMemo(
        () =>
            new Fuse(tasks, {
                keys: ["content", "metadata.assignee", "metadata.priority"],
                includeScore: true,
                threshold: 0.4,
            }),
        [tasks],
    );

    const filteredTasks = React.useMemo(() => {
        if (!query) return tasks;
        return fuse.search(query).map((result) => result.item);
    }, [query, tasks, fuse]);

    return (
        <Paper elevation={2} className="h-full rounded-lg bg-white p-4">
            <Typography variant="h6" className="mb-4 font-semibold text-gray-700">
                Unassigned Tasks
            </Typography>
            <Autocomplete
                freeSolo
                options={tasks.map((option) => option.title ?? option.description ?? "")}
                onInputChange={(_event, newInputValue) => setQuery(newInputValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Search tasks..." variant="standard" />
                )}
                className="mb-4"
            />
            <SortableContext
                items={filteredTasks.map((task) => task.id ?? -1)}
                strategy={verticalListSortingStrategy}
            >
                <div ref={setNodeRef} className="min-h-[200px] space-y-3 rounded-md bg-gray-50 p-2">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
                    ) : (
                        <div className="py-8 text-center text-gray-500">No matching tasks.</div>
                    )}
                </div>
            </SortableContext>
        </Paper>
    );
}
