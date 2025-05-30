import {Carousel, CategoryList, LatestProducts, PageContainer} from "@/components";
import Amarelo from '../../../public/assets/Amarelo.png';
import Azul from '../../../public/assets/Azul.png';
import Rosa from '../../../public/assets/Rosa.png';
import Verde from '../../../public/assets/Verde.png';
import Vermelho from '../../../public/assets/Vermelho.png';

export default function Home() {
    const images = [Vermelho, Azul, Verde, Rosa, Amarelo];
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
