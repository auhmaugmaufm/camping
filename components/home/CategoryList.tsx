import { categories } from "@/utils/category"
import Link from "next/link"

const CategoryList = ({ search, category }: { search?: string, category?: string }) => {
    const searchTerm = search ? `search=${search}` : ''
    return (
        <div>
           <div className="flex justify-center gap-0 sm:gap-8 my-4 font-bold">
                {
                    categories.map((item) => { 
                        const isActive = item.label === category
                        return (
                            <Link key={item.label} href={`/?category=${item.label}${searchTerm}`}>
                                <article className={`p-3 flex flex-col justify-center hover:text-primary hover:scale-110 hover:duration-200 items-center ${isActive ? 'text-primary':'' }`}>
                                    <item.icon />
                                    <p>{item.label}</p>
                                </article>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default CategoryList