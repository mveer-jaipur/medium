import { ChangeEvent } from "react";

export interface ILabeledInput {
    label: string;
    placeholder: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}