import { ButtonHTMLAttributes } from "react";

function ActionButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, children, ...rest } = props;

  const defaultClasses = "py-2 rounded border-2 w-2/3 my-5 max-w-44 clickable";

  const combinedClassName = className ? `${defaultClasses} ${className}` : defaultClasses;

  return (
    <button className={combinedClassName} {...rest}>
      {children}
    </button>
  );
}

export default ActionButton;
