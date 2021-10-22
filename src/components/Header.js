import React from 'react';

export default function Header() {
	return (
		<header>
			<nav className='navbar navbar-expand-lg navbar-light bg-light px-4'>
				<a className='navbar-brand' href='#home'>
					Navbar
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item active'>
							<a className='nav-link' href='#home'>
								Home
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href='#home'>
								Link
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
