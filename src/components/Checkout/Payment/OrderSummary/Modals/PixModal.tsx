'use client'

import {SubmitButton} from "@/components";
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import {ExclamationTriangleIcon} from "@heroicons/react/20/solid";
import Image from "next/image";

export type PixProps = {
    dateTimeExpiration: string;
    qrCodeData: string;
    qrCodeImage: string;
}

export type PixModalProps = {
    pixProps: PixProps
    isOpen: boolean,
    onCloseAction: () => void
}

export function PixModal({onCloseAction, isOpen, pixProps}: PixModalProps) {
    const copiarPayload = () => {
        if (pixProps.qrCodeData) navigator.clipboard.writeText(pixProps.qrCodeData)
            .then(() => alert('Copia e Cola copiado!'))
            .catch(() => alert('Erro ao copiar'));
    };
    return (
        <div>
            <Dialog open={isOpen} onClose={onCloseAction} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div>
                                <div
                                    className="mx-auto flex size-12 items-center justify-center rounded-full bg-yellow-100">
                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-yellow-400"/>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Para confirmar seu pedido, realize o pix a baixo:
                                    </DialogTitle>
                                    <div className="flex flex-col items-center justify-between mt-2">
                                        <Image
                                            src={`data:image/png;base64,${pixProps.qrCodeImage}`}
                                            alt="QR Code"
                                            width={250}
                                            height={250}
                                            unoptimized // Required for data URLs
                                        />
                                        <div>
                                            <SubmitButton onClick={copiarPayload} className='mt-3'
                                                          type={'button'}>Copiar</SubmitButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    onClick={onCloseAction}
                                    className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                                >
                                    Confirmar pagamento
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}