import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <>
            <Skeleton className="h-4 md:h-4 mb-6 mt-2" />
            <Skeleton className="h-8 md:h-8 " />
            <Skeleton className="h-[300px] md:h-[500px] relative mt-8" />
            <Skeleton className="h-4 w-1/3 md:h-4 mt-6" />
        </>
    )
}
export default loading