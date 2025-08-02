import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ISideDirection {
    side: string,
    arrowSide: IconDefinition,
    onClick: () => void
}

export interface IDot {
    indexSlider: number,
    quantity: number
}