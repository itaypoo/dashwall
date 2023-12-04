import {WidgetOptionsDialog} from "@/model/WidgetOptionsDialog";
import OptionsDialog from "@/view/components/OptionsDialog/OptionsDialog";
import {SelectOption} from "@/view/materialPoo/MpSelect";
import {newsCountriesNames, newsCountryCodes} from "@/model/NewsCountryCode";
import {NewsWidgetOptions} from "@/view/widgets/NewsWidget/NewsWidget";

const countryOptions: SelectOption[] = newsCountryCodes.map(code => ({
    code: code,
    label: newsCountriesNames[code] + " (" + code.toUpperCase() + ")"
}))

export const NewsWidgetOptionsDialog: WidgetOptionsDialog<NewsWidgetOptions> = (props) => {

    return (
        <OptionsDialog isOpen={props.isOpen} onClose={props.onClose}>
            <OptionsDialog.Select
                options={countryOptions}
                label="News region"
                selectedValue={props.options.countryCode}
                onChange={value => props.setOption("countryCode", value)}
            />
        </OptionsDialog>
    )
}