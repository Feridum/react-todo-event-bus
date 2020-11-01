import { createContext } from 'react'

export type EventBusContextType = {
    dispatchEvent: (event: string, data?: Record<string, unknown>) => void
    subscribeToEvent: (event: string, calback: (e: CustomEvent)=>void) =>  {removeListener: VoidFunction}
}

export const EventBusContext = createContext<EventBusContextType | undefined>(undefined)