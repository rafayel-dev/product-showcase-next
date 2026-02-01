"use client";

import React from "react";
import { Card } from "antd";
import type { CardProps } from "antd";

type AppCardProps = Omit<CardProps, "bordered"> & {
    bordered?: boolean;
};

const AppCard: React.FC<AppCardProps> = ({
    className,
    children,
    bordered = false,
    ...props
}) => {
    // Convert deprecated `bordered` to new `variant` prop
    const variant = bordered ? "outlined" : "borderless";

    return (
        <Card
            variant={variant}
            className={`rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className || ""}`}
            {...props}
        >
            {children}
        </Card>
    );
};

export default AppCard;
