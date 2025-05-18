import { QueryConfig } from "~/hooks";

/**
 *
 * @param value
 * @param locale
 * @param currency
 * @returns
 */
export function formatPrice(value: string | number, locale: string = "vi", currency: string = "VND"): string {
    const numberValue = typeof value === "number" ? value : Number(value.toString().replace(/[^0-9.-]+/g, ""));
    if (isNaN(numberValue)) return "";

    let curr = currency;
    if (!currency) {
        if (locale.startsWith("vi")) curr = "VND";
        else if (locale.startsWith("en")) curr = "USD";
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: curr,
        minimumFractionDigits: curr === "VND" ? 0 : 2,
        maximumFractionDigits: curr === "VND" ? 0 : 2
    }).format(numberValue);
}

/**
 *
 * @param config
 * @returns
 */
export const createSearchString = (config: QueryConfig) => {
    const params = new URLSearchParams(config);
    return `?${params.toString()}`;
};
