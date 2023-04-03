import clsx from "clsx";
import React from "react";
import { createPortal } from "react-dom";
import { Button } from "./button";

export const Modal = ({
	onClose,
	children,
	className,
	closeButton,
	closeOnOutsideClick,
}: {
	onClose?: () => void;
	children: React.ReactNode;
	className?: string;
	closeOnOutsideClick?: boolean;
	closeButton?: boolean;
}) => {
	return createPortal(
		<div
			className={clsx(
				"fixed inset-0 bg-base2 bg-opacity-50",
				"z-modal",
				"flex items-center justify-center",
				"backdrop-blur-sm"
			)}
			onClick={closeOnOutsideClick ? onClose : undefined}
		>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}
				className={clsx(
					"relative",
					"p-5 bg-base w-[calc(100vw_-_20px)]",
					className
				)}
			>
				{children}
				{closeButton && <ModalCloseButton onClose={onClose} />}
			</div>
		</div>,
		document.body
	);
};

export const ModalCloseButton = ({ onClose }: { onClose?: () => void }) => (
	<Button className="absolute top-0 right-0" onClick={onClose}>
		<span className="i-carbon-close text-lg" />
	</Button>
);
