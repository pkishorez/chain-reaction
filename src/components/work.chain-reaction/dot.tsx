import { motion } from "framer-motion";

export const Dot = ({
	color,
	size = "20px",
	dot,
}: {
	color: string;
	size?: string;
	dot: { id: number; isNew: boolean };
}) => {
	return (
		<motion.div
			layoutId={`dot-${dot.id}`}
			className="w-10 h-10 rounded-full shadow-lg shadow-[black]"
			initial={{
				opacity: dot.isNew ? 0 : 1,
			}}
			animate={{
				opacity: 1,
			}}
			style={{
				zIndex: dot.id,
				backgroundColor: color,
				margin: -5,
				width: size,
				height: size,
				background: `radial-gradient(circle, white 0%, ${color} 80%, ${color} 100%)`,
			}}
		/>
	);
};

export const Dots = ({
	size,
	color,
	dots,
}: {
	size: string;
	color: string;
	dots: { id: number; isNew: boolean }[];
}) => {
	return (
		<div
			className="flex flex-wrap justify-center"
			style={{ width: `calc(${size} * 1.5)` }}
		>
			{dots.map((dot) => (
				<Dot dot={dot} color={color} size={size} key={dot.id} />
			))}
		</div>
	);
};
