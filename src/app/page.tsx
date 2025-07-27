import TaskBoard from "@/components/tasks/task-board";
import { fetchTasks } from "@/lib/vikunja/actions";

export default async function TasksPage() {
    // Fetch data on the server
    const initialTasks = await fetchTasks();

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-4">
                <h1 className="mb-6 text-4xl font-bold text-gray-800">Task Planner</h1>
                {/* Pass the server-fetched data to the client component */}
                <TaskBoard initialData={initialTasks} />
            </div>
        </main>
    );
}
