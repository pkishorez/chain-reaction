import clsx from "clsx";

export const Badge = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
) => (
  <span
    {...props}
    className={clsx(
      "px-2 py-1 rounded-sm bg-base-invert text-base-invert text-xs",
      props.className
    )}
  />
);
