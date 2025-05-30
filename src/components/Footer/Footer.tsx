import Link from "next/link";

export function Footer() {
    return (
        <div className='w-full bg-principal h-auto'>
            <div
                className="flex flex-col md:flex-row items-center justify-between mx-auto max-w-7xl min-h-20 p-6 lg:px-8">
                <div className="flex gap-4 w-full justify-evenly">
                    <div className="flex flex-col">
                        <p className='text-fy font-bold text-lg'> Tuzzy Cards </p>
                        <Link href="/about" className="text-md border border-transparent hover:border-b-fy">
                            Sobre nós
                        </Link>
                        <Link href="/contact" className="text-md border border-transparent hover:border-b-fy">
                            Contato
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <p className='text-fy font-bold text-lg'> Redes sociais </p>
                        <Link href="/about" className="text-md border border-transparent hover:border-b-fy">
                            Instagram
                        </Link>
                        <Link href="/contct" className="text-md border border-transparent hover:border-b-fy">
                            Facebook
                        </Link>
                    </div>
                </div>
                <div className="flex gap-4 w-full justify-evenly">
                    <div className="flex flex-col">
                        <p className='text-fy font-bold text-lg'> Tuzzy Cards </p>
                        <Link href="/about" className="text-md border border-transparent hover:border-b-fy">
                            Sobre nós
                        </Link>
                        <Link href="/contct" className="text-md border border-transparent hover:border-b-fy">
                            Contato
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <p className='text-fy font-bold text-lg'> Redes sociais </p>
                        <Link href="/about" className="text-md border border-transparent hover:border-b-fy">
                            Instagram
                        </Link>
                        <Link href="/contct" className="text-md border border-transparent hover:border-b-fy">
                            Facebook
                        </Link>
                    </div>
                </div>
            </div>
            <div className="box-border flex flex-col max-w-7xl items-center justify-center mt-4 lg:mt-6 mx-auto">
                <p className="text-sm text-center text-fy px-4 lg:px-6 py-2 lg:py-4 border border-transparent border-t-fy">
                    As informações literais e gráficas apresentadas neste site sobre o Pokémon Trading Card Game,
                    incluindo imagens de cartas e textos, são protegidas por direitos autorais da The Pokémon Company
                    (Pokémon), Nintendo, Game Freak e/ou Creatures. Este site não é produzido, endossado, apoiado ou
                    afiliado à Pokémon, Nintendo, Game Freak ou Creatures.
                </p>
                <p className="text-sm text-center text-fy px-4 lg:px-6 py-2 lg:py-4">
                    &copy; 2025 Tuzzy Cards. Todos os direitos reservados.
                </p>
            </div>
        </div>
    )
}