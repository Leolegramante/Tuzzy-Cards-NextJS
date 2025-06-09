import {useEffect, useState} from 'react';

interface DeviceInfo {
    userAgent: string;
    ipAddress?: string;
    deviceData: {
        colorDepth: number;
        screenHeight: number;
        screenWidth: number;
        timeZoneOffset: number;
    };
}

export const useDeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDeviceInfo = async () => {
            try {
                // Obter IP do cliente usando um serviço externo
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const {ip} = await ipResponse.json();

                const info: DeviceInfo = {
                    userAgent: window.navigator.userAgent,
                    ipAddress: ip,
                    deviceData: {
                        colorDepth: window.screen.colorDepth,
                        screenHeight: window.screen.height,
                        screenWidth: window.screen.width,
                        timeZoneOffset: new Date().getTimezoneOffset() / -60, // Convertendo para horas
                    },
                };

                setDeviceInfo(info);
            } catch (error) {
                console.error('Erro ao obter informações do dispositivo:', error);
                // Fallback com dados básicos se houver erro
                const fallbackInfo: DeviceInfo = {
                    userAgent: window.navigator.userAgent,
                    deviceData: {
                        colorDepth: 24,
                        screenHeight: 1080,
                        screenWidth: 1920,
                        timeZoneOffset: -3,
                    },
                };
                setDeviceInfo(fallbackInfo);
            } finally {
                setLoading(false);
            }
        };

        getDeviceInfo().then();
    }, []);

    return {deviceInfo, loading};
};