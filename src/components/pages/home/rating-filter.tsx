import { Star } from "lucide-react";

type RatingProps = {
    value: number;
    max?: number;
    size?: number;
    className?: string;
    onChange?: (value: number) => void;
};

export const RatingFilter = ({ value, max = 5, size = 20, className = "", onChange }: RatingProps) => {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {Array.from({ length: max }).map((_, index) => {
                const ratingValue = index + 1;
                const full = ratingValue <= value;

                return (
                    <div
                        key={index}
                        className="relative cursor-pointer"
                        style={{ width: size, height: size }}
                        onClick={() => onChange?.(ratingValue)}
                        title={`${ratingValue} sao`}
                    >
                        <Star
                            size={size}
                            className={`absolute left-0 top-0 transition-colors ${
                                full ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"
                            }`}
                        />
                    </div>
                );
            })}
        </div>
    );
};
