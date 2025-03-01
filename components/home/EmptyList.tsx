import Link from "next/link"
import { Button } from "../ui/button"

const EmptyList = ({ heading = 'No items', message = 'Please, try agian...', btnText = 'Back Home' }: { heading?: string, message?: string, btnText?: string }) => {
    return (
        <div className="flex flex-col justify-center items-center my-10">
            <h2 className="text-xl font-bold">{heading}</h2>
            <p className="text-lg mb-4">{message}</p>
            <Link href='/'>
                <Button className="capitalize" >
                    {btnText}
                </Button>
            </Link>
        </div>
    )
}
export default EmptyList