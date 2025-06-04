"use client";

import {
    CancelButton,
    PriceInput,
    ProductSizeInput,
    ProductWeightInput,
    SubmitButton,
    TextArea,
    TextInput,
} from "@/components";
import {CategoryDto, ProductDto, SubCategoryDto} from "@/helpers";
import {Image as ImageType} from "@/helpers/dto/Register/products/product.dto";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {useActionState, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Select, {StylesConfig} from "react-select";
import makeAnimated from "react-select/animated";
import {EditProductState, handleProductForm, handleRemoveProductImage} from "./actions";

type CreateProductModalProps = {
    categories: CategoryDto[];
    subCategories: SubCategoryDto[];
    isOpen: boolean;
    onCloseAction: () => void;
    product: ProductDto
};

type OptionType = {
    value: number;
    label: string;
};

// Constants and Utilities
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 500 KB
const MAX_FILES = 10;

const animatedComponents = makeAnimated();

const customStyles: StylesConfig<OptionType, false> = {
    menu: (base) => ({...base, zIndex: 1000}),
    menuPortal: (base) => ({...base, zIndex: 1000}),
};

function validateAmountFiles(localFiles: File[], backendFiles: ImageType[]): void {
    if (localFiles.length + backendFiles.length >= MAX_FILES) {
        throw new Error(`Você pode cadastrar no máximo ${MAX_FILES} imagens.`);
    }
}

function validateFiles(files: File[], maxFileSize: number, maxFiles: number): File[] {
    if (files.length > maxFiles) {
        throw new Error(`No máximo ${maxFiles} imagens podem ser enviadas.`);
    }
    return files.filter((file) => {
        if (file.size > maxFileSize) {
            throw new Error(
                `A imagem "${file.name}" excede o limite de ${maxFileSize / 1024 / 1024}MB.`
            );
        }
        return true;
    });
}

export const EditProductModal = ({
                                     isOpen,
                                     onCloseAction,
                                     categories,
                                     subCategories,
                                     product,
                                 }: CreateProductModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [images, setImages] = useState<File[]>([]);
    const [backEndImages, setBackEndImages] = useState<ImageType[]>([]);

    const productsCategories = useMemo(() => {
        return product.productCategories
            ? product.productCategories.map((productCategory) => productCategory.id)
            : [];
    }, [product.productCategories]);

    const productsSubCategories = useMemo(() => {
        return product.productSubCategories
            ? product.productSubCategories.map((productSubCategory) => productSubCategory.id)
            : [];
    }, [product.productSubCategories]);

    // Estado inicial para o formulário
    const initialState: EditProductState = useMemo(
        () => ({
            isValid: undefined,
            errors: null,
            id: Number(product.id) || 0,
            name: product.name,
            sku: product.sku,
            price: String(product.price),
            quantityInStock: product.stock?.quantityInStock ? product.stock.quantityInStock : 0,
            description: product.description.replace(/<br\s*\/?>/gi, "\n"),
            categories: productsCategories,
            subCategories: productsSubCategories,
            width: product.width || 0,
            height: product.height || 0,
            depth: product.depth || 0,
            weight: product.weight || 0,
        }),
        [product, productsCategories, productsSubCategories]
    );

    const [state, formAction, isPending] = useActionState<EditProductState>(
        async (currentState: EditProductState) => {
            const formData = new FormData(formRef.current as HTMLFormElement);
            formData.append('id', String(currentState.id));
            return await handleProductForm(currentState, formData, images);
        },
        initialState
    );

    useEffect(() => {
        if (state.isValid) onCloseAction()
        if (product.backendImages) setBackEndImages(product.backendImages);
    }, [state.isValid, onCloseAction, product]);

    const categoriesOptions = useMemo(
        () => categories.map((category) => ({label: category.name, value: category.id})),
        [categories]
    );

    const subCategoriesOptions = useMemo(
        () => subCategories.map((subCategory) => ({label: subCategory.name, value: subCategory.id})),
        [subCategories]
    );

    const getSelectedFiles = (event: React.ChangeEvent<HTMLInputElement>): File[] =>
        event.target.files ? Array.from(event.target.files) : [];

    const handleFileUploadError = (error: unknown) => {
        const errorMessage = error instanceof Error
            ? error.message
            : "Erro ao enviar imagens. Tente novamente.";
        alert(errorMessage);
    };

    const handleImageChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            try {
                validateAmountFiles(getSelectedFiles(e), backEndImages);
                const selectedFiles = getSelectedFiles(e);
                const updatedImages = validateFiles([...images, ...selectedFiles], MAX_FILE_SIZE, MAX_FILES);
                setImages(updatedImages);
            } catch (error) {
                handleFileUploadError(error);
            }
        },
        [backEndImages, images]
    );

    const handleRemoveLocalImage = useCallback((image: File) => {
        setImages(images.filter((file) => file !== image));
    }, [images])

    const handleRemoveBackendImage = useCallback(async (imageId: number) => {
        const response = await handleRemoveProductImage(imageId)
        if (response.isValid) {
            setBackEndImages(backEndImages.filter((image) => image.id !== imageId));
        }
    }, [backEndImages]);

    const openFileDialog = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    return (
        <Dialog open={isOpen} onClose={onCloseAction} className="relative z-10">
            <DialogBackdrop
                transition
                className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in fixed inset-0 bg-gray-500/75 transition-opacity"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="my-auto data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                    >
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button
                                type="button"
                                onClick={onCloseAction}
                                className="focus:outline-hidden rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon aria-hidden="true" className="size-6"/>
                            </button>
                        </div>
                        <form noValidate action={formAction} ref={formRef}>
                            <div className=" mt-6">
                                <div className='flex items-start justify-center gap-4'>
                                    <TextInput
                                        label="Nome"
                                        name="name"
                                        id='name'
                                        type="text"
                                        className="w-full"
                                        defaultValue={state.name}
                                        error={state.errors?.name}
                                    />
                                    <TextInput
                                        label="SKU"
                                        id='sku'
                                        name="sku"
                                        type="text"
                                        className="w-full"
                                        defaultValue={state.sku}
                                    />
                                </div>
                                <div className='flex items-center justify-center gap-4'>
                                    <PriceInput label="Preço" defaultValue={state.price}/>
                                    <TextInput
                                        label='Quantidade em estoque'
                                        id='quantityInStock'
                                        name="quantityInStock"
                                        type='number'
                                        className='w-full'
                                        defaultValue={state.quantityInStock}
                                    />
                                </div>

                                <div className='flex items-start justify-center gap-4'>
                                    <div className='text-principal text-sm font-semibold w-full'>
                                        <label htmlFor='categories'>Categorias</label>
                                        <Select
                                            id='categories'
                                            name='categories'
                                            isMulti
                                            styles={customStyles}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={categoriesOptions}
                                            defaultValue={categoriesOptions.filter((option) =>
                                                productsCategories.includes(option.value)
                                            )}
                                            className='w-full'
                                            menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                            menuPosition='fixed'
                                        />
                                    </div>
                                    <div className='text-principal text-sm font-semibold w-full'>
                                        <label htmlFor='subCategories'>Sub categorias</label>
                                        <Select
                                            id='subCategories'
                                            name='subCategories'
                                            isMulti
                                            styles={customStyles}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={subCategoriesOptions}
                                            defaultValue={subCategoriesOptions.filter((option) =>
                                                productsSubCategories.includes(option.value)
                                            )}
                                            className='w-full'
                                            menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                            menuPosition='fixed'
                                        />
                                    </div>
                                </div>
                                <TextArea label='Descrição'
                                          id='description'
                                          name='description'
                                          rows={4}
                                          defaultValue={state.description}
                                />

                                <div className='flex items-start justify-center gap-4'>
                                    <ProductSizeInput name='width' label='Comprimento' defaultValue={state.width}/>
                                    <ProductSizeInput name='height' label='Altura' defaultValue={state.height}/>
                                    <ProductSizeInput name='depth' label='largura' defaultValue={state.depth}/>
                                    <ProductWeightInput name='weight' label='Peso' defaultValue={state.weight}/>
                                </div>

                                <div className="text-principal text-sm font-semibold">
                                    <label className="block mb-1">
                                        Imagens do produto (máx. 10 imagens totalizando 5Mb)
                                    </label>

                                    <button
                                        type="button"
                                        onClick={openFileDialog}
                                        className="text-gray-50transition-colors inline-flex w-full justify-center rounded-lg bg-fy px-3 py-2 text-sm font-semibold cursor-pointer text-gray-50 hover:bg-principal active:bg-principal active:text-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        Selecionar imagens
                                    </button>

                                    <input
                                        type="file"
                                        id="images"
                                        accept="image/*"
                                        multiple
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                    {backEndImages.length > 0 && <p className='mt-4 text-lg'>Imagens do produto:</p>}
                                    <ul role="list"
                                        className="grid grid-cols-3 gap-x-4 gap-y-2 sm:gap-x-6 xl:gap-x-8 mt-2">
                                        {backEndImages.length > 0 && backEndImages.map((image, index) => (
                                                <li key={index}
                                                    className="relative flex flex-row justify-between items-center gap-x-2 bg-gray-100 mt-2 rounded-lg shadow-sm">
                                                    <button
                                                        type='button'
                                                        className='absolute bg-red-600 text-white h-5 w-5 rounded-full top-[-8] right-[-8] cursor-pointer flex items-center justify-center'
                                                        onClick={() => handleRemoveBackendImage(image.id)}
                                                    >
                                                        <XMarkIcon className='size-4'/>
                                                    </button>
                                                    <Image src={image.url}
                                                           alt={`Product Image ${index}`}
                                                           height={100}
                                                           width={100}
                                                           className='w-auto h-auto'
                                                    />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    {images.length > 0 && <p className='mt-4 text-lg'>Imagens adicionadas agora:</p>}
                                    <ul role="list"
                                        className="grid grid-cols-3 gap-x-4 gap-y-2 sm:gap-x-6 xl:gap-x-8 mt-2">
                                        {images.length > 0 && images.map((image, index) => (
                                                <li key={index}
                                                    className="relative flex flex-row justify-between items-center gap-x-2 bg-gray-100 mt-2 rounded-lg shadow-sm">
                                                    <button
                                                        type='button'
                                                        className='absolute bg-red-600 text-white h-5 w-5 rounded-full top-[-8] right-[-8] cursor-pointer flex items-center justify-center'
                                                        onClick={() => handleRemoveLocalImage(image)}
                                                    >
                                                        <XMarkIcon className='size-4'/>
                                                    </button>
                                                    <Image src={URL.createObjectURL(image)}
                                                           alt={`Product Image ${index}`}
                                                           height={100}
                                                           width={100}
                                                           className='w-auto h-auto'
                                                    />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-5 gap-4 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <SubmitButton type="submit" className="mt-8" isLoading={isPending}>
                                    Editar produto
                                </SubmitButton>
                                <CancelButton type="button" onClick={() => onCloseAction()}>
                                    Cancelar
                                </CancelButton>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};