import { fetchFavorites } from "@/actions/actions"
import EmptyList from "@/components/home/EmptyList"
import LandmarkList from "@/components/home/LandmarkList"

const FovoritePage = async () => {
  const favorites = await fetchFavorites()
  if(favorites.length === 0){
    return (
      <EmptyList heading="No item Favorites" btnText="Back Home"/>
    )
  }
  
  return (
    <LandmarkList landmarks={favorites}/>
  )
}
export default FovoritePage