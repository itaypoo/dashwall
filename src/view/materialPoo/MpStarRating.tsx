import {useState} from "react";
import MpIcon from "./MpIcon";

type MpStarRatingProps = {
    isEditable: boolean,
    onRatingChanged?: (rating: number) => void,
    initialRating?: number,
    className?: string,
}

export default function MpStarRating(props: MpStarRatingProps) {
    const [rating, setRating] = useState(props.initialRating || 0)

    if(props.isEditable) return (
        <div className={"mp-star-rating "+props.className}>
            { [1,2,3,4,5].map((i) => {
                return <img src="/star_rating.svg" alt="star" key={i}
                            data-golden={i <= rating} className="editable"
                            onClick={()=>{setRating(i); props.onRatingChanged?.(i)}}
                        />
            })}
        </div>
    )

    if(!props.isEditable) return (
        <div className={"mp-star-rating "+props.className}>
            { [1,2,3,4,5].map((i) => {
                return <img src="/star_rating.svg" key={i} alt="star" data-golden={i <= rating}/>
            })}
        </div>
    )
    return <></>
}