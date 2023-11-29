import {useState, useEffect} from "react";

export const useWidgetMenu = (isOpen: boolean, onClose: () => void) => {

    useEffect(() => {
        console.log(isOpen)
        if(isOpen) {
            window.addEventListener('click', onClose)
        }
        return () => window.removeEventListener('click', onClose)
    }, [isOpen])

}