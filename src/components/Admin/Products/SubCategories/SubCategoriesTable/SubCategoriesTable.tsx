import {Pagination} from "@/components";
import {SubCategoryDto} from "@/helpers";

interface CategoriesTableProps {
    subCategories: SubCategoryDto[],
    selectSubCategoryAction: (subCategory: SubCategoryDto) => void,
    totalPages: number,
    currentPage: number,
    totalSubCategories: number,
}

export const SubCategoriesTable = ({
                                       subCategories,
                                       selectSubCategoryAction,
                                       totalPages,
                                       currentPage,
                                       totalSubCategories
                                   }: CategoriesTableProps) => {

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    <th scope="col" className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-gray-900">
                        Nome
                    </th>
                    <th scope="col" className="relative py-3.5 pr-4 pl-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {subCategories.map((subCategory) => (
                    <tr key={subCategory.id}>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-gray-900">
                            {subCategory.name}
                        </td>
                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap">
                            <button type="button" className="text-principal hover:text-fy cursor-pointer"
                                    onClick={() => selectSubCategoryAction(subCategory)}>
                                Editar<span className="sr-only">, {subCategory.name}</span>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4 pt-4 border border-transparent border-t-principal">
                <Pagination totalPages={totalPages} currentPage={currentPage} totalItems={totalSubCategories}
                            limit={totalSubCategories > 10 ? 10 : totalSubCategories}
                            label='produtos'/>
            </div>
        </div>
    )
}