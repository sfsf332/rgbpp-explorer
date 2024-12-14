import { useCallback, useEffect, useRef, useState } from 'react'

export function useDetectOverflow<T extends HTMLDivElement>(): [overflow: boolean, ref: (element: T | null) => void] {
  const [isOverflow, setIsOverflow] = useState(false)
  const resizeObserver = useRef<ResizeObserver | null>(null)
  const elementRef = useRef<T | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const checkOverflow = () => {
      const element = elementRef.current
      if (!element) return
      setIsOverflow(element.offsetWidth !== element.scrollWidth)
    }

    checkOverflow()
    resizeObserver.current = new ResizeObserver(checkOverflow)
    resizeObserver.current.observe(elementRef.current)

    return () => resizeObserver.current?.disconnect()
  }, [])

  const ref = useCallback((element: T | null) => {
    elementRef.current = element
  }, [])

  return [isOverflow, ref]
}
