import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./SubmitButton.css";

type SubmitButtonProps = {
  children: ReactNode;
  loading: boolean;
  loadingLabel: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "disabled" | "children"
>;

export function SubmitButton({
  children,
  loading,
  loadingLabel,
  ...buttonProps
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="submit-btn"
      disabled={loading}
      {...buttonProps}
    >
      {loading ? loadingLabel : children}
    </button>
  );
}
