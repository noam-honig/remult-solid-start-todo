import { remultSolidStart } from "./remult-dev/remult-solid-start.js"
import { Task } from "./shared/Task.js"

export const api = remultSolidStart({
  entities: [Task],
  admin: true,
})
