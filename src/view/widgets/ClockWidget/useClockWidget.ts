import {useState, useEffect, useRef} from "react";
import {ClockWidgetOptions} from "@/view/widgets/ClockWidget/ClockWidget";

export const useClockWidget = (options: ClockWidgetOptions) => {
    const [date, setDate] = useState(new Date())
    const [numberDistances, setNumberDistances] = useState([0, 0, 0, 0]);
    const lastMinuteRef = useRef<number>(date.getMinutes())

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if(lastMinuteRef.current !== date.getMinutes()) {
            lastMinuteRef.current = date.getMinutes()
            const arr = [0, 0, 0, 0]
            for (let i = 0; i < 4; i++) {
                arr[i] = Math.floor(Math.random() * 6)
            }
            setNumberDistances(arr)
        }
    }, [date])

    const getHours = () => {
        let hours = date.getHours()
        if (!options.is24Hour) {
            hours = hours % 12
            if (hours === 0) {
                hours = 12
            }
        }
        if(hours < 10) {
            return "0" + hours
        }
        return hours.toString()
    }

    const getMinutes = () => {
        let minutes = date.getMinutes()
        if(minutes < 10) {
            return "0" + minutes
        }
        return minutes.toString()
    }

    const getDateString = () => {
        return date.toLocaleDateString("en-US", {weekday: "short", month: "long", day: "numeric"})
    }

    return {
        hours: getHours(),
        minutes: getMinutes(),
        dateString: getDateString(),
        numberDistances
    }
}