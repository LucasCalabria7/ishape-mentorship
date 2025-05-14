"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TaskForm } from "@/components/task-form"
import { Task } from "@/lib/types"
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/tasks"
import { toast } from "sonner"

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (error) {
      toast.error("Failed to load tasks")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (data: { title: string; description: string }) => {
    try {
      const newTask = await createTask(data)
      setTasks([newTask, ...tasks])
      toast.success("Task created successfully")
    } catch (error) {
      toast.error("Failed to create task")
    }
  }

  const handleUpdate = async (id: string, data: { title: string; description: string }) => {
    try {
      const updatedTask = await updateTask({ id, ...data })
      setTasks(tasks.map(task => task.id === id ? updatedTask : task))
      toast.success("Task updated successfully")
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter(task => task.id !== id))
      toast.success("Task deleted successfully")
    } catch (error) {
      toast.error("Failed to delete task")
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <TaskForm onSubmit={handleCreate} buttonLabel="Create Task" />
      </div>
      
      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <p className="text-xs text-muted-foreground">
                  Created on {format(new Date(task.created_at), "PPP")}
                </p>
              </div>
              <div className="flex space-x-2">
                <TaskForm
                  task={task}
                  onSubmit={(data) => handleUpdate(task.id, data)}
                  buttonLabel="Update Task"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No tasks yet. Create your first task!
          </div>
        )}
      </div>
    </div>
  )
}