import type React from 'react';
import {useEffect, useState} from 'react';
import {Button as NextButton, CircularProgress} from "@nextui-org/react";

type Props = {
    children?: React.ReactNode,
    icon?: JSX.Element | undefined,
    className?: string,
    onClick?: () => void,
    type?: 'button' | 'submit' | 'reset' | undefined,
    fullWidth?: boolean,
    color?: "primary" | "secondary" | "success" | "warning" | "danger" | undefined,
    loadingColor?: "primary" | "secondary" | "success" | "warning" | "danger" | undefined,
    textStyle?: string,
    isDisabled?: boolean,
    isLoading?: boolean,
    size?: "sm" | "md" | "lg" | undefined;
    title?: string;
}

const MyButton = ({
                      children,
                      icon,
                      className,
                      type,
                      fullWidth,
                      onClick,
                      color,
                      isDisabled,
                      isLoading,
                      textStyle,
                      loadingColor = "secondary",
                      size = "md",
                      title,
                  }: Props) => {
    const [startContent, setStartContent] = useState(icon)

    useEffect(() => {
        if (isLoading) {
            setStartContent(startContent)
        } else {
            setStartContent(icon)
        }
    }, [isLoading]);
    return (
        <NextButton
            startContent={startContent}
            size={size}
            color={color}
            onPress={onClick}
            // variant={'light'}
            className={className}
            type={type}
            isDisabled={isDisabled}
            fullWidth={fullWidth}
            title={title}
        >
            <p className={textStyle}>{children}</p>
        </NextButton>
    );
};

export default MyButton;