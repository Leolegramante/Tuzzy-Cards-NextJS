import {PageContainer} from "@/components";

export default function AboutPage() {
    return (
        <PageContainer>
            <div className="flex items-center">
                <h1 className="text-justify text-4xl text-principal">
                    <strong>Quem somos</strong>
                </h1>
            </div>
            <br/>
            <div>
                <p className="font-semibold text-xl text-justify text-principal">
                    A <strong>Tuzzy Cards</strong> chega para redefinir a experiência
                    dos fãs de Pokémon no Brasil. Mais do que uma loja, somos um
                    destino exclusivo para colecionadores e jogadores que buscam
                    qualidade e exclusividade.
                </p>
                <br/>
                <p className="font-semibold text-xl text-justify text-principal">
                    Com uma loja física que inclui um café temático e um portal online
                    inovador com database e ferramentas úteis, oferecemos muito mais
                    do que produtos: entregamos uma experiência única para quem leva o
                    hobby a sério.
                </p>
                <br/>
                <p className="font-semibold text-xl text-justify text-principal">
                    Nosso diferencial está na <strong>experiência premium</strong>. A
                    Tuzzy Cards será referência em atendimento especializado,
                    garantindo que cada cliente tenha acesso aos melhores produtos e
                    informações.
                </p>
                <br/>
                <p className="font-semibold text-xl text-justify text-principal">
                    Criamos um ambiente onde colecionadores de todos os níveis possam
                    se sentir valorizados e encontrar tudo o que precisam sem
                    complicações.
                </p>
                <br/>
                <p className="font-semibold text-xl text-justify text-principal">
                    Nosso compromisso é claro: ser a melhor e mais exclusiva loja de
                    Pokémon do Brasil. Com um posicionamento sofisticado, queremos
                    que, ao pensar em produtos e informações sobre Pokémon, a primeira
                    resposta seja sempre:{" "}
                    <strong>&ldquo;Isso tem na Tuzzy Cards.&rdquo;</strong>
                </p>
                <br/>
                <p className="font-semibold text-xl text-justify text-principal">
                    Procurando uma experiência premium e única? O seu lugar é na{" "}
                    <strong>Tuzzy Cards</strong>.
                </p>
            </div>
        </PageContainer>
    )
}