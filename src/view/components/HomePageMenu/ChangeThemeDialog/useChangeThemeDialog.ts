import {useState, useEffect, useContext} from "react";
import {AppPageContext} from "@/view/pages/AppPage/AppPageContext";

export const useChangeThemeDialog = () => {
    const {
        userColorHue,
    } = useContext(AppPageContext)

}