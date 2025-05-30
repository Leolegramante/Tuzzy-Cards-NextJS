import {CPFInput, PhoneInput, TextInput} from "@/components";
import {UserProfileDto} from "@/helpers";

export function ProfileForm({user}: { user: UserProfileDto }) {
    return (
        <form>
            <div className='flex items-center justify-between gap-2 w-full'>
                <TextInput name='firstName' label='Nome' defaultValue={user.firstName} className='w-full'/>
                <TextInput name='lastName' label='Sobrenome' defaultValue={user.lastName} className='w-full'/>
            </div>
            <div className='flex items-center justify-between gap-2 w-full'>
                <TextInput name='username' label='Nome de usuário' defaultValue={user.username} className='w-full'/>
                <TextInput name='email' label='Email' defaultValue={user.email} className='w-full'/>
            </div>
            <div className='flex items-end lg:items-center justify-between gap-2 w-full'>
                <PhoneInput name='phone' label='Telefone' defaultValue={user.phone} className='w-full'/>
                <CPFInput label='CPF' defaultValue={user.cpf} className='w-full' disabled/>
                <TextInput name='associateNumber' label='Número de associado'
                           defaultValue={user.associateNumber.toString().padStart(5, '0')}
                           className='w-full'
                           disabled
                />
            </div>
        </form>
    )
}