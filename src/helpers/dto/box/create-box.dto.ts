import {BoxDto} from "@/helpers/dto/box/box.dto";

export type CreateBoxResponseDto = {
    isValid: boolean;
    message: string;
    box?: BoxDto;
}