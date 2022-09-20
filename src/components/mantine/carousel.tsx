import { Carousel } from "@mantine/carousel";

import Content from "./carouselcontent";

const CarouselComp = () => {
  const banners = [
    `/assets/images/carousel-banners/Cedula.png`,
    `/assets/images/carousel-banners/Lawyer.png`,
    `/assets/images/carousel-banners/Pinoy.png`,
  ];
  const alt = [`Cedula Banner`, `Lawyer Banner`, `Pinoy Banner`];
  return (
    <Carousel
      sx={{
        width: "100%",
      }}
      withIndicators
    >
      <Carousel.Slide>
        <Content src={banners[0]!} alt={alt[0]!} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Content src={banners[1]!} alt={alt[1]!} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Content src={banners[2]!} alt={alt[2]!} />
      </Carousel.Slide>
    </Carousel>
  );
};

export default CarouselComp;
