
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function useStateWithLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [state, setState] = useState<T>(() => {
        const storedValue = localStorage.getItem(key)
        if (storedValue) {
            return JSON.parse(storedValue)
        } else if (typeof initialValue === 'function') {
            return (initialValue as () => T)()
        }
        return initialValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state, key])
    return [state, setState] as [T, Dispatch<SetStateAction<T>>]
}

