import {WidgetComponent} from "@/model/WidgetComponent";
import styles from './FactsWidget.module.css'
import MpIcon from "@/view/materialPoo/MpIcon";
import {useFactsWidget} from "@/view/widgets/FactsWidget/useFactsWidget";

export const FactsWidget: WidgetComponent<{}> = (props) => {
    const {
        factText
    } = useFactsWidget()

    return (
        <div className={styles.bg}>
            <p className={styles.header}>
                <MpIcon icon="lightbulb"/>
                Random Fact:
            </p>
            <p className={styles.fact}>
                {factText}
            </p>
        </div>
    )
}