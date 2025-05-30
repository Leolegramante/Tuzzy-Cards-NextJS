import {Pagination} from "@/components";
import {ProductDto} from "@/helpers";

interface ProductsTabelProps {
    products: ProductDto[];
    selectProductAction: (product: ProductDto) => void;
    totalPages: number;
    currentPage: number;
    totalProducts: number;
}

export const ProductsTable = ({
                                  products,
                                  selectProductAction,
                                  totalPages,
                                  totalProducts,
                                  currentPage
                              }: ProductsTabelProps) => {
    return (
        <div>
            <table className="w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    <th scope="col"
                        className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal min-w-[200px] max-w-[250px]">
                        Nome
                    </th>
                    <th scope="col"
                        className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal hidden md:table-cell ">
                        SKU
                    </th>
                    <th scope="col" className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal ">
                        Valor
                    </th>
                    <th scope="col"
                        className="py-3.5 pr-3 pl-2 h-[68px] text-sm font-semibold text-principal text-center text-ellipsis overflow-hidden">
                        Quantidade em estoque
                    </th>
                    <th scope="col" className="relative py-3.5 pr-4 pl-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                    <tr key={product.id}>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal min-w-[200px] max-w-[200px] md:max-w-[400px] text-ellipsis overflow-hidden">
                            {product.name}
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal min-w-[151px] hidden md:table-cell">
                            {product.sku}
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal min-w-[80px]">
                            {product.price}
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal text-center min-w-[80px] ">
                            {product.stock ? product.stock.quantityInStock : '0'}
                        </td>
                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap">
                            <button type="button" className="text-principal hover:text-fy cursor-pointer"
                                    onClick={() => selectProductAction(product)}>
                                Editar<span className="sr-only">, {product.name}</span>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4 pt-4 border border-transparent border-t-principal">
                <Pagination totalPages={totalPages} currentPage={currentPage} totalItems={totalProducts}
                            limit={totalProducts > 10 ? 10 : totalProducts}
                            label='produtos'/>
            </div>
        </div>
    )
}