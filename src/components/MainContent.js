import React, { useState } from 'react';
import mammoth from 'mammoth';

export default function MainContent() {
	const [doc, setDoc] = useState();
	const getFile = (e) => {
		console.log(e);
		var reader = new FileReader();
		reader.onloadend = function (event) {
			var arrayBuffer = reader.result;
			mammoth
				.convertToHtml({ arrayBuffer: arrayBuffer })
				.then(function (resultObject) {
					setDoc(resultObject.value);
					console.log(resultObject);
				});
		};
		reader.readAsArrayBuffer(e);
	};
	return (
		<main>
			<div className='row m-0 p-0'>
				<div className='col-12'>
					<div className='form-check'>
						<input type='file' onChange={(e) => getFile(e.target.files[0])} />
						<label className='form-check-label' htmlFor='exampleCheck1'>
							Check me out
						</label>
					</div>
					<div
						dangerouslySetInnerHTML={{ __html: doc }}
						contentEditable='true'
					></div>
				</div>
			</div>
		</main>
	);
}
