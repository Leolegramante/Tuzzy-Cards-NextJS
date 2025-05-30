"use client"

import {FetchError, LoadingData, PageHeadings} from "@/components";
import {CategoryDto} from "@/helpers";
import {useCallback, useEffect, useState} from "react";
import {getCategories, GetCategoriesResponse} from "./actions";
import {CategoriesTable} from './CategoriesGrid/CategoriesTable'
import {CreateCategoryModal, EditCategoryModal} from "./Modals";

export const Categories = ({currentPage, limit}: { currentPage: number, limit: number }) => {
    const [categories, setCategories] = useState<GetCategoriesResponse>({categories: [], total: 0, totalPages: 0})
    const [isloading, setisloading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null)

    const fetchCategories = useCallback(async () => {
        setisloading(true)
        const categories = await getCategories({page: currentPage, limit})
        if (categories !== false) {
            setCategories(categories)
            setisloading(false)
        } else {
            setisloading(false)
            setError(true)
        }
    }, [currentPage, limit])

    useEffect(() => {
        fetchCategories().then()
    }, [fetchCategories]);

    const handleCreateCategoryModalOpen = async () => {
        setIsCreateModalOpen((prevState) => !prevState);

        if (isCreateModalOpen) {
            await fetchCategories()
        }
    };

    const handleEditModalOpen = async () => {
        setIsEditModalOpen((prevState) => !prevState);

        if (isEditModalOpen) {
            await fetchCategories()
        }
    }

    const handleSelectCategory = async (category: CategoryDto) => {
        setSelectedCategory(category)
        await handleEditModalOpen()
    }

    return (
        <div className="flex grow flex-col gap-y-2 rounded-lg bg-white p-6 text-principal">
            <PageHeadings label="Categorias" buttonLabel="Adicionar categoria" button={!error}
                          buttonOnClick={handleCreateCategoryModalOpen}/>
            {error && !isloading && (
                <FetchError/>
            )}
            {isloading && (
                <LoadingData/>
            )}
            {isCreateModalOpen && (
                <CreateCategoryModal isOpen={isCreateModalOpen}
                                     onCloseAction={async () => await handleCreateCategoryModalOpen()}/>
            )}
            {!isloading && !error && (
                <CategoriesTable categories={categories.categories}
                                 currentPage={currentPage}
                                 totalCategories={categories.total}
                                 totalPages={categories.totalPages}
                                 selectCategoryAction={handleSelectCategory}
                />
            )}
            {isEditModalOpen && selectedCategory !== null && (
                <EditCategoryModal isOpen={isEditModalOpen} onCloseAction={async () => await handleEditModalOpen()}
                                   category={selectedCategory}/>
            )}
        </div>
    )
}