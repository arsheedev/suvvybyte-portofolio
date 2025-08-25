<script lang="ts">
	import type { Snippet } from 'svelte'
	import '../app.css'

	let { children }: { children: Snippet } = $props()

	let isMenuOpen = $state(false)

	function toggleMenu() {
		isMenuOpen = !isMenuOpen
	}
	function closeMenu() {
		isMenuOpen = false
	}
</script>

<nav class="navbar">
	<div class="navbar-content">
		<div class="navbar-brand">SUVVYBYTE</div>

		<button class="hamburger-menu" on:click={toggleMenu} aria-label="Toggle menu">
			<span class="hamburger-line {isMenuOpen ? 'hamburger-line-open' : ''}"></span>
			<span class="hamburger-line {isMenuOpen ? 'hamburger-line-open' : ''}"></span>
			<span class="hamburger-line {isMenuOpen ? 'hamburger-line-open' : ''}"></span>
		</button>

		<div class="navbar-links {isMenuOpen ? 'navbar-links-open' : ''}">
			<a href="/" class="navbar-link" on:click={closeMenu}>Project</a>
			<a href="/" class="navbar-link" on:click={closeMenu}>Contact</a>
			<button class="navbar-button">
				<svg
					class="eye-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
					<circle cx="12" cy="12" r="3"></circle>
				</svg>
				Track Project
			</button>
		</div>

		{#if isMenuOpen}
			<div class="menu-overlay" on:click={closeMenu}></div>
		{/if}
	</div>
</nav>

<div class="content-wrapper">
	{@render children()}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@600&display=swap');

	.navbar {
		width: 100%;
		background: rgb(0, 0, 0);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.navbar-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
		padding: 20px 40px;
		max-width: 1400px;
		position: relative;
	}

	.navbar-brand {
		font-family: 'Pixelify Sans', sans-serif;
		font-size: 24px;
		font-weight: 600;
		color: white;
		z-index: 1002;
	}

	.navbar-links {
		display: flex;
		gap: 24px;
		align-items: center;
	}

	.navbar-link {
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		color: white;
		text-decoration: none;
		font-size: 18px;
		transition: color 0.3s ease;
	}

	.navbar-link:hover {
		color: #e0e0e0;
	}

	.navbar-button {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-size: 18px;
		color: black;
		background: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.navbar-button:hover {
		background: #e0e0e0;
	}

	.eye-icon {
		color: black;
	}

	.content-wrapper {
		background: #000000;
		min-height: 100vh;
		padding-top: 90px;
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
	}
	.hamburger-menu {
		display: none;
		flex-direction: column;
		justify-content: space-around;
		width: 30px;
		height: 25px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 1002;
	}

	.hamburger-line {
		width: 30px;
		height: 3px;
		background: white;
		border-radius: 10px;
		transition: all 0.3s ease;
		transform-origin: center;
	}

	.hamburger-line-open:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.hamburger-line-open:nth-child(2) {
		opacity: 0;
	}

	.hamburger-line-open:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -6px);
	}

	.menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	@media (max-width: 768px) {
		.navbar-content {
			padding: 15px 20px;
		}

		.hamburger-menu {
			display: flex;
		}

		.navbar-links {
			position: fixed;
			top: 0;
			right: -100%;
			height: 100vh;
			width: 70%;
			max-width: 280px;
			background: black;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			padding: 70px 20px 20px;
			gap: 20px;
			transition: right 0.3s ease;
			z-index: 1001;
		}

		.navbar-links-open {
			right: 0;
			box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
		}

		.navbar-link {
			font-size: 16px;
			padding: 8px 0;
			width: 100%;
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		}

		.navbar-button {
			margin-top: 15px;
			font-size: 16px;
			padding: 8px 14px;
			width: 100%;
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.navbar-brand {
			font-size: 20px;
		}

		.navbar-links {
			max-width: 250px;
			padding: 60px 15px 15px;
			gap: 15px;
		}

		.navbar-link {
			font-size: 15px;
		}

		.navbar-button {
			font-size: 15px;
			padding: 7px 12px;
		}
	}
</style>
