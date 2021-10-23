import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function MainContent() {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const onEditorStateChange = (editorState) => {
		setEditorState(editorState);
		let word = convertToRaw(editorState.getCurrentContent());
		localStorage.setItem('doc', word.blocks[0].text);
	};

	useEffect(() => {
		if (localStorage.getItem('doc') !== '') {
			let word = localStorage.getItem('doc');
			console.log(word);
			setEditorState({ editorState: word });
		}
	}, []);

	return (
		<main>
			<div className='row m-0 p-0'>
				<div className='col-12 editor'>
					<Editor
						editorState={editorState}
						onEditorStateChange={onEditorStateChange}
						toolbarClassName='sticky-top'
						editorClassName='bg-white mt-4 editor-view'
					/>
				</div>
			</div>
		</main>
	);
}
