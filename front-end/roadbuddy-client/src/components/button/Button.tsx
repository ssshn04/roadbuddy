import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import styles from "./Button.module.css"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    const variantClass = {
      default: styles["btn-default"],
      destructive: styles["btn-destructive"],
      outline: styles["btn-outline"],
      secondary: styles["btn-secondary"],
      ghost: styles["btn-ghost"],
      link: styles["btn-link"],
    }[variant]

    const sizeClass = {
      default: styles["btn-default-size"],
      sm: styles["btn-sm"],
      lg: styles["btn-lg"],
      icon: styles["btn-icon"],
    }[size]

    // Проста конкатенація класів через пробіл
    const combinedClassName = `${styles.btn} ${variantClass} ${sizeClass} ${className}`.trim()

    return <Comp className={combinedClassName} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button }
