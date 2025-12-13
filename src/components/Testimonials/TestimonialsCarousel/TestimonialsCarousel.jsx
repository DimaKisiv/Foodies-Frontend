import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "../TestimonialCard/TestimonialCard.jsx";
import css from "./TestimonialsCarousel.module.css";
import "./styles.css";

const TestimonialsCarousel = ({ slideList }) => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {slideList.map(({ id, testimonial, owner }) => (
        <TestimonialCard
          id={id}
          text={testimonial}
          author={owner.name}
        />
      ))}
    </Slider>
  );
}

export default TestimonialsCarousel;
