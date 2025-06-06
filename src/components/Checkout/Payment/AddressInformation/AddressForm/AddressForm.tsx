import {SubmitButton, TextInput} from "@/components";
import {AddressSearchDto} from "@/helpers";
import {useRef} from "react";

export function AddressForm({userAddress}: { userAddress: AddressSearchDto }) {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form className='w-full' ref={formRef}>
            <TextInput name='logradouro' label='Logadouro' defaultValue={userAddress.logradouro}/>
            <TextInput name='complement' label='complemento' defaultValue={userAddress.complemento}/>
            <div className='flex items-center gap-2'>
                <TextInput name='number' label='Número' defaultValue={userAddress.unidade}/>
                <TextInput name='city' label='cidade' defaultValue={userAddress.localidade}/>
                <TextInput name='state' label='Estado' defaultValue={userAddress.estado}/>
            </div>
            <div className="relative flex items-center py-2">
                <input
                    id={'isDefault'}
                    name="plan"
                    type="checkbox"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:bg-principal"
                />
                <div className="ml-3 text-sm">
                    <label htmlFor={`isDefault`} className="font-medium text-principal">
                        Deseja que esse endereço seja seu endereço padrão?
                    </label>
                </div>
            </div>

            <SubmitButton type='submit' label='Cadastrar' className='mt-2'/>
        </form>
    )
}