"use client";

import { ThemeToggle } from "./theme/ThemeToggle";

export function Navbar() {
	return (
		<nav className="w-full border-b-2 relative z-10 dark:bg-slate-950">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<a href="/" className="text-xl font-bold">
						Pedro Bastos Leite
					</a>
					<div className="flex items-center gap-9">
						<a href="#sobre-mim" className="hover:text-primary transition-colors text-sm font-medium">Sobre mim</a>
						<a href="#tecnologias" className="hover:text-primary transition-colors text-sm font-medium">Tecnologias</a>
						<a href="#projetos" className="hover:text-primary transition-colors text-sm font-medium">Projetos</a>
						<a href="#conecte-se" className="hover:text-primary transition-colors text-sm font-medium">Conecte-se</a>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

