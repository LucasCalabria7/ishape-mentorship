export interface Task {
  id: string
  title: string
  description: string
  user_id: string
  created_at: string
}

export interface CreateTaskInput {
  title: string
  description: string
}

export interface UpdateTaskInput extends CreateTaskInput {
  id: string
}