import { remult, repo } from "remult"
import { createStore } from "solid-js/store"
import { For, Show, createSignal, onCleanup, onMount } from "solid-js"
import { Task } from "../shared/Task.js"
import { TasksController } from "../shared/TasksController.js"
import { createAsync, useAction } from "@solidjs/router"
import { getUser, logoutAction } from "../auth.js"
const taskRepo = repo(Task)

export default function Todo() {
  const user = createAsync(async () => getUser())
  const logout = useAction(logoutAction)
  onMount(() => (remult.user = user()))
  const [tasks, setTasks] = createStore<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = createSignal("")
  async function addTask(e: Event) {
    e.preventDefault()
    try {
      await taskRepo.insert({ title: newTaskTitle() })
      // ^ this no longer needs to be a variable as we are not using it to set the state.
      // setTasks([...tasks, newTask])   <-- this line is no longer needed
      setNewTaskTitle("")
    } catch (error) {
      alert((error as { message: string }).message)
    }
  }
  onMount(() =>
    onCleanup(
      taskRepo
        .liveQuery({
          limit: 20,
          orderBy: { createdAt: "asc" },
          //where: { completed: true },
        })
        .subscribe((info) => setTasks(info.applyChanges))
    )
  )

  async function setAllCompleted(completed: boolean) {
    await TasksController.setAllCompleted(completed)
  }

  return (
    <div>
      {remult.user?.name}
      <main>
        <Show when={taskRepo.metadata.apiInsertAllowed()}>
          <form onSubmit={addTask}>
            <input
              value={newTaskTitle()}
              placeholder="What needs to be done?"
              onInput={(e) => setNewTaskTitle(e.currentTarget.value)}
            />
            <button>Add</button>
          </form>
        </Show>
        <For each={tasks}>
          {(task, i) => {
            async function setCompleted(completed: boolean) {
              //const updatedTask = await taskRepo.update(task, { completed }) <- Delete this line
              //setTasks(i(), updatedTask) <- Delete this line
              await taskRepo.update(task, { completed }) // <- replace with this line
            }
            async function saveTask() {
              try {
                await taskRepo.save(task)
              } catch (error) {
                alert((error as { message: string }).message)
              }
            }
            async function deleteTask() {
              try {
                await taskRepo.delete(task)
                // setTasks(tasks.filter((t) => t !== task)) <- Delete this line
              } catch (error) {
                alert((error as { message: string }).message)
              }
            }

            return (
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  oninput={(e) => setCompleted(e.target.checked)}
                />
                <input
                  value={task.title}
                  onInput={(e) => setTasks(i(), "title", e.target.value)}
                />
                <button onClick={saveTask}>Save</button>
                <button onClick={deleteTask}>Delete</button>
              </div>
            )
          }}
        </For>
        <div>
          <button onClick={() => setAllCompleted(true)}>
            Set All Completed
          </button>
          <button onClick={() => setAllCompleted(false)}>
            Set All Uncompleted
          </button>
        </div>
      </main>
    </div>
  )
}
