import styles from "./HomePage.module.css"
import GridLayout from "@/view/components/GridLayout/GridLayout";
import HomePageMenu from "@/view/pages/HomePage/HomePageMenu/HomePageMenu";
import {GridPanel} from "@/model/GridPanel";
import MpButton from "@/view/materialPoo/MpButton";
import WidgetWrapper from "@/view/pages/HomePage/WidgetWrapper/WidgetWrapper";

export default function HomePage() {

    return (
        <div className={styles.main}>
            <GridLayout
                insidePanelComponent={(props) => (
                    <WidgetWrapper
                        widgetId={props.panel.data.widgetId}
                        options={props.panel.data.options}
                    />
                )}
            />
            <HomePageMenu/>
        </div>
    )
}