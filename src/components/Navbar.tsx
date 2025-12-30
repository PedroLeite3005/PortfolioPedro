"use client";

import { ThemeToggle } from "./theme/ThemeToggle";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		// Adicionar smooth scroll para links de âncora
		const handleAnchorClick = (e: Event) => {
			const target = e.currentTarget as HTMLAnchorElement;
			if (target && target.hash) {
				e.preventDefault();
				const targetId = target.hash.substring(1);
				const targetElement = document.getElementById(targetId);
				
				if (targetElement) {
					// Fechar menu mobile se estiver aberto
					setIsMenuOpen(false);

					// Calcular a posição exata considerando a navbar sticky
					const navbar = document.querySelector('nav');
					const navbarHeight = navbar ? navbar.offsetHeight : 80;
					const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
					const offsetPosition = targetPosition - navbarHeight;

					// Usar requestAnimationFrame para animação mais suave
					const startPosition = window.pageYOffset;
					const distance = offsetPosition - startPosition;
					const duration = 800; // Duração em ms
					let start: number | null = null;

					const animateScroll = (currentTime: number) => {
						if (start === null) start = currentTime;
						const timeElapsed = currentTime - start;
						const progress = Math.min(timeElapsed / duration, 1);

						// Easing function (ease-in-out-cubic)
						const ease = progress < 0.5
							? 4 * progress * progress * progress
							: 1 - Math.pow(-2 * progress + 2, 3) / 2;

						window.scrollTo(0, startPosition + distance * ease);

						if (timeElapsed < duration) {
							requestAnimationFrame(animateScroll);
						}
					};

					requestAnimationFrame(animateScroll);
				}
			}
		};

		// Adicionar event listeners para todos os links de âncora
		const anchorLinks = document.querySelectorAll('a[href^="#"]');
		anchorLinks.forEach((link) => {
			link.addEventListener("click", handleAnchorClick);
		});

		return () => {
			anchorLinks.forEach((link) => {
				link.removeEventListener("click", handleAnchorClick);
			});
		};
	}, []);

	// Fechar menu ao clicar fora
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const nav = document.querySelector('nav');
			if (isMenuOpen && nav && !nav.contains(target)) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			// Usar setTimeout para evitar que o evento seja capturado imediatamente
			setTimeout(() => {
				document.addEventListener('click', handleClickOutside);
			}, 0);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<nav className="w-full border-b-2 relative z-50 bg-white dark:bg-slate-950 sticky top-0">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<a href="/" className="text-xl font-bold">
						Pedro Bastos Leite
					</a>
					
					{/* Desktop Menu */}
					<div className="hidden md:flex items-center gap-9">
						<a href="#about" className="hover:text-primary transition-colors text-sm font-medium">Sobre mim</a>
						<a href="#skills" className="hover:text-primary transition-colors text-sm font-medium">Tecnologias</a>
						<a href="#projects" className="hover:text-primary transition-colors text-sm font-medium">Projetos</a>
						<a href="#contact" className="hover:text-primary transition-colors text-sm font-medium">Conecte-se</a>
						<ThemeToggle />
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center gap-2">
						<ThemeToggle />
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
							aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
							aria-expanded={isMenuOpen}
						>
							{isMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						isMenuOpen 
							? "max-h-96 opacity-100 mt-4 pointer-events-auto" 
							: "max-h-0 opacity-0 pointer-events-none"
					}`}
				>
					<div className="flex flex-col gap-4 pb-4">
						<a 
							href="#about" 
							className="hover:text-primary transition-colors text-sm font-medium py-2 cursor-pointer"
							onClick={(e) => {
								setIsMenuOpen(false);
							}}
						>
							Sobre mim
						</a>
						<a 
							href="#skills" 
							className="hover:text-primary transition-colors text-sm font-medium py-2 cursor-pointer"
							onClick={(e) => {
								setIsMenuOpen(false);
							}}
						>
							Tecnologias
						</a>
						<a 
							href="#projects" 
							className="hover:text-primary transition-colors text-sm font-medium py-2 cursor-pointer"
							onClick={(e) => {
								setIsMenuOpen(false);
							}}
						>
							Projetos
						</a>
						<a 
							href="#contact" 
							className="hover:text-primary transition-colors text-sm font-medium py-2 cursor-pointer"
							onClick={(e) => {
								setIsMenuOpen(false);
							}}
						>
							Conecte-se
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
