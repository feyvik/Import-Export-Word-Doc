import React from 'react';

export default function Header() {
	return (
		<header>
			<nav class='navbar navbar-expand-lg navbar-light bg-light px-4'>
				<a class='navbar-brand' href='#home'>
					Navbar
				</a>
				<button
					class='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span class='navbar-toggler-icon'></span>
				</button>

				<div class='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul class='navbar-nav mr-auto'>
						<li class='nav-item active'>
							<a class='nav-link' href='#home'>
								Home
							</a>
						</li>
						<li class='nav-item'>
							<a class='nav-link' href='#home'>
								Link
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
