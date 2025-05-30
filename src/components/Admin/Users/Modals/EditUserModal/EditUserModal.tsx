'use client'

import {CancelButton, EmailInput, SubmitButton, TextInput} from "@/components";
import {handleEditUserForm} from "@/components/Admin/Users/Modals/EditUserModal/actions";
import {UserDto} from "@/helpers";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import Select, {StylesConfig} from "react-select";
import makeAnimated from "react-select/animated";

type EditUserModalModalProps = {
    isOpen: boolean;
    onCloseAction: () => void;
    user: UserDto;
};

const selectOptions = [
    {
        label: 'Admin',
        value: 'ADMIN',
    },
    {
        label: 'User',
        value: 'USER',
    },
    {
        label: 'Vendedor',
        value: 'SELLER',
    },
    {
        label: 'Editor',
        value: 'EDITOR',
    },
];

type OptionType = {
    value: string;
    label: string;
};

const animatedComponents = makeAnimated();
const customStyles: StylesConfig<OptionType, false> = {
    control: (provided) => ({
        ...provided,
        height: ' 40px',
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 1000,
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 1000,
    }),
};

export const EditUserModal = ({isOpen, onCloseAction, user}: EditUserModalModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const formAction = async (formData: FormData) => {
        if (user.id && user.uuid && user.username && user.active) {
            setIsLoading(true);
            formData.append('id', user.id);
            formData.append('uuid', user.uuid);
            formData.append('username', user.username)
            formData.append('active', user.active ? 'true' : 'false')
            const result = await handleEditUserForm(formData);
            setIsLoading(false);

            if (result.isValid) {
                onCloseAction();
            } else {
            }
        } else {
            alert('Erro ao atualizar o usuário')
        }
    };

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
                        <form action={formAction} noValidate>
                            <div className="gird grid-cols-1 lg:flex gap-x-2 mt-6">
                                <TextInput
                                    label="Nome"
                                    name="firstName"
                                    type="text"
                                    className="w-full"
                                    defaultValue={user.firstName}
                                />
                                <TextInput
                                    label="Sobrenome"
                                    name="lastName"
                                    type="text"
                                    className="w-full"
                                    defaultValue={user.lastName}
                                />
                            </div>
                            <div className="gird grid-cols-1 lg:flex items-start gap-x-2  mt-6">
                                <EmailInput
                                    label="Email"
                                    name="email"
                                    className="w-full "
                                    defaultValue={user.email}
                                />
                                <div className='text-principal items-start text-sm font-semibold w-full mt-2'>
                                    <label htmlFor='role'>Role</label>
                                    <Select
                                        id='role'
                                        name='role'
                                        styles={customStyles as StylesConfig<unknown, false>}
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        options={selectOptions}
                                        menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                        menuPosition='fixed'
                                        defaultValue={selectOptions.find(option => option.value === user.role)}
                                    />
                                </div>
                            </div>
                            <div className="mt-5 gap-4 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <SubmitButton type="submit" isLoading={isLoading} className="mt-8">
                                    Atualizar
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
}