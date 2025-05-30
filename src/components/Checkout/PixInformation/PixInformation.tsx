'use client'

import {SubmitButton} from "@/components";
import {QrCodePix} from "qrcode-pix";
import {useEffect, useState} from "react";

interface PixInformationProps {
    total: number
    order: number
}

export function PixInformation({order, total}: PixInformationProps) {
    const [qrcode, setQrcode] = useState<string | null>(null)
    const [payload, setPayload] = useState<string | null>(null)

    useEffect(() => {
        const generateQRCode = async () => {
            const qrCode = QrCodePix({
                version: '01',
                key: '11920622949',
                name: 'Leonardo Legramante',
                city: 'Campinas',
                transactionId: `${order}-TX-${Date.now()}`,
                value: total / 100
            })

            const base64 = await qrCode.base64();
            const payload = qrCode.payload();

            setQrcode(base64);
            setPayload(payload);
        }
        generateQRCode().then()
    }, [order, total])

    const copiarPayload = () => {
        if (payload) navigator.clipboard.writeText(payload)
            .then(() => alert('Copia e Cola copiado!'))
            .catch(() => alert('Erro ao copiar'));
    };

    return (
        <div>
            {qrcode && (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrcode} alt="QR Code PIX"/>
                    <div>
                        <SubmitButton onClick={copiarPayload} className='mt-3'>Copiar</SubmitButton>
                    </div>
                </>
            )}
        </div>
    );
}