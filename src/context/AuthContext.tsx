"use client"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import Cookies from "js-cookie"
import { User } from "@/types"
import { apiRequest } from "@/lib/api"

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function initAuth() {
      const token = Cookies.get("access")
      if (!token) {
        setIsLoading(false)
        return
      }
      try {
        const userData = await apiRequest<User>("/users/me/")
        setUser(userData)
      } catch (err){
        console.error("Auth init failed:", err)
        Cookies.remove("access")
        Cookies.remove("refresh")
      } finally {
        setIsLoading(false)
      }
    }
    initAuth()
  }, [])

  async function login(username: string, password: string) {
    const data = await apiRequest<{ access: string; refresh: string }>(
      "/auth/login/", 
      { method: "POST", body: { username, password }, requiresAuth: false }
    )
    Cookies.set("access", data.access, { expires: 1 })
    Cookies.set("refresh", data.refresh, { expires: 7 })

    const userData = await apiRequest<User>("/users/me/")
    setUser(userData)
  }

  function logout() {
    Cookies.remove("access")
    Cookies.remove("refresh")
    setUser(null)
  }

  function updateUser(updatedUser: User){
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser,isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}