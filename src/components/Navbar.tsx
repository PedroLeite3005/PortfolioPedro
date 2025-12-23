"use client";

import { ThemeToggle } from "./theme/ThemeToggle";

export function Navbar() {
	return (
		<nav className="w-full border-b relative z-10">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<a href="/" className="text-xl font-bold">
						Pedro Bastos Leite
					</a>
					<div className="flex items-center gap-4 relative z-20">
						{/* Adicione seus links de navegação aqui */}
						<ThemeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

