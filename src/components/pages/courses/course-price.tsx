import { formatPrice } from "~/utils";

type Props = {
    price: number | string;
    priceBeforeDiscount?: number | string;
};

export const CoursePrice = ({ price, priceBeforeDiscount }: Props) => {
    return (
        <div className="flex flex-row items-center gap-2">
            {priceBeforeDiscount ? (
                <>
                    <p className="text-xl font-semibold text-red-600 sm:text-3xl">{formatPrice(price, "vi")}</p>
                    <p className="text-xl font-semibold line-through">{formatPrice(priceBeforeDiscount, "vi")}</p>
                </>
            ) : (
                <p className="text-3xl font-semibold">{formatPrice(price, "vi")}</p>
            )}
        </div>
    );
};
