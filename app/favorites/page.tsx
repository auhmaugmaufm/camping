import { fetchFavorites } from "@/actions/actions"
import LandmarkList from "@/components/home/LandmarkList"

const FovoritePage = async () => {
  const favorites = await fetchFavorites()
  
  return (
    <LandmarkList landmarks={favorites}/>
  )
}
export default FovoritePage