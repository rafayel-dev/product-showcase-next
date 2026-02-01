"use client";

import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

type AppButtonProps = ButtonProps;

const AppButton: React.FC<AppButtonProps> = ({
    className,
    children,
    type = "default",
    ...props
}) => {
    const isPrimary = type === "primary" && !props.danger;

    const baseClass = isPrimary
        ? "bg-violet-500! hover:bg-violet-600! border-violet-500! hover:border-violet-600! text-white shadow-md hover:shadow-lg transition-all duration-300"
        : "";

    return (
        <Button type={type} className={`${baseClass} ${className || ""}`} {...props}>
            {children}
        </Button>
    );
};

export default AppButton;
