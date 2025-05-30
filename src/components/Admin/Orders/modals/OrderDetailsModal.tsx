'use client'

import {CancelButton, SubmitButton, TextInput} from "@/components";
import {OrderDto} from "@/helpers";
import {formatCentsToBRL} from "@/utils";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useActionState, useEffect, useRef} from "react";
import Select, {StylesConfig} from "react-select";
import makeAnimated from "react-select/animated";
import {EditOrderState, handleEditOrder} from './action'

type OrderDetailsModalProps = {
    order: OrderDto
    isOpen: boolean
    onCloseAction: () => void
}

type OptionType = {
    value: number;
    label: string;
};

const statusOptions = [
    {
        label: 'Aguardando Pagamento',
        value: 'PENDING'
    },
    {
        label: 'Pago',
        value: 'APPROVED'
    },
    {
        label: 'Processando pagamento',
        value: 'PROCESSING'
    },
    {
        label: 'Aguardando Retirada',
        value: 'AWAITING_PICKUP'
    },
    {
        label: 'Enviado',
        value: 'SHIPPED'
    },
    {
        label: 'Entregue',
        value: 'DELIVERED'
    },
    {
        label: 'Cancelado',
        value: 'CANCELED'
    }
]

enum orderStatusEnum {
    PENDING = 'Aguardando pagamento',
    APPROVED = 'Pago',
    PROCESSING = 'Processando pagamento',
    AWAITING_PICKUP = 'Aguardando retirada',
    SHIPPED = 'Enviado',
    DELIVERED = 'Entregue',
    CANCELED = 'Cancelado',
}

function getDefaultValue(status: string) {
    return {
        label: orderStatusEnum[status as keyof typeof orderStatusEnum],
        value: status
    }
}

const customStyles: StylesConfig<OptionType, false> = {
    menu: (base) => ({...base, zIndex: 1000}),
    menuPortal: (base) => ({...base, zIndex: 1000}),
};

const animatedComponents = makeAnimated();

export function OrderDetailsModal({order, isOpen, onCloseAction}: OrderDetailsModalProps) {
    const initialState: EditOrderState = {
        isValid: undefined,
        errors: null,
        status: order.status,
        id: String(order.id),
    }

    const [state, formAction, isPending] = useActionState<EditOrderState>(async (currentState: EditOrderState) => {
            const formData = new FormData(formRef.current as HTMLFormElement);
            formData.append('id', order.id.toString());
            return await handleEditOrder(currentState, formData)
        },
        initialState
    )

    useEffect(() => {
        if (state.isValid) onCloseAction()
    }, [onCloseAction, state.isValid]);

    const formRef = useRef<HTMLFormElement>(null);
    return (
        <Dialog open={isOpen} onClose={onCloseAction} className="relative z-10 top-1/2">
            <DialogBackdrop
                transition
                className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in fixed inset-0 bg-gray-500/75 transition-opacity"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-lg lg:max-w-3xl sm:p-6"
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
                                <div className='flex flex-col md:flex-row  items-start justify-start gap-4'>
                                    <TextInput
                                        label="Número do pedido"
                                        name="id"
                                        id='id'
                                        type="text"
                                        className="w-full"
                                        defaultValue={order.id}
                                        disabled={true}
                                        error={state.errors?.id}
                                    />
                                    <TextInput
                                        label="Data do pedido"
                                        id='orderData'
                                        name="skorderDatau"
                                        type="text"
                                        className="w-full"
                                        defaultValue={new Date(order.saleDate).toLocaleDateString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                        disabled={true}
                                    />
                                    <div
                                        className='flex flex-col justify-end text-principal text-sm font-semibold w-full my-2'>
                                        <label htmlFor='status'>Status</label>
                                        <Select
                                            id='status'
                                            name='status'
                                            styles={customStyles as StylesConfig<unknown, false>}
                                            closeMenuOnSelect={true}
                                            components={animatedComponents}
                                            options={statusOptions}
                                            defaultValue={getDefaultValue(order.status)}
                                            className='w-full h-10'
                                            menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                            menuPosition='fixed'
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row items-start justify-start gap-4 mt-2 md:mt-0'>
                                    <TextInput
                                        label="Valor total do pedido"
                                        name="total"
                                        id='total'
                                        type="text"
                                        className="w-full"
                                        defaultValue={formatCentsToBRL(order.total)}
                                        disabled={true}
                                    />
                                    <TextInput
                                        label="Nome do cliente"
                                        id='customerName'
                                        name="customerName"
                                        type="text"
                                        className="w-full"
                                        defaultValue={order.user.firstName + ' ' + order.user.lastName}
                                        disabled={true}
                                    />
                                    <TextInput
                                        label="Email do cliente"
                                        id='customerEmail'
                                        name="customerEmail"
                                        type="text"
                                        className="w-full"
                                        defaultValue={order.user.email}
                                        disabled={true}
                                    />
                                </div>
                                <div>
                                    <h2 className='text-md text-principal font-semibold mt-2'>Itens do pedido:</h2>
                                    <div className='flex flex-col items-center w-full'>
                                        {order.items.map((item) => (
                                            <div key={item.id}
                                                 className='flex flex-col md:flex-row items-start md:items-center justify-between  mt-2 w-full bg-gray-100 px-2 md:px-4 py-2 rounded-md'>
                                                <span
                                                    className='text-sm text-principal font-semibold'>{item.product.name}</span>
                                                <span
                                                    className='text-sm text-principal font-normal'>R$ {formatCentsToBRL(item.price)}</span>
                                                <span
                                                    className='text-sm text-principal font-normal'>Quantidade: {item.quantity} {item.quantity > 1 ? "unidades" : 'unidade'}</span>
                                            </div>
                                        ))}
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
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}