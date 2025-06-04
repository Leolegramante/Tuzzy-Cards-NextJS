import {BoxDto} from "@/helpers";

export type EditBoxResponseDto = {
    isValid: boolean;
    message: string;
    box?: BoxDto
}