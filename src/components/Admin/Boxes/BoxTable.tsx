import {Pagination} from "@/components";
import {BoxDto} from "@/helpers";

interface BoxTableProps {
    boxes: BoxDto[];
    selectBoxAction: (product: BoxDto) => void;
    totalPages: number;
    currentPage: number;
    totalBoxes: number;
}

export function BoxTable({boxes, selectBoxAction, totalBoxes, currentPage, totalPages}: BoxTableProps) {
    return (
        <div>
            <table className="w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    <th scope="col"
                        className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal ">
                        Nome
                    </th>
                    <th scope="col"
                        className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal">
                        Comprimento
                    </th>
                    <th scope="col"
                        className="py-3.5 pr-3 pl-2 text-sm font-semibold text-principal text-left">
                        Profundidade
                    </th>
                    <th scope="col" className="py-3.5 pr-3 pl-2 text-left text-sm font-semibold text-principal">
                        Altura
                    </th>
                    <th scope="col" className="relative py-3.5 pr-4 pl-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {boxes.map((box) => (
                    <tr key={box.id}>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal text-ellipsis overflow-hidden">
                            {box.name}
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal">
                            {(box.width / 10).toFixed(1).replace('.', ',')} cm
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal">
                            {(box.depth / 10).toFixed(1).replace('.', ',')} cm
                        </td>
                        <td className="py-4 pl-2 text-sm font-medium whitespace-nowrap text-principal">
                            {(box.height / 10).toFixed(1).replace('.', ',')} cm
                        </td>
                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap">
                            <button type="button" className="text-principal hover:text-fy cursor-pointer"
                                    onClick={() => selectBoxAction(box)}>
                                Editar<span className="sr-only">, {box.name}</span>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4 pt-4 border border-transparent border-t-principal">
                <Pagination totalPages={totalPages} currentPage={currentPage} totalItems={totalBoxes}
                            limit={totalBoxes > 10 ? 10 : totalBoxes}
                            label='produtos'/>
            </div>
        </div>
    )
}