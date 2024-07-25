import HorizontalCard from "@/components/HorizontalCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import VerticalCard from "@/components/VerticalCard";
import Image from "next/image";
import Link from "next/link";

// bg-primary/80
export default function Home() {
    return (
        <div className="bg-gray-50">
            <section>
                <MaxWidthWrapper className="h-full">
                    <div className="w-full h-full ">
                        <HorizontalCard
                            imgSrc="https://img.redbull.com/images/c_crop,w_1920,h_960,x_0,y_103,f_auto,q_auto/c_scale,w_1200/redbullcom/2020/6/5/ctsejxmdtw9inp8zqqqd/valorant-ameliorer-aim-visee-astuces"
                            question="Quelle est la meilleure map, d'après vous ?"
                            answers={20}
                            category="jeux vidéos"
                            date="07/21/2024 11:05:47"
                            user="Fabien Rozier"
                            isBig={true}
                        />
                    </div>
                </MaxWidthWrapper>
            </section>
            {/* latest questions section */}
            <section className="py-12">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-xl sm:text-3xl md:text-4xl">
                            Dernieres questions
                        </h2>
                        <Link
                            href="/question"
                            className="text-primary font-semibold text-lg sm:text-xl md:text-2xl underline underline-offset-2 items-center"
                        >
                            Voir toutes les questions
                        </Link>
                    </div>
                    <div className="flex justify-between py-12 gap-12 md:gap-16 lg:gap-24">
                        <Link href="/question/0">
                            <VerticalCard
                                imgSrc="https://img.redbull.com/images/c_crop,w_1920,h_960,x_0,y_103,f_auto,q_auto/c_scale,w_1200/redbullcom/2020/6/5/ctsejxmdtw9inp8zqqqd/valorant-ameliorer-aim-visee-astuces"
                                question="Quelle est la meilleure map, d'après vous ?"
                                answers={20}
                                category="jeux vidéos"
                                date="07/25/2024 14:02:47"
                                user="Fabien Rozier"
                            />
                        </Link>
                        <Link href="/question/1">
                            <VerticalCard
                                imgSrc="/images/deadpool-wolverine-images-inedites.jpg"
                                question="que vaut la scène post-générique, et qu’annonce-t-elle pour le futur de Marvel ?  "
                                answers={2}
                                category="Films"
                                date="07/25/2024 09:05:47"
                                user="Jean"
                            />
                        </Link>
                        <Link href="/question/2">
                            <VerticalCard
                                imgSrc="/images/monte-cristo-critique.jpg"
                                question="Que pensez vous du film, y aura t'il une suite ?"
                                answers={20}
                                category="jeux vidéos"
                                date="07/24/2024 11:05:47"
                                user="Fabien Rozier"
                            />
                        </Link>
                    </div>
                </MaxWidthWrapper>
            </section>
        </div>
    );
}
