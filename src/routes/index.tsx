import { repo } from "remult"
import { createStore } from "solid-js/store"
import { For, onMount } from "solid-js"
import { Task } from "../shared/Task.js"

const taskRepo = repo(Task)

export default function Todo() {
  const [tasks, setTasks] = createStore<Task[]>([])
  onMount(() =>
    taskRepo
      .find({
        limit: 20,
      })
      .then(setTasks)
  )
  return (
    <div>
      <h1>Todos</h1>
      <main>
        <For each={tasks}>
          {(task) => {
            return <div>{task.title}</div>
          }}
        </For>
      </main>
    </div>
  )
}
