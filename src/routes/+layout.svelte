<script lang="ts">
	import logo from '../lib/assets/suvvybyte.png';
</script>

<nav class="navbar-fullwidth">
	<div class="navbar-content">
		<div class="navbar-logo-group">
			<img src={logo} alt="Suvvybyte Logo" class="navbar-logo" />
		</div>
		<div class="navbar-links">
			<a href="/" class="navbar-link">Project</a>
			<a href="/" class="navbar-link">Contact</a>
		</div>
	</div>
</nav>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

	.navbar-fullwidth {
		width: 40%;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		position: absolute;
		top: 8%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
		border-radius: 10px;
	}

	.navbar-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: 'Poppins', sans-serif;
		margin: 0 auto;
		padding: 12px 20px;
		max-width: 1400px;
	}

	.navbar-logo-group {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.navbar-logo {
		transition: transform 0.3s ease;
		height: 6dvb;
		width: auto;
	}

	.navbar-links {
		display: flex;
		gap: 15px;
	}

	.navbar-link {
		font-weight: 400;
		color: white;
		text-decoration: none;
		transition: all 0.3s ease;
		font-size: 12px;
		padding: 4px;
		filter: blur(1px);
	}

	.navbar-link:hover {
		color: #ffffff;
		filter: blur(0);
	}
</style>
