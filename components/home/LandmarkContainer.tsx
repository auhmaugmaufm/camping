import { fetchLandmarks, fetchLandmarksHero } from "@/actions/actions"
import LandmarkList from "./LandmarkList"
import { LandmarkCardProps } from "@/utils/types"
import Hero from "../hero/Hero"
import CategoryList from "./CategoryList"
import EmptyList from "./EmptyList"


const LandmarkContainer = async ({ search, category }: { search?: string, category?: string }) => {
  const landmarksForHero: LandmarkCardProps[] = await fetchLandmarksHero()
  const landmarks: LandmarkCardProps[] = await fetchLandmarks({ search, category })


  //console.log(landmarks)
  return (
    <div>
      <Hero landmarks={landmarksForHero} />
      <CategoryList search={search} category={category} />
      {
        landmarks.length === 0 ? <EmptyList heading="No result" btnText="Clear Filters"/> : <LandmarkList landmarks={landmarks} />
      }

    </div>
  )
}
export default LandmarkContainer