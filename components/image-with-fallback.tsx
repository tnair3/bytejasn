"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
    src: string | undefined;
    fallbackText?: string;
}

export function ImageWithFallback({
                                      src,
                                      alt,
                                      fallbackText = "No artwork found",
                                      ...props
                                  }: ImageWithFallbackProps) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-800 p-2 text-center text-zinc-400">
                <span className="text-[10px] leading-tight">{fallbackText}</span>
            </div>
        );
    }

    return (
        <Image
            {...props}
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
        />
    );
}