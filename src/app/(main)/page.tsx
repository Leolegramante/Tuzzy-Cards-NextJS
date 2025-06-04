import {Carousel, CategoryList, LatestProducts, PageContainer} from "@/components";
import Image from "next/image";
import expPremiumBanner from '../../../public/assets/banner-1.png';
import engProductsBanner from '../../../public/assets/banner-2.png';
import youtubeBanner from '../../../public/assets/banner-3.png';
import lorcanaBanner from '../../../public/assets/banner-4.png';
import bgImage from '../../../public/assets/bg-spin.svg';

export default function Home() {
    const images = [
        {
            href: 'https://sideboard.com.br/product/details/EXPERIENCIA-PREMIUM-RIVAIS',
            image: expPremiumBanner
        },
        {
            href: 'https://sideboard.com.br/products?subCategoryIds=1',
            image: engProductsBanner
        },
        {
            href: 'https://www.youtube.com/@TuzzyCards',
            image: youtubeBanner
        },
        {
            href: 'https://sideboard.com.br/products?categoryIds=20',
            image: lorcanaBanner
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
            <PageContainer
                className='min-h-0 w-full max-w-screen overflow-hidden px-0 lg:px-0 py-0 pt-4 background-diagonal'>
                <LatestProducts/>
            </PageContainer>
            <PageContainer
                className='min-h-0 w-full max-w-screen background-main-page-categories max-w-screen px-0 lg:px-0 py-0 pt-4'>
                <CategoryList/>
            </PageContainer>
        </>
    );
}
