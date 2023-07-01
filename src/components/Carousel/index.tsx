import React from "react";
import Slider from "react-slick";
import { CarouselProp } from "./carousel.types";

export default function Carousel({
  children,
  handleGetSliderIndex = () => {},
}: CarouselProp) {
  const handleSliderIndex = (current: number, next: number) => {
    const sliderIndex = {
      active: next + 1,
      left: next,
      right: next + 2,
    };

    return handleGetSliderIndex(sliderIndex);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: handleSliderIndex,
    swipeToSlide: true,

    centerMode: true,
    centerPadding: "60px",
    className: "center",
    adaptiveHeight: true,
    autoplaySpeed: 3000,
    cssEase: "ease",
    initialSlide: 0,
    pauseOnFocus: true,
    pauseOnover: true,
  };

  return <Slider {...settings}>{children}</Slider>;
}
