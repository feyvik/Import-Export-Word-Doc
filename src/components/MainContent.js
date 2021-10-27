import React, { useState } from 'react';

export default function MainContent(props) {
	// const [doc, setDoc] = useState();
	const showoutput = (e) => {
		console.log(e.target.value);
	};

	const word = props.doc;

	console.log(word);

	return (
		<main>
			<div className='row m-0 p-0'>
				<div className='col-12 mt-4'>
					<div
						dangerouslySetInnerHTML={{ __html: word === '' ? '' : word }}
						contentEditable='true'
						className='editor-view'
						onChange={(e) => showoutput(e)}
					></div>
				</div>
			</div>
		</main>
	);
}
