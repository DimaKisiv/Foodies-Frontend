import { useSelector } from "react-redux";
import { selectTestimonialsItems, selectTestimonialsStatus } from "../../../redux/testimonials/testimonialsSlice.js";
import Loader from "../../shared/Loader/Loader.jsx";
import MainTitle from "../../shared/MainTitle/MainTitle.jsx";
import Subtitle from "../../shared/Subtitle/Subtitle.jsx";
import TestimonialsCarousel from "./TestimonialsCarousel/TestimonialsCarousel.jsx";
import css from "./Testimonials.module.css";

const Testimonials = () => {
  const testimonials = useSelector(selectTestimonialsItems);
  const testimonialsStatus = useSelector(selectTestimonialsStatus);

  return (
    <section className={css.container}>
      <div className={css.wrapper}>
        <Subtitle>What our customer say</Subtitle>
        <MainTitle>Testimonials</MainTitle>
        {testimonialsStatus === "loading" && <Loader/>}
        {testimonials.length > 0 && (
          <TestimonialsCarousel slideList={testimonials}/>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
