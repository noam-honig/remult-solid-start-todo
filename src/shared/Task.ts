import { Entity, Fields, Validators, describeClass } from "remult"

export class Task {
  id = ""
  title = ""
  completed = false
  createdAt?: Date
}

describeClass(Task, Entity("tasks", { allowApiCrud: true }), {
  id: Fields.cuid(),
  title: Fields.string<Task>({
    validate: (task) =>
      task.title.length > 2 || "Title must be at least 3 characters",
  }),
  completed: Fields.boolean(),
  createdAt: Fields.createdAt(),
})
