'use client'

import {FetchError, LoadingData, PageHeadings} from "@/components";
import {getAllBoxes} from "@/components/Admin/Boxes/actions";
import {BoxTable} from "@/components/Admin/Boxes/BoxTable";
import {BoxDto} from "@/helpers";
import {useEffect, useState} from "react";
import {CreateBoxModal, EditBoxModal} from "./modals";

export function Boxes({currentPage, limit}: { currentPage: number, limit: number }) {
    const [boxes, setBoxes] = useState<BoxDto[] | null>(null);
    const [selectedBox, setSelectedBox] = useState<BoxDto | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const [isBoxDetailsModalOpen, setIsBoxDetailsModalOpen] = useState(false);
    const [isCreateBoxModalOpen, setIsCreateBoxModalOpen] = useState(false);

    const fetchBoxes = async ({currentPage, limit}: { currentPage: number, limit: number }) => {
        const res = await getAllBoxes({page: currentPage, limit});
        if (res.isValid && res.boxes) {
            setBoxes(res.boxes);
            setIsLoading(false);
        } else {
            setError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchBoxes({currentPage, limit}).then();
    }, [currentPage, limit]);

    const handleSelectBox = async (box: BoxDto) => {
        setSelectedBox(box);
        await handleOpenBoxDetailsModalOpen();
    }

    const handleOpenBoxDetailsModalOpen = async () => {
        setIsBoxDetailsModalOpen((prev) => !prev);
        if (isBoxDetailsModalOpen) {
            await fetchBoxes({currentPage, limit});
        }
    }

    const handleOpenCreateBoxModalOpen = async () => {
        setIsCreateBoxModalOpen((prev) => !prev);
        if (isCreateBoxModalOpen) {
            await fetchBoxes({currentPage, limit});
        }
    }

    return (
        <div
            className='flex grow flex-col gap-y-2 rounded-lg bg-white p-6 text-principal'>
            <PageHeadings
                label="Caixas"
                button={true}
                buttonLabel="Cadastrar caixa"
                buttonOnClick={handleOpenCreateBoxModalOpen}
            />
            {isLoading && (<LoadingData/>)}
            {!isLoading && error && (<FetchError/>)}
            {!isLoading && !error && boxes && boxes.length > 0 && (
                <BoxTable
                    boxes={boxes}
                    selectBoxAction={handleSelectBox}
                    totalBoxes={boxes.length}
                    currentPage={currentPage}
                    totalPages={Math.ceil(boxes.length / limit)}
                />
            )}
            {isCreateBoxModalOpen && (
                <CreateBoxModal isOpen={isCreateBoxModalOpen} onCloseAction={handleOpenCreateBoxModalOpen}/>
            )}
            {isBoxDetailsModalOpen && selectedBox && (
                <EditBoxModal
                    isOpen={isBoxDetailsModalOpen}
                    onCloseAction={handleOpenBoxDetailsModalOpen}
                    box={selectedBox}
                />
            )}
        </div>
    )
}