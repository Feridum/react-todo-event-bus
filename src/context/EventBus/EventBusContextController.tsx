import React, { ReactNode } from "react"
import { EventBusContext } from "./EventBusContext"

export type EventListenerType = {
    event: string, callback: EventCallback
}

type EventBusContextControllerProps = {
    children: ReactNode;
    listeners: EventListenerType[]
}

type DispatchEvent = (event: string, data?: Record<string, unknown>) => void;
type SubscribeToEvent = (event: string, calback: EventCallback) =>  {removeListener: VoidFunction};

type EventCallback = (e: CustomEvent, eventBus: { dispatchEvent: DispatchEvent }) => void

export const EventBusContextController = ({ children, listeners }: EventBusContextControllerProps) => {

    const dispatchEvent: DispatchEvent = (event, data) => {
        const _event = new CustomEvent(event, { detail: data });

        document.dispatchEvent(_event);
    }

    const subscribeToEvent: SubscribeToEvent = (event, calback)  => {

        const _callback = (e:Event) => calback(e as CustomEvent, { dispatchEvent });

        document.addEventListener(event, _callback);

        return {
            removeListener: ()=>document.removeEventListener(event, _callback)
        }
    }


    listeners.map((listener) => subscribeToEvent(listener.event, listener.callback))

    return <EventBusContext.Provider value={{ dispatchEvent, subscribeToEvent }}>
        {children}
    </EventBusContext.Provider>
}