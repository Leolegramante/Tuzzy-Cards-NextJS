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
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {useActionState, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Select, {StylesConfig} from "react-select";
import makeAnimated from "react-select/animated";
import {CreateProductState, handleProductForm} from "./actions";

type CreateProductModalProps = {
    categories: CategoryDto[];
    subCategories: SubCategoryDto[];
    isOpen: boolean;
    onCloseAction: () => void;
    onProductCreated?: (product: ProductDto) => void; // Atualiza produto na listagem
};

type OptionType = {
    value: number;
    label: string;
};

// Constants and Utilities
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 10;

const animatedComponents = makeAnimated();

const customStyles: StylesConfig<OptionType, false> = {
    menu: (base) => ({...base, zIndex: 1000}),
    menuPortal: (base) => ({...base, zIndex: 1000}),
};

function validateFiles(files: File[], maxFileSize: number, maxFiles: number): File[] {
    if (files.length > maxFiles) {
        throw new Error(`No máximo ${maxFiles} imagens podem ser enviadas.`);
    }
    return files.filter((file) => {
        if (file.size > maxFileSize) {
            throw new Error(
                `A imagem "${file.name}" excede o limite de ${maxFileSize / 1024}KB.`
            );
        }
        return true;
    });
}

export const CreateProductModal = ({
                                       isOpen,
                                       onCloseAction,
                                       categories,
                                       subCategories,
                                       onProductCreated,
                                   }: CreateProductModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [images, setImages] = useState<File[]>([]);

    // Estado inicial para o formulário
    const initialState: CreateProductState = useMemo(
        () => ({
            isValid: undefined,
            errors: null,
            name: "",
            sku: "",
            price: 0,
            quantityInStock: 0,
            description: "",
            categories: [],
            subCategories: [],
            width: 0,
            height: 0,
            depth: 0,
            weight: 0,
        }),
        []
    );

    const [state, formAction, isPending] = useActionState<CreateProductState>(
        async (currentState: CreateProductState) => {
            const formData = new FormData(formRef.current as HTMLFormElement);
            const newState = await handleProductForm(currentState, formData, images);

            if (newState.isValid && onProductCreated) {
                const newProduct: ProductDto = {
                    id: Date.now(), // ID simulado; substituir pelo ID real retornado do backend
                    name: newState.name,
                    sku: newState.sku,
                    price: newState.price,
                    quantityInStock: newState.quantityInStock,
                    categories: newState.categories,
                    subCategories: newState.subCategories,
                    description: newState.description,
                };

                onProductCreated(newProduct); // Atualiza a listagem
            }

            return newState;
        },
        initialState
    );

    useEffect(() => {
        if (state.isValid) onCloseAction();
    }, [state.isValid, onCloseAction]);

    const categoriesOptions = useMemo(
        () => categories.map((category) => ({label: category.name, value: category.id})),
        [categories]
    );

    const subCategoriesOptions = useMemo(
        () => subCategories.map((subCategory) => ({label: subCategory.name, value: subCategory.id})),
        [subCategories]
    );

    const handleImageChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            try {
                const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
                const validatedFiles = validateFiles([...images, ...selectedFiles], MAX_FILE_SIZE, MAX_FILES);
                setImages(validatedFiles);
            } catch (error) {
                alert(error instanceof Error ? error.message : "Erro ao enviar imagens. Tente novamente.");
            }
        },
        [images]
    );

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
                            <div className="space-y-4 mt-6">
                                <div className='flex items-center justify-center gap-4'>
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
                                    <PriceInput label="Preço"/>
                                    <TextInput
                                        label='Quantidade em estoque'
                                        id='quantityInStock'
                                        name="quantityInStock"
                                        type='number'
                                        className='w-full'
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
                                    <ProductSizeInput name='depth' label='Largura' defaultValue={state.depth}/>
                                    <ProductSizeInput name='height' label='Altura' defaultValue={state.height}/>
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

                                    <ul role="list"
                                        className="grid grid-cols-1 gap-x-4 gap-y-2  sm:gap-x-6 xl:gap-x-8">
                                        {images.length > 0 &&
                                            <p className='mt-4 text-lg'>Imagens adicionadas agora:</p>}
                                        <ul role="list"
                                            className="grid grid-cols-3 gap-x-4 gap-y-2 sm:gap-x-6 xl:gap-x-8 mt-2">
                                            {images.length > 0 && images.map((image, index) => (
                                                    <li key={index}
                                                        className="relative flex flex-row justify-between items-center gap-x-2 bg-gray-100 mt-2 rounded-lg shadow-sm">
                                                        <button
                                                            type='button'
                                                            className='absolute bg-red-600 text-white h-5 w-5 rounded-full top-[-8] right-[-8] cursor-pointer flex items-center justify-center'
                                                            onClick={() => setImages(images.filter(img => img !== image))}
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
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-5 gap-4 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <SubmitButton type="submit" className="mt-8" isLoading={isPending}>
                                    Criar
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