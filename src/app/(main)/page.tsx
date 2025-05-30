import {Carousel, CategoryList, LatestProducts, PageContainer} from "@/components";
import bannerPrincipal from '../../../public/assets/banner-1.png';
import bannerSecundario from '../../../public/assets/banner-2.png';

export default function Home() {
    const images = [bannerPrincipal, bannerSecundario];
    return (
        <>
            <PageContainer className='min-h-0 background-pattern max-w-screen px-0 lg:px-0 py-0 pt-4'>
                <Carousel images={images}/>
            </PageContainer>
            <PageContainer className='min-h-0 w-full max-w-screen px-0 lg:px-0 py-0 pt-4'>
                <LatestProducts/>
            </PageContainer>
            <PageContainer className='min-h-0 w-full max-w-screen background-main-page-categories max-w-screen px-0 lg:px-0 py-0 pt-4'>
                <CategoryList/>
            </PageContainer>
        </>
    );
}
