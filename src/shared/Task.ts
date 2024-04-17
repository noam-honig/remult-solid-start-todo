import { Entity, Fields, describeClass } from "remult"

export class Task {
  id = ""
  title = ""
  completed = false
  createdAt?: Date
}

describeClass(Task, Entity("tasks", { allowApiCrud: true }), {
  id: Fields.cuid(),
  title: Fields.string(),
  completed: Fields.boolean(),
  createdAt: Fields.createdAt(),
})
