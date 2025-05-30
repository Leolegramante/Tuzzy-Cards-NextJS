'use client'

import {GetProduct} from "@/app/product/details/[...id]/actions";
import {Breadcrumbs, FetchError, LoadingData, PageContainer} from "@/components";
import {ProductDto} from "@/helpers";
import {cn} from "@/helpers/cs";
import {Image as ImageType} from "@/helpers/dto/Register/products/product.dto";
import {useCartStore} from "@/store/useCartStore";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useCallback, useEffect, useState} from "react";

const ProductDetailsPage = () => {
    const [slug, setSlug] = useState<string>('')
    const [isloading, setisloading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [product, setProduct] = useState<ProductDto | undefined>()
    const [productImages, setProductImages] = useState<ImageType[]>([]);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const pathname = usePathname();
    const {addItem} = useCartStore();

    const pages = [
        {name: 'Todos os produtos', href: '/products', current: false},
        {name: 'Detalhes do produto', href: `/product/details/${slug}`, current: true},
    ]

    useEffect(() => {
        setisloading(true)
        const pathParts = pathname.split('/');
        const extractedSlug = pathParts[pathParts.length - 1];
        setSlug(extractedSlug)
        GetProduct(extractedSlug).then((res) => {
            if (res.isValid && res.product) {
                setisloading(false)
                setProduct(res.product)
                if (res.product.backendImages && res.product.backendImages.length > 0) {
                    setProductImages(res.product.backendImages);
                }
            } else {
                setisloading(false)
                setError(true)
            }
        })
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // define inicialmente

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % productImages.length);
    }, [productImages.length]);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    }, [productImages.length]);

    const goToIndex = (index: number) => {
        setActiveIndex(index);
    };

    const mainSize = productImages.length > 1 ? 300 : 650;

    return (
        <PageContainer>
            <Breadcrumbs pages={pages}/>
            {isloading && <LoadingData/>}
            {!isloading && error && (<FetchError/>)}
            {typeof product !== 'undefined' && (
                <div className="pb-8">
                    <div className="mx-auto mt-4 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                                <h2 className="sr-only">Images</h2>
                                {isMobile ? (
                                    <div className="flex flex-col items-center space-y-4 overflow-hidden">
                                        <div className="flex items-center space-x-4">
                                            {/* Imagem Principal */}
                                            <div className={'relative'}
                                                 style={{width: `${mainSize}px`, height: `${mainSize}px`}}>
                                                <Image
                                                    src={productImages[activeIndex].url}
                                                    alt={`imagem ${1}`}
                                                    fill
                                                    sizes={`(max-width: 640px) ${mainSize}px, ${mainSize}px`}
                                                    style={{objectFit: 'cover'}}
                                                    className="rounded-lg"
                                                    priority
                                                />
                                            </div>
                                        </div>

                                        {/* Central de Navegação com setas e bolinhas */}
                                        <div
                                            className="flex items-center justify-between space-x-4 bg-background rounded-t-lg px-2">
                                            <button
                                                onClick={goToPrev}
                                                aria-label="Anterior"
                                                className="p-2 rounded-full transition cursor-pointer"
                                            >
                                                ◀
                                            </button>

                                            <div className="flex space-x-2 justify-between items-center">
                                                {productImages.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => goToIndex(index)}
                                                        aria-label={`Ir para imagem ${index + 1}`}
                                                        className={cn(
                                                            'w-3 h-3 rounded-full transition cursor-pointer',
                                                            index === activeIndex ? 'bg-principal' : 'bg-gray-300'
                                                        )}
                                                    />
                                                ))}
                                            </div>

                                            <button
                                                onClick={goToNext}
                                                aria-label="Próxima"
                                                className="p-2 rounded-full transition cursor-pointer"
                                            >
                                                ▶
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 lg:gap-y-2">
                                        {product.backendImages?.map((image, index) => (
                                            <Image
                                                key={image.id}
                                                alt={`Product Image ${index + 1}`}
                                                src={image.url}
                                                width={mainSize}
                                                height={mainSize}
                                                className={cn(productImages.length > 1 ? '' : 'col-span-2 row-span-2', 'rounded-lg')}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="lg:col-span-5 lg:col-start-8">
                                <div className="flex flex-col items-start gap-y-6 mt-2 lg:mt-0">
                                    <h1 className="text-2xl font-bold text-principal">{product.name}</h1>
                                    <p className="text-xl font-bold text-principal">{product.price}</p>
                                </div>

                                {product?.stock?.quantityInStock !== undefined && product.stock.quantityInStock > 0 && (
                                    <button
                                        onClick={() => addItem({
                                            id: Number(product.id) || 0,
                                            name: product.name,
                                            image: product.backendImages ? product.backendImages[0].url : '',
                                            sku: product.sku,
                                            price: product?.priceInCents ? product.priceInCents : 0,
                                            inStock: true
                                        })}
                                        type='button'
                                        className='w-full h-14 bg-principal text-fy text-lg rounded-lg mt-4 hover:text-principal hover:bg-fy cursor-pointer'
                                    >
                                        Adicionar ao carrinho
                                    </button>
                                )}
                            </div>

                            <div className="mt-10 lg:col-span-5">
                                <h2 className="text-lg font-medium text-gray-900">Descrição do produto</h2>
                                <div
                                    dangerouslySetInnerHTML={{__html: product.description}}
                                    className="mt-4 space-y-4 text-mb text-principal"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </PageContainer>
    )
}

export default ProductDetailsPage