import { Carousel, CarouselContent, CarouselItem } from "~/components/ui";

type Props = {
    images: string[];
};

export const CourseCarousel = ({ images }: Props) => {
    if (!images.length) {
        return <div className="h-80 w-full rounded-md bg-gray-200" />;
    }

    return (
        <Carousel>
            <CarouselContent>
                {images.map((item, index) => (
                    <CarouselItem key={index}>
                        <img
                            src={item}
                            alt={`Course image ${index}`}
                            className="h-40 w-full rounded-md object-cover sm:h-80"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};
