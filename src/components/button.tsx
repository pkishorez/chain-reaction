import clsx from "clsx";
import React from "react";

export const Button = ({
	className,
	...props
}: React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => {
	return (
		<button
			className={clsx(
				"p-3 bg-base-hover hover:bg-opacity-60",
				"disabled:hover:bg-opacity-100 disabled:opacity-30",
				className
			)}
			{...props}
		/>
	);
};
