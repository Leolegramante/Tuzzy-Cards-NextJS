import {CancelButton, SubmitButton} from "@/components";
import {PixInformation} from "@/components/Checkout/PixInformation/PixInformation";
import {OrderDto} from "@/helpers";
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/24/outline";
import Image from "next/image";

import WhatsAppIcon from "../../../../public/assets/WhatsAppIcon.svg";

interface CreateOrderSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: OrderDto
}

export const CreateOrderSuccessModal = ({isOpen, onClose, order}: CreateOrderSuccessModalProps) => {
    const handleRedirectToWhatsApp = () => {
        const phoneNumber = '5511920622949'; // Substitua pelo número de telefone desejado
        const message = `Olá, gostaria de enviar o comprovante do pagamento do pedido ${order.id.toString().padStart(5, '0')}.`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message).replace(/%20/g, '+')}`;
        window.open(url, '_blank');
    }
    return (
        <Dialog open={isOpen} onClose={() => onClose()} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative h-fit my-auto transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 lg:my-0 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div>
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                                <CheckIcon aria-hidden="true" className="size-6 text-green-600"/>
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-xl font-semibold text-principal">
                                    Pedido criado com sucesso!
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-md text-principal opacity-90 text-center">
                                        Para fazer o pagamento, realize o transferência pix com o QRCode a baixo:
                                    </p>
                                    <div className='flex w-full justify-center items-center my-4'>
                                        <PixInformation total={order.total} order={order.id}/>
                                    </div>
                                    <p className='text-md text-principal opacity-90'>
                                        Após o pagamento, envie o comprovante para o WhatsApp da loja no
                                        número:
                                        <br/>
                                        <strong>(11) 920622949.</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <SubmitButton
                                type="button"
                                onClick={() => {
                                    handleRedirectToWhatsApp()
                                    onClose()
                                }}
                                className="inline-flex w-full gap-2 items-center justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-green-500 sm:col-start-2"
                            >
                                <Image src={WhatsAppIcon} alt={'WhatsApp Icon'} width={20} height={20}/>
                                Falar com a loja
                            </SubmitButton>
                            <CancelButton
                                type="button"
                                onClick={() => onClose()}
                                className='mt-2 sm:mt-0'
                            >
                                Fechar
                            </CancelButton>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
