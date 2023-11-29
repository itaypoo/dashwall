import {useHomePageMenu} from "./useHomePageMenu"
import styles from "./HomePageMenu.module.css"
import MpIconButton from "@/view/materialPoo/MpIconButton";
import MpIcon from "@/view/materialPoo/MpIcon";
import MpText from "@/view/materialPoo/MpText";
import {useContext} from "react";
import {GridContext} from "@/view/components/GridLayout/gridContext";
import MpButton from "@/view/materialPoo/MpButton";
import MpDialog from "@/view/materialPoo/MpDialog";
import AddWidgetDialog from "./AddWidgetDialog/AddWidgetDialog";
import ConfirmActionDialog from "@/view/components/ConfirmActionDialog/ConfirmActionDialog";

const menuOptions: {id: string, icon: string, text: string}[] = [
    {
        id: "add",
        icon: "add",
        text: "Add widget"
    },
    {
        id: "edit",
        icon: "pan_tool",
        text: "Edit widgets"
    },
    {
        id: "clear-widgets",
        icon: "delete",
        text: "Clear all widgets"
    }
]

export default function HomePageMenu() {
    const {
        isEditMode,
        setIsEditMode
    } = useContext(GridContext)
    const {
        menuButtonShown,
        menuShown,
        setMenuShown,
        menuItemClick,
        isAddWidgetDialogShown,
        setIsAddWidgetDialogShown,
        isClearWidgetsDialogShown,
        setIsClearWidgetsDialogShown,
        clearWidgets,
    } = useHomePageMenu()

    return (
        <>
            <div
                className={styles.menuButton}
                data-shown={menuButtonShown}
            >
                <MpIconButton
                    type="outlined"
                    icon="add"
                    onClick={(e) => {
                        e.stopPropagation()
                        setMenuShown(true)
                    }}
                />
            </div>

            <div
                className={styles.menu}
                data-shown={menuShown}
            >
                { menuOptions.map((option, i) => (
                    <div
                        className={styles.menuOption}
                        key={`moption${i}`}
                        onClick={() => menuItemClick(option.id)}
                    >
                        <MpIcon icon={option.icon}/>
                        <MpText scale="body" noMargin>{option.text}</MpText>
                    </div>
                ))}
            </div>
            
            <div
                className={styles.editModeOverlay}
                data-shown={isEditMode}
            >
                <MpIcon icon="pan_tool"/>
                <MpText scale="body" noMargin>Edit mode</MpText>
                <div className={styles.spacer}/>
                <MpButton
                    type="outlined"
                    onClick={() => setIsEditMode(false)}
                >
                    Done
                </MpButton>
            </div>

            <AddWidgetDialog
                isOpen={isAddWidgetDialogShown}
                onClose={() => setIsAddWidgetDialogShown(false)}
            />

            <ConfirmActionDialog
                isOpen={isClearWidgetsDialogShown}
                onClose={() => setIsClearWidgetsDialogShown(false)}
                onConfirm={clearWidgets}
                title="Are you sure you want to clear all widgets?"
                text="This action cannot be undone."
                confirmText="Clear"
            />
        </>
    )
}