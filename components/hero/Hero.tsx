'use client'
import { LandmarkCardProps } from "@/utils/types"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';


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