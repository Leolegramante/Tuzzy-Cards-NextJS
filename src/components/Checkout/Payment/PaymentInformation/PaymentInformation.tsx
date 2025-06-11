'use client'

import {useCartStore} from "@/store/useCartStore";
import valid from 'card-validator';
import {useState} from 'react';
import {
    FaCalendarAlt,
    FaCcAmex,
    FaCcDinersClub,
    FaCcDiscover,
    FaCcMastercard,
    FaCcVisa,
    FaCreditCard,
    FaLock,
    FaUser
} from 'react-icons/fa';
import {MdPix} from 'react-icons/md';

type PaymentMethod = 'credit' | 'pix' | '';

interface CardData {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
    installments: string;
}

type CardDataField = keyof CardData;

export function PaymentInformation() {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('');
    const [ccBrand, setCcBrand] = useState<string>('');
    const {addCard} = useCartStore()

    const [cardData, setCardData] = useState<CardData>({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
        installments: '1'
    });

    const handleCardDataChange = (field: CardDataField, value: string): void => {
        if (field === 'number') {
            const getCardBrand = valid.number(value);
            if (getCardBrand.card) {
                setCcBrand(getCardBrand.card.type)
            }
            value = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
            if (value.length > 19) value = value.slice(0, 19);
        } else if (field === 'expiry') {
            value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
            if (value.length > 5) value = value.slice(0, 5);
        } else if (field === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 4);
        }

        setCardData(prev => ({...prev, [field]: value}));
        addCard({
            type: selectedMethod,
            number: cardData.number.replace(/ /g, ""),
            name: cardData.name,
            expiry: cardData.expiry,
            cvv: cardData.cvv,
            installments: Number(cardData.installments)
        });
    };

    const handleMethodChange = (paymentMethod: PaymentMethod) => {
        setSelectedMethod(paymentMethod)
        addCard({
            type: paymentMethod,
            number: '',
            name: '',
            expiry: '',
            cvv: '',
            installments: 0
        });
    }

    return (
        <div className="bg-white px-6 py-4 mt-4 shadow-sm sm:rounded-lg sm:px-12 w-full">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Forma de Pagamento</h2>
                <p className="text-gray-600">Escolha como deseja pagar sua compra</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Método de Pagamento</h3>
                    <div
                        className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                            selectedMethod === 'credit'
                                ? 'border-principal bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleMethodChange('credit')}
                    >
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="payment"
                                value="credit"
                                checked={selectedMethod === 'credit'}
                                onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
                                className="h-4 w-4 text-blue-600 focus:ring-principal border-gray-300"
                            />
                            <div className="ml-3 flex items-center">
                                <FaCreditCard className="h-6 w-6 text-gray-400 mr-3"/>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Cartão de Crédito</p>
                                    <p className="text-sm text-gray-500">Visa, Mastercard, Elo, Amex</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedMethod === 'credit' && (
                        <div className="p-6 bg-gray-50 rounded-lg space-y-4">
                            <div className="flex items-center mb-4">
                                <FaLock className="h-5 w-5 text-green-500 mr-2"/>
                                <span className="text-sm text-gray-600">Seus dados estão protegidos</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Número do Cartão */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Número do Cartão
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            value={cardData.number}
                                            onChange={(e) => handleCardDataChange('number', e.target.value)}
                                            className="w-full px-3 py-2 text-principal border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-principal focus:border-transparent"
                                            required
                                        />
                                        {ccBrand === '' &&
                                            <FaCreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"/>}
                                        {ccBrand === 'visa' &&
                                            <FaCcVisa className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"/>}
                                        {ccBrand === 'mastercard' || ccBrand === 'maestro' &&
                                            <FaCcMastercard
                                                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"/>}
                                        {ccBrand === 'american-express' &&
                                            <FaCcAmex
                                                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"/>}
                                        {ccBrand === 'diners-club' &&
                                            <FaCcDinersClub
                                                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"/>}
                                        {ccBrand === 'discover' &&
                                            <FaCcDiscover
                                                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"/>}
                                    </div>
                                </div>

                                {/* Nome no Cartão */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nome no Cartão
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="João Silva"
                                            value={cardData.name}
                                            onChange={(e) => handleCardDataChange('name', e.target.value.toUpperCase())}
                                            className="w-full px-3 py-2 text-principal border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-principal focus:border-transparent"
                                            required
                                        />
                                        <FaUser className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"/>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Validade
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="MM/AA"
                                            value={cardData.expiry}
                                            onChange={(e) => handleCardDataChange('expiry', e.target.value)}
                                            className="w-full px-3 py-2 text-principal border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-principal focus:border-transparent"
                                            required
                                        />
                                        <FaCalendarAlt className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"/>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        value={cardData.cvv}
                                        maxLength={3}
                                        onChange={(e) => handleCardDataChange('cvv', e.target.value)}
                                        className="w-full px-3 py-2 text-principal border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-principal focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Parcelas
                                    </label>
                                    <select
                                        value={cardData.installments}
                                        onChange={(e) => handleCardDataChange('installments', e.target.value)}
                                        className="w-full h-[41.8px] px-3 py-2 text-principal border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-principal focus:border-transparent cursor-pointer"
                                    >
                                        <option value="1">1x sem juros</option>
                                        <option value="2">2x sem juros</option>
                                        <option value="3">3x sem juros</option>
                                        <option value="4">4x sem juros</option>
                                        <option value="5">5x sem juros</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div
                        className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                            selectedMethod === 'pix'
                                ? 'border-principal bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleMethodChange('pix')}
                    >
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="payment"
                                value="pix"
                                checked={selectedMethod === 'pix'}
                                onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
                                className="h-4 w-4 text-blue-600 focus:ring-principal border-gray-300"
                            />
                            <div className="ml-3 flex items-center">
                                <MdPix className="h-6 w-6 text-gray-400 mr-3"/>
                                <div>
                                    <p className="text-sm font-medium text-principal">PIX</p>
                                    <p className="text-sm text-gray-500">Pagamento instantâneo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {selectedMethod === 'pix' && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                        <div className="text-center">
                            <MdPix className="h-12 w-12 text-principal mx-auto mb-4"/>
                            <h3 className="text-lg font-semibold text-principal mb-2">Pagamento via PIX</h3>
                            <p className="text-gray-600 mb-4">
                                Após confirmar, você receberá o código PIX para realizar o pagamento instantâneo.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}