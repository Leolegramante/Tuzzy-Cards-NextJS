"use client"

import {FetchError, LoadingData, PageHeadings} from "@/components";
import {CategoryDto} from "@/helpers";
import {useCallback, useEffect, useState} from "react";
import {getSubCategories, GetSubCategoriesResponse} from './actions'
import {CreateSubCategoryModal, EditSubCategoryModal} from "./Modals";
import {SubCategoriesTable} from "./SubCategoriesTable/SubCategoriesTable";

export const SubCategories = ({currentPage, limit}: { currentPage: number, limit: number }) => {
    const [subCategory, setSubCategories] = useState<GetSubCategoriesResponse>({
        subCategories: [],
        total: 0,
        totalPages: 0
    })
    const [isloading, setisloading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null)

    const fetchSubCategories = useCallback(async () => {
        setisloading(true)

        const subCategories = await getSubCategories({page: currentPage, limit})
        if (subCategories !== false) {
            setSubCategories(subCategories)
            setisloading(false)
        } else {
            setisloading(false)
            setError(true)
        }
        return (
            subCategories
        )
    }, [currentPage, limit])

    useEffect(() => {
        fetchSubCategories().then()
    }, [fetchSubCategories]);

    const handleCreateSubCategoryModalOpen = async () => {
        setIsCreateModalOpen((prevState) => !prevState);

        if (isCreateModalOpen) {
            await fetchSubCategories()
        }
    };

    const handleEditModalOpen = async () => {
        setIsEditModalOpen((prevState) => !prevState);

        if (isEditModalOpen) {
            await fetchSubCategories()
        }
    }

    const handleSelectCategory = async (category: CategoryDto) => {
        setSelectedCategory(category)
        await handleEditModalOpen()
    }

    return (
        <div className="flex grow flex-col gap-y-2 rounded-lg bg-white p-6 text-principal">
            <PageHeadings label="Sub Categorias" buttonLabel="Adicionar sub categoria" button={!error}
                          buttonOnClick={async () => await handleCreateSubCategoryModalOpen()}/>
            {error && !isloading && (
                <FetchError/>
            )}
            {isloading && (
                <LoadingData/>
            )}
            {isCreateModalOpen && (
                <CreateSubCategoryModal isOpen={isCreateModalOpen}
                                        onCloseAction={async () => await handleCreateSubCategoryModalOpen()}/>
            )}
            {!isloading && !error && (
                <SubCategoriesTable subCategories={subCategory.subCategories}
                                    currentPage={currentPage}
                                    totalSubCategories={subCategory.total}
                                    totalPages={subCategory.totalPages}
                                    selectSubCategoryAction={handleSelectCategory}/>
            )}
            {isEditModalOpen && selectedCategory !== null && (
                <EditSubCategoryModal isOpen={isEditModalOpen} onCloseAction={async () => await handleEditModalOpen()}
                                      subCategory={selectedCategory}/>
            )}

        </div>
    )
}