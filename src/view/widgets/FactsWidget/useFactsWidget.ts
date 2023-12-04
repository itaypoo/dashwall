import {useEffect, useState} from "react";

export const useFactsWidget = () => {
    const [factText, setFactText] = useState("")

    useEffect(() => {
        const hourInMillis = 1000 * 60 * 60
        fetchFact()
        const i = setInterval(fetchFact, hourInMillis)
        return () => clearInterval(i)
    }, [])

    const fetchFact = async () => {
        const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
        const json = await res.json()
        setFactText(json.text)
    }

    return {
        factText,
    }
}