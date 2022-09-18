import { FC, ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  ref?: ForwardedRef<HTMLInputElement>;
}

export const Input: FC<InputProps> = forwardRef(({ label, name, ...props }, ref) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input ref={ref} className="input" type="text" id={name} name={name} {...props} />
    </div>
  );
});
