"use client";

import type { ViewMode } from "@/lib/types";
import { updateTasksAction, fetchTasks } from "@/lib/vikunja/actions";
import VikuTask from "@/lib/vikunja/viku-task";
import TaskList from "@/components/tasks/task-list";
import DayBucketGrid from "@/components/tasks/day-bucket-grid";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, ButtonGroup, Alert } from "@mui/material";

import React from "react";

// Extend dayjs with the plugins we need
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

// ================================================================================================

// TODO:
// - Add daily view support
// - Make draggable tasks visible when dragging
// - Implement task retrieval (how to support pagination or infinite scroll with fuse?)
// - Fix styling issues where the div background doesn't respect color mode

interface TaskBoardProps {
    initialData: VikuTask[];
}

export default function TaskBoard({ initialData }: TaskBoardProps) {
    const queryClient = useQueryClient();
    const [view, setView] = React.useState<ViewMode>("thisWeek");
    const [query, setQuery] = React.useState("");

    // Use the server-fetched data to initialize React Query's cache
    const { data: tasks, isError } = useQuery<VikuTask[]>({
        queryKey: ["tasks"],
        queryFn: fetchTasks,
        initialData: initialData,
    });

    // Set up the mutation for updating tasks, which uses a server-side action so this component
    // can be a client component.
    const updateTasksMutation = useMutation({
        mutationFn: updateTasksAction,
        onMutate: async (newTasks: VikuTask[]) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });
            const previousTasks = queryClient.getQueryData<VikuTask[]>(["tasks"]);
            queryClient.setQueryData(["tasks"], newTasks);
            return { previousTasks };
        },
        onError: (_err, _newTasks, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData(["tasks"], context.previousTasks);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    // Make an array of days for the current view
    // This will be either the current week or the next week, depending on the view state
    // TODO: Support daily view in the future
    const getDaysForView = (): dayjs.Dayjs[] => {
        const today = dayjs();
        const startOfThisWeek = today.startOf("isoWeek");
        const startOfNextWeek = startOfThisWeek.add(7, "day");
        const weekStart = view === "thisWeek" ? startOfThisWeek : startOfNextWeek;
        return Array.from({ length: 7 }, (_, i) => weekStart.add(i, "day"));
    };
    const days = getDaysForView();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || !tasks) return;
        const activeTask = tasks.find((task) => task.id === active.id);
        if (!activeTask) return;

        let newTasks = [...tasks];
        const oldIndex = newTasks.findIndex((task) => task.id === active.id);

        if (over.id.toString().startsWith("day-")) {
            const newDay = over.id.toString().replace("day-", "");
            newTasks[oldIndex] = { ...activeTask, bucketDay: dayjs(newDay).toISOString() };
        } else if (over.id === "task-list-droppable") {
            newTasks[oldIndex] = { ...activeTask, bucketDay: null };
        } else {
            const newIndex = newTasks.findIndex((task) => task.id === over.id);
            if (oldIndex !== newIndex) {
                const overTask = newTasks[newIndex];
                const activeBucket = activeTask.bucketDay ? dayjs(activeTask.bucketDay) : null;
                const overBucket = overTask.bucketDay ? dayjs(overTask.bucketDay) : null;
                if (!(activeBucket && overBucket && activeBucket.isSame(overBucket))) {
                    newTasks[oldIndex] = { ...activeTask, bucketDay: overTask.bucketDay };
                }
                newTasks = arrayMove(newTasks, oldIndex, newIndex);
            }
        }

        updateTasksMutation.mutate(newTasks);
    };

    // No loading state needed for initial render as data is pre-fetched
    if (isError) {
        return <Alert severity="error">Failed to load tasks. Please try again later.</Alert>;
    }

    const unassignedTasks = tasks?.filter((task) => !task.bucketDay) ?? [];

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                <div className="lg:col-span-1">
                    <TaskList tasks={unassignedTasks} query={query} setQuery={setQuery} />
                </div>
                <div className="lg:col-span-3">
                    <ButtonGroup
                        variant="outlined"
                        aria-label="week view switcher"
                        className="mb-4"
                    >
                        <Button
                            onClick={() => setView("thisWeek")}
                            variant={view === "thisWeek" ? "contained" : "outlined"}
                        >
                            This Week
                        </Button>
                        <Button
                            onClick={() => setView("nextWeek")}
                            variant={view === "nextWeek" ? "contained" : "outlined"}
                        >
                            Next Week
                        </Button>
                    </ButtonGroup>
                    <DayBucketGrid days={days} tasks={tasks ?? []} />
                </div>
            </div>
        </DndContext>
    );
}
