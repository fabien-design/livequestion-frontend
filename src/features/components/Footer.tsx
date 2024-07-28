import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {

    return (
        <footer className="bg-white text-black grid">
            <MaxWidthWrapper className="py-12">
                <div className="flex flex-col text-center font-Playfair_Display">
                    <h2 className="text-5xl font-semibold text-primary">Livequestion</h2>
                    <p className="font-bold text-2xl">Echangez autour de vos thématiques préférées</p>
                </div>
                <div className="border-b-2 bg-zinc-500 w-full my-10"></div>
                <div className="flex justify-between font-semibold text-sm sm:text-lg md:text-xl">
                    <Link href="/question?categ=0">Sport</Link>
                    <Link href="/question?categ=1">Santé</Link>
                    <Link href="/question?categ=2">Business</Link>
                    <Link href="/question?categ=3">Musique</Link>
                    <Link href="/question?categ=4">Films</Link>
                    <Link href="/question?categ=5">Jeux videos</Link>
                    
                </div>
                <p className="pt-16 font-semibold text-sm sm:text-lg md:text-xl">@{new Date().getFullYear()}  - Projet étudiant BTS  / Licence - <Link href="mailto:contact@lyceestvincent.fr">Contactez-nous</Link></p>
            </MaxWidthWrapper>
            
        </footer>
    )
}

export default Footer; 
