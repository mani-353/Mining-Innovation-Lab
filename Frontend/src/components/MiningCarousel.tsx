
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const MiningCarousel = () => {
  const slides = [
    {
      title: "Mining Safety - Our Priority",
      description: "Comprehensive monitoring and analysis of mining accidents across India",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
    },
    {
      title: "Data-Driven Safety Solutions", 
      description: "Advanced analytics for accident prevention and safety improvement",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=400&fit=crop"
    },
    {
      title: "National Mining Safety Network",
      description: "Connecting mines across India for better safety standards",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=400&fit=crop"
    }
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full relative"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative h-80 w-full overflow-hidden">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-6 max-w-4xl">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl">{slide.description}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default MiningCarousel;
