import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";

type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
};

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="relative">
            <input
                ref={ref}
                type={showPassword ? "text" : "password"}
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className
                )}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 hover:text-foreground"
                tabIndex={-1}
            >
                {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
});

InputPassword.displayName = "InputPassword";

export { InputPassword };
