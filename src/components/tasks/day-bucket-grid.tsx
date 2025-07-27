"use client";

import VikuTask from "@/lib/vikunja/viku-task";
import DayBucket from "@/components/tasks/day-bucket";

import dayjs from "dayjs";

// ================================================================================================

interface DayBucketsProps {
    days: dayjs.Dayjs[];
    tasks: VikuTask[];
}

export default function DayBucketGrid({ days, tasks }: DayBucketsProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {days.map((currDay) => {
                const tasksForDay = tasks.filter(
                    (task) => task.bucketDay && dayjs(task.bucketDay).isSame(currDay, "day"),
                );
                return (
                    <DayBucket
                        key={currDay.format("YYYY-MM-DD")}
                        day={currDay}
                        tasks={tasksForDay}
                    />
                );
            })}
        </div>
    );
}
