'use client'

import {CancelButton, ProductSizeInput, SubmitButton, TextInput} from "@/components";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useActionState, useEffect, useMemo, useRef} from "react";
import {CreateBoxState, handleBoxForm} from "./actions";

type CreateBoxModalProps = {
    isOpen: boolean;
    onCloseAction: () => void;
}

export const CreateBoxModal = ({isOpen, onCloseAction}: CreateBoxModalProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const initialState: CreateBoxState = useMemo(() => ({
        isValid: undefined,
        errors: null,
        name: '',
        width: 0,
        height: 0,
        depth: 0
    }), []);

    const [state, formAction, isPending] = useActionState<CreateBoxState>(
        async (currentState: CreateBoxState) => {
            const formData = new FormData(formRef.current as HTMLFormElement);
            return await handleBoxForm(currentState, formData);
        },
        initialState
    )

    useEffect(() => {
        if (state.isValid) onCloseAction();
    }, [state.isValid, onCloseAction]);

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
                                </div>

                                <div className='flex items-start justify-center gap-4'>
                                    <ProductSizeInput name='width' label='Comprimento' defaultValue={state.width}/>
                                    <ProductSizeInput name='depth' label='Profundidade' defaultValue={state.depth}/>
                                    <ProductSizeInput name='height' label='Altura' defaultValue={state.height}/>
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
    )
}