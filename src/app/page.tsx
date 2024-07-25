import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

export default function Home() {
    return (
        <div className="bg-gray-50">
            <MaxWidthWrapper
                className="h-full"
            >
                <div className="w-full h-full bg-red-600">Hello</div>
            </MaxWidthWrapper>
        </div>
    );
}
