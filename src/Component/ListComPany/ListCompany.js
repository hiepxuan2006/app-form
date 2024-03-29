import 'swiper/css';
import 'swiper/css/pagination';
// import "swiper/css/navigation";
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CompanyService } from '~/service';
import ItemCompany from './ItemCompany';
import style from './ListComPany.module.scss';

const cx = classNames.bind(style);
function ListCompany() {
   const [data, setData] = useState([]);
   const [slidesView, setSlidesView] = useState('');

   useEffect(() => {
      const fethAPi = async () => {
         const result = await CompanyService.getAll('');
         setData(result.data);
      };
      fethAPi();
   }, []);
   function getWindowDimensions() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return {
         width,
         height,
      };
   }
   const [screen, setScreen] = useState(getWindowDimensions());
   useEffect(() => {
      function handleResize() {
         setScreen(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      if (screen.width < 740) {
         setSlidesView(2);
      } else if (1024 > screen.width > 740) {
         setSlidesView(2);
      }
      return () => window.removeEventListener('resize', handleResize);
   }, []);
   return (
     <div className={cx("wrapper")}>
       <div className={cx("heading")}>
         <p></p>
         <h1>Các đơn vị đồng hành</h1>
         <p></p>
       </div>
       <div className={`${cx("slider")} haha`}>
         <Swiper
           spaceBetween={30}
           slidesPerView={screen.width < 740 ? 2 : 3}
           loop={true}
           modules={[Autoplay, Pagination]}
           autoplay={{
             delay: 3000,
             disableOnInteraction: false,
           }}
           className={cx("mySwiper")}
         >
           {data &&
             data.map((item, index) => {
               return (
                 <div key={index}>
                   <SwiperSlide key={index} className={cx("swiper-slide-show")}>
                     <div className={cx("slide-content")}>
                       <div className={cx("slide-right")}>
                         <ItemCompany item={item} />
                       </div>
                     </div>
                   </SwiperSlide>
                 </div>
               );
             })}
         </Swiper>
       </div>
     </div>
   );
}

export default ListCompany;
