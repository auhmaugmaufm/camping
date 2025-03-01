'use client'
import { LandmarkCardProps } from "@/utils/types"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import OtherInfo from "./OtherInfo";


const Hero = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"

      >
        {
          landmarks.map((landmark) => {
            return (
              <SwiperSlide key={landmark.id} className="group">
                <div className="relative overflow-hidden">
                  <img className="w-full h-[450px] object-cover brightness-75 group-hover:brightness-50 translate-all duration-300" src={landmark.image} />
                  <div className="absolute bottom-0 left-0 z-50">
                    <div className="col-span-4 mb-4 flex h-full flex-1 justify-end px-5 md:justify-end md:px-10 md:mb-4">
                      <OtherInfo landmark={landmark}/>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}
export default Hero