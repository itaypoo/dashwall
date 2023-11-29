import {useEffect, useRef, useState} from "react";
import styles from "@/view/index.module.css";
import GridLayout from "@/view/components/GridLayout/GridLayout";
import WidgetWrapper from "@/view/components/WidgetWrapper/WidgetWrapper";
import HomePageMenu from "@/view/components/HomePageMenu/HomePageMenu";

export default function index() {
    const openMenuPanelRef = useRef<string|null>(null)

    return (
        <div className={styles.main}>
            <GridLayout
                insidePanelComponent={(props) => (
                    <WidgetWrapper
                        widgetId={props.panel.data.widgetId}
                        options={props.panel.data.options}
                        isMenuOpen={openMenuPanelRef.current === props.panel.uid}
                        onCloseMenu={() => openMenuPanelRef.current = null}
                    />
                )}
                onPanelLongPress={(panel) => {
                    openMenuPanelRef.current = panel.uid
                }}
            />
            <HomePageMenu/>
        </div>
    )
}