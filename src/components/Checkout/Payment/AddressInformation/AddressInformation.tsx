import {Address} from "@/helpers";
import {AddressRegistration} from "./AddressRegistration";
import {AddressSelection} from "./AddressSelection";

interface AddressInformationProps {
    addresses: Address[];
    onUserCreatedAction: () => void;
}

export function AddressInformation({addresses, onUserCreatedAction}: AddressInformationProps) {
    return (
        <div className='bg-white px-6 py-4 mt-4 shadow-sm sm:rounded-lg sm:px-12'>
            {addresses.length > 0 ? (
                <AddressSelection addresses={addresses} onAddressCreated={onUserCreatedAction}/>
            ) : (
                <AddressRegistration onUserCreatedAction={onUserCreatedAction}/>
            )}
        </div>
    );
}