import Image from "next/image"
import { LandmarkCardProps } from "@/utils/types"
import LandmarkRating from "./LandmarkRating"
import FavoriteToggleButton from "./FavoriteToggleButton"
import Link from "next/link"

// ไม่ต้องมี [] เพราะเป็น object , มีแค่ array เดียว
const LandmarkCard = ({ landmark }: { landmark: LandmarkCardProps }) => {
    // destructure or no-destructure landmark.name
    const { name, image, description, id, province, lat, lng, category, price } = landmark

    return (
        <article className="group relative ">
            <div className="group-hover:scale-105 transition-transform duration-300">
                <Link href={`/landmark/${id}`}>
                    <div className="relative h-[300px]">
                        <Image
                            src={image}
                            sizes="(max-width:768px) 100vw, 50vw"
                            // substring ให้แสดงแค่ 0-40 ตัว
                            alt={name.substring(0, 40)}
                            className="object-cover "
                            fill
                        />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <h3 className="text-sm font-semibold">{name}</h3>
                        <LandmarkRating />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {description.substring(0, 45)}
                    </p>
                    <div className="flex items-center justify-between font-semibold text-sm">
                        <span>THB {price}</span>
                        <p>{province}</p>
                    </div>
                </Link >
                <div className="absolute top-5 right-5">
                    {/* ใช้ absolute ได้เพราะ relative */}
                    <FavoriteToggleButton landmarkId={id} />
                </div>

            </div>

        </article>

    )
}

export default LandmarkCard
