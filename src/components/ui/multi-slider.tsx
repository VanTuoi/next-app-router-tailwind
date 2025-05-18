import * as SliderPrimitive from "@radix-ui/react-slider";
import React, { useState } from "react";

import { cn } from "~/lib/utils";

type MultiSliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    min: number;
    max: number;
    step?: number;
    formatLabel?: (value: number) => React.ReactNode;
    value?: number[];
    onValueChange?: (values: number[]) => void;
};

const MultiSlider = React.forwardRef<HTMLSpanElement, MultiSliderProps>(
    ({ className, min, max, step = 1, formatLabel, value, onValueChange, ...props }, ref) => {
        const initialValue: number[] = Array.isArray(value) ? value : [min, max];
        const [localValues, setLocalValues] = useState<number[]>(initialValue);

        const handleValueChange = (newValues: number[]) => {
            setLocalValues(newValues);
            onValueChange?.(newValues);
        };

        return (
            <SliderPrimitive.Root
                ref={ref}
                min={min}
                max={max}
                step={step}
                value={localValues}
                onValueChange={handleValueChange}
                className={cn("relative flex w-full touch-none select-none items-center", className)}
                {...props}
            >
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
                    <SliderPrimitive.Range className="absolute h-full bg-primary" />
                </SliderPrimitive.Track>

                {localValues.map((val, idx) => (
                    <React.Fragment key={idx}>
                        <div
                            className="absolute text-center"
                            style={{
                                left: `calc(${((val - min) / (max - min)) * 100}% + 0px)`,
                                top: "10px"
                            }}
                        >
                            <span className="text-xs">{formatLabel ? formatLabel(val) : val}</span>
                        </div>
                        <SliderPrimitive.Thumb className="bg-background focus-visible:ring-ring block h-4 w-4 rounded-full border border-primary/50 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
                    </React.Fragment>
                ))}
            </SliderPrimitive.Root>
        );
    }
);

MultiSlider.displayName = "MultiSlider";

export { MultiSlider };
