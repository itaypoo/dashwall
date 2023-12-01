import {RefObject, useContext, useEffect, useState} from "react";
import {GridContext} from "@/view/components/GridLayout/GridContext";

export const useWidgetMenu = (isOpen: boolean, onClose: () => void, bgRef: RefObject<HTMLDivElement>) => {

    useEffect(() => {
        if(isOpen) {
            const close = (e: PointerEvent) => {
                if(!bgRef.current?.contains(e.target as Node)) {
                    onClose()
                }
            }
            window.addEventListener('pointerup', close)
            return () => window.removeEventListener('pointerup', close)
        }
    }, [isOpen])
}