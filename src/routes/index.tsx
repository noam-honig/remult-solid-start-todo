import { clientOnly } from "@solidjs/start"
import { getUser, logoutAction } from "../auth.js"
import { createAsync, useAction } from "@solidjs/router"
import { onMount } from "solid-js"
import { remult } from "remult"

const Todo = clientOnly(() => import("../components/Todo.jsx"))
export default function Home() {
  const user = createAsync(async () => getUser())
  const logout = useAction(logoutAction)
  onMount(() => (remult.user = user()))
  return (
    <>
      <h1>Todos</h1>
      <header>
        Hello {user()?.name}
        <button onClick={logout}>Sign Out</button>
      </header>
      <Todo />
    </>
  )
}
