import {useAppPage} from "./useAppPage"
import styles from "./AppPage.module.css"
import {useContext, useEffect, useRef, useState} from "react";
import GridLayout from "@/view/components/GridLayout/GridLayout";
import WidgetWrapper from "@/view/components/WidgetWrapper/WidgetWrapper";
import HomePageMenu from "@/view/components/HomePageMenu/HomePageMenu";
import {AppPageContext, useAppPageContext} from "@/view/pages/AppPage/AppPageContext";
import MpDialog from "@/view/materialPoo/MpDialog";
import ConfirmActionDialog from "@/view/components/ConfirmActionDialog/ConfirmActionDialog";
import {GridContext} from "@/view/components/GridLayout/GridContext";
import WidgetOptionsDialogWrapper from "@/view/pages/AppPage/WidgetOptionsDialogWrapper";
import {WidgetId} from "@/model/WidgetId";

export default function AppPage() {
    const [menuOpenForPanel, setMenuOpenForPanel] = useState<string | null>(null)
    const contextData = useAppPageContext()

    const {
        removePanel,
    } = useContext(GridContext)

    return (
        <div className={styles.main}>
            <AppPageContext.Provider value={contextData}>
                <GridLayout
                    renderPanelContent={(panel) => (
                        <WidgetWrapper
                            widgetId={panel.data.widgetId}
                            panelUid={panel.uid}
                            options={panel.data.options}
                            isMenuOpen={menuOpenForPanel === panel.uid}
                            onCloseMenu={() => setMenuOpenForPanel(null)}
                        />
                    )}
                    onPanelLongPress={(panel) => {
                        setMenuOpenForPanel(panel.uid)
                    }}
                />
                <HomePageMenu/>
            </AppPageContext.Provider>

            <ConfirmActionDialog
                isOpen={!!contextData.deleteWidgetDialogOpenFor}
                onClose={() => contextData.setDeleteWidgetDialogOpenFor(null)}
                onConfirm={() => removePanel(contextData.deleteWidgetDialogOpenFor!)}
                title="Are you sure you want to delete this widget?"
            />

            <WidgetOptionsDialogWrapper
                openForPanelUid={contextData.widgetOptionsDialogOpenFor}
                onCloseDialog={() => contextData.setWidgetOptionsDialogOpenFor(null)}
            />
        </div>
    )
}