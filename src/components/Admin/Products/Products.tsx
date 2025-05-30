"use client";

import {FetchError, LoadingData, PageHeadings} from "@/components";
import {CategoryDto, ProductDto, SubCategoryDto} from "@/helpers";
import {useCallback, useEffect, useState} from "react";
import {getCategories, getProducts, GetProductsResponse, getSubCategories} from "./actions";
import {CreateProductModal, EditProductModal} from "./Modals";
import {ProductsTable} from "./ProductsTable/ProductsTabel";

const useFetchProductsData = ({currentPage, limit}: { currentPage: number, limit: number }) => {
    const [products, setProducts] = useState<GetProductsResponse>({products: [], total: 0, totalPages: 0});
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async ({currentPage, limit}: { currentPage: number, limit: number }) => {
        try {
            // Fetch all data in parallel
            const [product, categories, subCategories] = await Promise.all([
                getProducts({page: currentPage, limit}),
                getCategories(),
                getSubCategories(),
            ]);

            if (product && categories && subCategories) {
                setProducts(product);
                setCategories(categories);
                setSubCategories(subCategories);
                setError(false);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData({currentPage, limit}).then();
    }, [limit, currentPage]); // Only fetch on mount

    // Function to add a new product dynamically
    const addProduct = (newProduct: ProductDto) => {
        setProducts((currentProducts) => ({
            ...currentProducts,
            products: [newProduct, ...currentProducts.products],
        }));
    };

    return {products, categories, subCategories, isLoading, error, addProduct, fetchData};
};

export const Products = ({currentPage, limit}: { currentPage: number, limit: number }) => {
    const {
        products,
        categories,
        subCategories,
        isLoading,
        error,
        addProduct, // Hook retorna esta função
        fetchData
    } = useFetchProductsData({currentPage, limit});

    const [selectProduct, setSelectProduct] = useState<ProductDto | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Memoize the modal state toggle function
    const handleCreateProductModalOpen = useCallback(() => {
        setIsCreateModalOpen((prevState) => !prevState);
    }, []);

    const handleSelectProduct = async (product: ProductDto) => {
        setSelectProduct(product)
        await handleEditModalOpen()
    }

    const handleEditModalOpen = async () => {
        setIsEditModalOpen((prevState) => !prevState)
        if (isEditModalOpen) {
            await fetchData({currentPage, limit})
        }
    }

    return (
        <div className="flex grow flex-col gap-y-2 rounded-lg bg-white p-6 text-principal">
            <PageHeadings
                label="Produtos"
                button={true}
                buttonLabel="Cadastrar Produto"
                buttonOnClick={handleCreateProductModalOpen}
            />

            {error && !isLoading && <FetchError/>}
            {isLoading && <LoadingData/>}
            {!isLoading && !error &&
                <ProductsTable products={products.products} selectProductAction={handleSelectProduct}
                               totalProducts={products.total}
                               totalPages={products.totalPages} currentPage={currentPage}/>}
            {isCreateModalOpen && (
                <CreateProductModal
                    categories={categories}
                    subCategories={subCategories}
                    isOpen={isCreateModalOpen}
                    onCloseAction={handleCreateProductModalOpen}
                    onProductCreated={addProduct} // Adicionada prop para atualizar a listagem
                />
            )}
            {isEditModalOpen && selectProduct !== null && (
                <EditProductModal product={selectProduct} isOpen={isEditModalOpen}
                                  onCloseAction={async () => await handleEditModalOpen()}
                                  subCategories={subCategories} categories={categories}/>
            )}
        </div>
    );
};