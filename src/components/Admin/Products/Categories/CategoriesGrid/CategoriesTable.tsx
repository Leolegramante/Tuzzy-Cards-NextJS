import {Pagination} from "@/components";
import {CategoryDto} from "@/helpers";

interface CategoriesGridProps {
    categories: CategoryDto[],
    selectCategoryAction: (category: CategoryDto) => void,
    totalPages: number,
    currentPage: number,
    totalCategories: number,
}

export const CategoriesTable = ({
                                    categories,
                                    totalCategories,
                                    currentPage,
                                    totalPages,
                                    selectCategoryAction
                                }: CategoriesGridProps) => {
    return (
        <div>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    <th scope="col" className="py-3.5 pr-3 pl-2 text-left text-lg font-semibold text-gray-900">
                        Nome
                    </th>
                    <th scope="col" className="relative py-3.5 pr-4 pl-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td className="py-4 pl-2 text-lg font-principal whitespace-nowrap text-gray-900">
                            {category.name}
                        </td>
                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap">
                            <button type="button" className="text-principal hover:text-fy cursor-pointer"
                                    onClick={() => selectCategoryAction(category)}>
                                Editar<span className="sr-only">, {category.name}</span>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4 pt-4 border border-transparent border-t-principal">
                <Pagination totalPages={totalPages} currentPage={currentPage} totalItems={totalCategories}
                            limit={totalCategories > 10 ? 10 : totalCategories}
                            label='produtos'/>
            </div>
        </div>
    )
}