import { Allow, BackendMethod, describeClass, repo } from "remult"
import { Task } from "./Task.js"

export class TasksController {
  @BackendMethod({ allowed: true })
  static async setAllCompleted(completed: boolean) {
    const taskRepo = repo(Task)
    for (const task of await taskRepo.find()) {
      await taskRepo.save({ ...task, completed })
    }
  }
}
