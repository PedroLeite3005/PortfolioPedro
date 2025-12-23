"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		setMounted(true);
		// Verifica o tema atual do HTML
		const html = document.documentElement;
		const isDark = html.classList.contains("dark");
		setCurrentTheme(isDark ? "dark" : "light");
	}, []);

	useEffect(() => {
		if (mounted && resolvedTheme) {
			setCurrentTheme(resolvedTheme as "light" | "dark");
		}
	}, [mounted, resolvedTheme]);

	const handleClick = () => {
		if (!setTheme) return;

		// Determina o próximo tema
		const html = document.documentElement;
		const isCurrentlyDark = html.classList.contains("dark");
		const nextTheme = isCurrentlyDark ? "light" : "dark";

		// Aplica manualmente a classe no HTML
		if (nextTheme === "dark") {
			html.classList.add("dark");
		} else {
			html.classList.remove("dark");
		}

		// Atualiza o estado do next-themes
		setTheme(nextTheme);
		setCurrentTheme(nextTheme);
	};

	if (!mounted) {
		return (
			<div className="px-4 py-2 rounded border cursor-not-allowed opacity-50 inline-block">
				☀️
			</div>
		);
	}

	const icon = currentTheme === "dark" ? "🌙" : "☀️";

	return (
		<button
			onClick={handleClick}
			className="px-4 py-2 rounded border cursor-pointer hover:opacity-80 active:scale-95 transition-all relative z-50"
			aria-label={`Tema atual: ${currentTheme}`}
			type="button"
		>
			{icon}
		</button>
	);
}
