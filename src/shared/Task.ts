import { Allow, Entity, Fields, Validators, describeClass } from "remult"

@Entity("tasks", { allowApiCrud: true })
export class Task {
  @Fields.cuid()
  id = ""
  @Fields.string<Task>({
    validate: (task) =>
      task.title.length > 2 || "Title must be at least 3 characters",
  })
  title = ""
  @Fields.boolean()
  completed = false
  @Fields.createdAt()
  createdAt?: Date
}
