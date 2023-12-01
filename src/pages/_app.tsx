import '@/view/materialPoo/globals.css'
import '@/view/materialPoo/globalColors.css'
import '@/view/materialPoo/MpPageLayout.css'
import '@/view/materialPoo/MpDialog.css'
import '@/view/materialPoo/MpIcon.css'
import '@/view/materialPoo/MpTextbox.css'
import '@/view/materialPoo/MpButton.css'
import '@/view/materialPoo/MpCard.css'
import '@/view/materialPoo/MpCheckbox.css'
import '@/view/materialPoo/MpIconButton.css'
import '@/view/materialPoo/MpNavDrawer.css'
import '@/view/materialPoo/MpSnackbar.css'
import '@/view/materialPoo/MpStarRating.css'
import '@/view/materialPoo/MpSwitch.css'
import '@/view/materialPoo/MpText.css'
import '@/view/materialPoo/MpTextarea.css'
import '@/view/materialPoo/MpNavRail.css'
import '@/view/materialPoo/MpBottomAppBar.css'
import '@/view/materialPoo/MpFab.css'
import '@/view/materialPoo/MpTooltip.css'
import '@/view/materialPoo/MpProgressBar.css'
import '@/view/materialPoo/MpDivider.css'
import '@/view/materialPoo/MpSelect.css'
import '@/view/materialPoo/MpColorSelect.css'

import type { AppProps } from 'next/app'
import {GridContext, useGridContext} from "@/view/components/GridLayout/GridContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    const gridContextData = useGridContext()

    return (
        <div style={{backgroundColor: "var(--color-background)"}}>
            <Head>
                <title>Dashwall</title>
            </Head>
            <GridContext.Provider value={gridContextData}>
                <Component {...pageProps} />
            </GridContext.Provider>
        </div>
    )
}
