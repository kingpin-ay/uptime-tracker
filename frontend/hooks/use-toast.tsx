// Inspired by react-hot-toast library
import { useState, useEffect, useCallback, type ReactNode } from "react"

export type ToastProps = {
  id: string
  title?: string
  description?: ReactNode
  action?: ReactNode
  variant?: "default" | "destructive"
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: ReactNode
  action?: ReactNode
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toasts: ToasterToast[] = []

type Toast = Omit<ToasterToast, "id">

export function useToast() {
  const [mounted, setMounted] = useState(false)
  const [toastState, setToastState] = useState<ToasterToast[]>([])

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      setToastState(toasts)
    }
  }, [mounted, toasts])

  const toast = useCallback(({ ...props }: Toast) => {
    const id = genId()

    const newToast = {
      id,
      ...props,
    }

    toasts.push(newToast)
    setToastState([...toasts])

    setTimeout(() => {
      toasts.splice(
        toasts.findIndex((t) => t.id === id),
        1
      )
      setToastState([...toasts])
    }, TOAST_REMOVE_DELAY)

    return id
  }, [])

  const dismiss = useCallback((toastId?: string) => {
    if (toastId) {
      const index = toasts.findIndex((t) => t.id === toastId)
      if (index !== -1) {
        toasts.splice(index, 1)
        setToastState([...toasts])
      }
    } else {
      toasts.splice(0, toasts.length)
      setToastState([])
    }
  }, [])

  return {
    toast,
    dismiss,
    toasts: toastState,
  }
}

