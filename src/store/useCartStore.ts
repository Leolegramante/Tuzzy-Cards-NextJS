'use client'

import CryptoJS from 'crypto-js';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

// Chave de criptografia (use claves seguras em produção, como variáveis de ambiente)
const SECRET_KEY = 'your-secret-key-123';

// Função para criptografar
const encrypt = (data: string) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Função para descriptografar
const decrypt = (cipherText: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
        return null; // Retorna nulo em caso de erro
    }
};

export interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    image?: string;
    inStock: boolean;
    width: number;
    height: number;
    depth: number;
    weight: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface ShipmentItem {
    id: number | null;
    name: string;
    price: number;
    boxId: number
}

interface CartState {
    items: CartItem[];
    shipment: ShipmentItem;
    isCartOpen: boolean;
    toggleCart: () => void;
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    updateItemQuantity: (productId: number, newQuantity: number) => void;
    getCartTotal: () => number;
    getTotalItems: () => number;
    addShipment: (shipment: ShipmentItem) => void;
    updateStock: (id: number, inStock: boolean) => void;
    cleanCart: () => void;
    getOrderVolume: () => number;
    getOrderWeight: () => number;
}

// Criação da store com persistência
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            shipment: {
                id: 0,
                name: 'Retirada em loja',
                price: 0,
                boxId: 0,
            },
            isCartOpen: false,
            toggleCart: () => set(state => ({isCartOpen: !state.isCartOpen})),
            addItem: (product) => {
                const {items} = get();
                const existingItem = items.find(item => item.id === product.id);
                if (existingItem) {
                    const updatedItems = items.map(item =>
                        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                    );
                    set({items: updatedItems});
                } else {
                    set(state => ({items: [...state.items, {...product, quantity: 1}]}));
                }
                get().toggleCart();
            },
            removeItem: (productId) => {
                set(state => ({items: state.items.filter(item => item.id !== productId)}));
            },
            updateItemQuantity: (productId, newQuantity) => {
                if (newQuantity <= 0) {
                    get().removeItem(productId);
                } else {
                    set(state => ({
                        items: state.items.map(item =>
                            item.id === productId ? {...item, quantity: newQuantity} : item
                        ),
                    }));
                }
            },
            getCartTotal: () => {
                const {items} = get();
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            getTotalItems: () => {
                const {items} = get();
                return items.reduce((total, item) => total + item.quantity, 0);
            },
            addShipment: (shipment: ShipmentItem) => {
                set({shipment: shipment});
            },
            updateStock: (id: number, inStock: boolean) => {
                set(state => ({
                    items: state.items.map(item =>
                        item.id === id ? {...item, inStock: inStock} : item
                    ),
                }))
            },
            cleanCart: () => {
                set({items: [], shipment: {id: null, name: '', price: 0, boxId: 0}});
            },
            getOrderVolume: () => {
                const {items} = get();
                return items.reduce((total, item) => {
                    return total + (item.width * item.height * item.depth * item.quantity);
                }, 0);
            },
            getOrderWeight: () => {
                const {items} = get();
                return items.reduce((total, item) => {
                    return total + (item.weight * item.quantity);
                }, 0);
            },
            clearShipment: () => {
                set({shipment: {id: null, name: '', price: 0, boxId: 0}});
            },
        }),
        {
            name: 'cart', // Nome da chave no armazenamento
            storage: createJSONStorage(() => sessionStorage, {
                reviver: (key, value) => {
                    if (typeof value === 'string') {
                        const decryptedValue = decrypt(value);
                        if (decryptedValue) return JSON.parse(decryptedValue);
                    }
                    return value;
                },
                replacer: (key, value) => {
                    if (typeof value === 'object') {
                        return encrypt(JSON.stringify(value));
                    }
                    return value;
                }
            }),
        }
    )
);