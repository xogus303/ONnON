import React, {useState} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import './styles.scss';
import { BsPlayFill, BsFillMusicPlayerFill } from 'react-icons/bs'

import dummy from './dummy';
// install Swiper modules
SwiperCore.use([EffectCoverflow, Navigation, Autoplay]);

export default function MusicList() {

  const [mainList, setMainList] = useState(dummy)

  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: true
        }}
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          "rotate": 50,
          "stretch": 0,
          "depth": 100,
          "modifier": 1,
          "slideShadows": true
        }}
        navigation={true}
        pagination={false}
        className="mySwiper"
      >
      {mainList.map((item, index) => {
        return (
          <SwiperSlide key={index} onClick={() => console.log('123')}>
            {({isActive}) => {
              if (isActive){
                return (
                  <div className='musicItem musicItemActive'>
                    <img className='MusicItemImg' src={item.coverImg} />
                    <div className='musicIteminfo'>
                      <div className='TextArea'>
                        <span className="TitleText">{item.title}</span>
                      </div>
                      <div className='BtnArea'>
                        <div className='Textline2'>
                          <span className="SingerText">{item.singer}</span>
                          <span className="UploadText">{item.uploadDate}</span>
                        </div>
                        <div className="BtnZone">
                          <button>
                            <BsFillMusicPlayerFill size={20} color={'#4decff'} />
                          </button>
                          <button>
                            <BsPlayFill size={30} color={'#4decff'} style={{ paddingLeft: 3 }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className='musicItem'>
                    <img src={item.coverImg} />
                  </div>
                )
              }
            }}
          </SwiperSlide>
        )
      })}
      </Swiper>
    </>
  )
}