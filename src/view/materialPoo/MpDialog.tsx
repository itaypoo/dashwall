import React from "react";

type MpDialogProps = {
    isOpen: boolean,
    title?: string,
    extraDark?: boolean,
    className?: string,
    isFullSize?: boolean
}

export default function MpDialog(props: React.PropsWithChildren<MpDialogProps>) {

    return (
        <div
            className="mp-dialog-wrapper"
            data-visible={props.isOpen}
            data-darker={props.extraDark}
        >
          <div
              className={"mp-dialog "+props.className}
              data-visible={props.isOpen}
              data-full-size={props.isFullSize}
          >
              { props.title &&
                  <div className="mp-dialog-title">{props.title}</div>
              }
              { props.children }
          </div>
        </div>
    )
}