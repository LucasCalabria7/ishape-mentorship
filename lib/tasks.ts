import { supabase } from './supabaseClient'
import { CreateTaskInput, UpdateTaskInput, Task } from './types'

export async function getTasks() {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Task[]
}

export async function createTask(input: CreateTaskInput) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...input, user_id: user?.id }])
    .select()
    .single()

  if (error) throw error
  return data as Task
}

export async function updateTask(input: UpdateTaskInput) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('tasks')
    .update({ title: input.title, description: input.description })
    .eq('id', input.id)
    .eq('user_id', user?.id)
    .select()
    .single()

  if (error) throw error
  return data as Task
}

export async function deleteTask(id: string) {
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', user?.id)

  if (error) throw error
}