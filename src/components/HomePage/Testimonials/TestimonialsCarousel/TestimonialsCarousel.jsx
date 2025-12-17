import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "../TestimonialCard/TestimonialCard.jsx";
import Icon from "../../../shared/Icon/Icon.jsx";
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
    <div className={css.container}>
      <Icon className={css.quotes} id="icon-quotes" />
      <Slider {...settings}>
        {slideList.map(({ id, testimonial, owner }) => (
          <TestimonialCard
            id={id}
            text={testimonial}
            author={owner.name}
          />
        ))}
      </Slider>
    </div>
  );
}

export default TestimonialsCarousel;
