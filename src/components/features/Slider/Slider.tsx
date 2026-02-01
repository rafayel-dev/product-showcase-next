"use client";

import { Carousel } from "antd";
import Image from "next/image";
import type { Slide } from "@/types";

interface SliderProps {
    slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
    return (
        <div className="relative w-full overflow-hidden rounded-lg">
            <Carousel autoplay dots={false}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-full aspect-[40/9] overflow-hidden relative ${slide.link ? "cursor-pointer" : ""
                            }`}
                        onClick={() => slide.link && (window.location.href = slide.link)}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
