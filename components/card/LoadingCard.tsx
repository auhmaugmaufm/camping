import { Skeleton } from "../ui/skeleton"

const LoadingCard = () => {
    return (
        <div>

            <SkeletonCardHero />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    )
}

export const SkeletonCard = () => {
    return (
        <div>
            <Skeleton className="h-[300px] mb-2 " />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-2" />
        </div>
    )

}

export const SkeletonCardHero = () => {
    return (
        <div>
            <Skeleton className="w-full h-[450px] mb-2 " />
            <Skeleton className="h-10 w-full mt-4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
        </div>
    )

}


export default LoadingCard