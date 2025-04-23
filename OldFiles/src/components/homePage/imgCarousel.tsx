import type React from "react";
import { useEffect, useRef, useState } from "react";

export interface Slide {
	image: string;
	alt: string;
	heading: string;
	subheading: string;
}

interface CarouselProps {
	slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const totalSlides = slides.length;
	const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Start auto-slide
	const startAutoSlide = () => {
		stopAutoSlide(); // Clear any existing interval
		slideIntervalRef.current = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % totalSlides);
		}, 5000);
	};

	// Stop auto-slide
	const stopAutoSlide = () => {
		if (slideIntervalRef.current) {
			clearInterval(slideIntervalRef.current);
			slideIntervalRef.current = null;
		}
	};

	useEffect(() => {
		startAutoSlide();
		return () => {
			stopAutoSlide();
		};
	}, [totalSlides]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % totalSlides);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
	};

	return (
		<div
			className="relative aspect-video overflow-hidden rounded shadow"
			onMouseEnter={stopAutoSlide}
			onMouseLeave={startAutoSlide}
		>
			{slides.map((slide, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
						index === currentSlide ? "opacity-100" : "opacity-0"
					}`}
				>
					<img
						src={slide.image}
						alt={slide.alt}
						className="h-full w-full object-cover"
					/>
					{/* Dark opaque overlay bar */}
					<div className="absolute right-0 bottom-0 left-0 bg-black bg-opacity-50 p-4 text-white">
						<h3 className="font-bold text-lg">{slide.heading}</h3>
						<p className="text-sm">{slide.subheading}</p>
					</div>
				</div>
			))}

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className="-translate-y-1/2 absolute top-1/2 left-2 transform rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
			>
				&larr;
			</button>
			<button
				onClick={nextSlide}
				className="-translate-y-1/2 absolute top-1/2 right-2 transform rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
			>
				&rarr;
			</button>

			{/* Dots Navigation */}
			<div className="absolute right-0 bottom-2 left-0 flex justify-center space-x-2">
				{slides.map((slide, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`h-3 w-3 rounded-full ${
							index === currentSlide ? "bg-gray-600" : "bg-gray-400"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Carousel;
