import React from 'react';

export default function MainContent(props) {
	let word = props.doc;

	const showoutput = (e) => {
		console.log(e);
	};

	return (
		<main>
			<div className='row m-0 p-0'>
				<div className='col-12 mt-4'>
					<div
						dangerouslySetInnerHTML={{ __html: word === '' ? '' : word }}
						contentEditable='true'
						className='editor-view'
						onInput={() => showoutput(word)}
					></div>
				</div>
			</div>
		</main>
	);
}
