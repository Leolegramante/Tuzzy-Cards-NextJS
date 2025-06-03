import {Carousel, CategoryList, LatestProducts, PageContainer} from "@/components";
import Image from "next/image";
import bannerPrincipal from '../../../public/assets/banner-1.png';
import bannerSecundario from '../../../public/assets/banner-2.png';
import bannerTerciario from '../../../public/assets/banner-3.png';
import bgImage from '../../../public/assets/bg-spin.svg';

export default function Home() {
    const images = [
        {
            href: 'https://sideboard.com.br/product/details/EXPERIENCIA-PREMIUM-RIVAIS',
            image: bannerPrincipal
        },
        {
            href: 'https://sideboard.com.br/products?subCategoryIds=1', image: bannerSecundario
        },
        {
            href: 'https://www.youtube.com/@TuzzyCards',
            image: bannerTerciario
        }
    ];
    return (
        <>
            <PageContainer
                className='min-h-0 max-w-screen px-0 lg:px-0 py-0 background-pattern-pokeball border-2 border-transparent  border-y-fy'>
                <div className='relative w-full overflow-hidden h-fit pt-4'>
                    <Image src={bgImage} alt='Background' height={500} width={500}
                           className='absolute w-[1200px] h-fit   inset-0 m-auto animate-rotateClockwise origin-center'/>
                    <Carousel images={images}/>
                </div>
            </PageContainer>
            <PageContainer className='min-h-0 w-full max-w-screen overflow-hidden px-0 lg:px-0 py-0 pt-4'>
                <LatestProducts/>
            </PageContainer>
            <PageContainer
                className='min-h-0 w-full max-w-screen background-main-page-categories max-w-screen px-0 lg:px-0 py-0 pt-4'>
                <CategoryList/>
            </PageContainer>
        </>
    );
}
