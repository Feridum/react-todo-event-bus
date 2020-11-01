import { useContext } from "react"
import { EventBusContext } from "../context/EventBus/EventBusContext"



export const useEventBus = () =>{

    const eventBus = useContext(EventBusContext);

    if(!eventBus){
        throw Error('EventBusContext is missing')
    }

    return {
        dispatchEvent: eventBus.dispatchEvent,
        subscribeToEvent: eventBus.subscribeToEvent,  
    }
}