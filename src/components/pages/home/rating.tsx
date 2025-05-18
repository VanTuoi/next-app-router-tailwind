import { Star } from "lucide-react";

type RatingProps = {
    value: number;
    max?: number;
    size?: number;
    className?: string;
};

export const Rating = ({ value, max = 5, size = 20, className }: RatingProps) => {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <p className="text-sm text-gray-600">{value}</p>
            {Array.from({ length: max }).map((_, index) => {
                const full = index + 1 <= value;
                const half = !full && index + 0.5 < value;

                return (
                    <div key={index} className="relative" style={{ width: size, height: size }}>
                        <Star
                            size={size}
                            className={`absolute left-0 top-0 ${
                                full
                                    ? "fill-yellow-400 stroke-yellow-400"
                                    : half
                                      ? "fill-yellow-400 stroke-yellow-400 [clip-path:inset(0_50%_0_0)]"
                                      : "stroke-gray-300"
                            }`}
                        />
                        {!full && half && (
                            <Star
                                size={size}
                                className="absolute left-0 top-0 stroke-gray-300 [clip-path:inset(0_0_0_50%)]"
                            />
                        )}
                        {!full && !half && <Star size={size} className="absolute left-0 top-0 stroke-gray-300" />}
                    </div>
                );
            })}
        </div>
    );
};
