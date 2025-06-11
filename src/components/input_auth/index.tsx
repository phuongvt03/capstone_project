import { useState } from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputAuthProps {
    type: "text" | "password";
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
}

export default function InputAuth({ type, placeholder, register, error }: InputAuthProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [hasText, setHasText] = useState(false);

    return (
        <div>
            <div className="relative">
                <Input
                    type={type === "password" && !showPassword ? "password" : "text"}
                    className={`px-[20px] py-[22px] focus-visible:ring-0 w-full border-2 rounded-lg transition duration-200 pr-[50px]
                    ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    placeholder={placeholder}
                    {...register}
                    onChange={(e) => setHasText(e.target.value.length > 0)}
                />
                {type === "password" && hasText && (
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
