import { action, cache, redirect } from "@solidjs/router"
import { useSession } from "vinxi/http"
import type { UserInfo } from "remult"

const validUsers: UserInfo[] = [
  { id: "1", name: "Jane" },
  { id: "2", name: "Steve" },
]

export async function getSession() {
  "use server"
  return await useSession<{ user?: UserInfo }>({
    password:
      process.env["SESSION_SECRET"] ||
      "Something secret used for development only",
  })
}

export const loginAction = action(async (formData: FormData) => {
  "use server"
  const username = String(formData.get("username"))
  try {
    const session = await getSession()
    const user = validUsers.find((x) => x.name === username)
    if (!user) throw Error("Invalid user, try 'Steve' or 'Jane'")
    await session.update({ user })
  } catch (err) {
    return err as Error
  }
  throw redirect("/")
}, "login")
export const logoutAction = action(async () => {
  "use server"
  const session = await getSession()

  await session.update({ user: null! })
  throw redirect("/")
}, "logout")

export const getUser = cache(async () => {
  "use server"
  const session = await getSession()
  if (!session?.data?.user) throw redirect("/login")
  return session.data.user
}, "user")
