import {BoxDto} from "@/helpers/dto/box/box.dto";

export type GetAllBoxesResponseDto = {
    isValid: boolean;
    message: string;
    boxes: BoxDto[];
}