import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBold,
	faItalic,
	faList,
	faListOl,
	faAlignCenter,
	faAlignJustify,
	faAlignRight,
	faAlignLeft,
	faUnderline,
	faImage,
	faLink,
} from '@fortawesome/free-solid-svg-icons';
import mammoth from 'mammoth';
import MainContent from './MainContent';

export default function Header() {
	const [doc, setDoc] = useState();

	const exportHtmlToDoc = async () => {
		let filename = document.querySelector('#filename-input').value;
		const word = localStorage.getItem('doc');
		var header =
			"<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
			"xmlns:w='urn:schemas-microsoft-com:office:word' " +
			"xmlns='http://www.w3.org/TR/REC-html40'>" +
			"<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
		var footer = '</body></html>';
		var sourceHTML = header + word + footer;

		var blob = new Blob(['\ufeff', sourceHTML], {
			type: 'application/msword',
		});

		// Specify link url
		var url =
			'data:application/vnd.ms-word;charset=utf-8,' +
			encodeURIComponent(sourceHTML);

		// Specify file name
		filename = filename ? filename + '.doc' : 'document.doc';

		// Create download link element
		var downloadLink = document.createElement('a');

		document.body.appendChild(downloadLink);

		if (navigator.msSaveOrOpenBlob) {
			navigator.msSaveOrOpenBlob(blob, filename);
		} else {
			// Create a link to the file
			downloadLink.href = url;

			// Setting the file name
			downloadLink.download = filename;

			//triggering the function
			downloadLink.click();
		}

		document.body.removeChild(downloadLink);
	};

	const mammothOptions = {
		styleMap: ['table => table.bordered', 'a => a.show', 'img => img.width'],
	};

	const getFile = (e) => {
		var ret = '';
		if (e) {
			var reader = new FileReader();
			reader.onloadend = function (event) {
				var arrayBuffer = reader.result;
				mammoth
					.convertToHtml({ arrayBuffer: arrayBuffer }, mammothOptions)
					.then(function (resultObject) {
						setDoc(resultObject.value);
					});
			};

			reader.readAsArrayBuffer(e);
		}
		return ret;
	};

	const convet = () => {
		var linkURL = prompt('Enter a URL:', 'http://');
		console.log(linkURL);
		document.execCommand('insertImage', false, linkURL);
	};

	const format = (command, value) => {
		document.execCommand(command, false, value);
	};

	const changeFont = () => {
		const Font = document.getElementById('input-font').value;
		document.execCommand('fontName', false, Font);
	};

	const changeSize = () => {
		const size = document.getElementById('fontSize').value;
		document.execCommand('fontSize', false, size);
	};
	const chooseColor = () => {
		const size = document.getElementById('myColor').value;
		document.execCommand('backColor', false, size);
	};
	const createLink = () => {
		var linkURL = prompt('Enter a URL:', 'http://');
		console.log(linkURL);
		document.execCommand(
			'createLink',
			false,
			`<a href="${linkURL}" target="_blank" ></>`
		);
	};

	return (
		<div>
			<header>
				<nav className='text-center m-0 py-4 border '>
					<span className='mx-2 file'></span>

					<span className='dropdown mx-2'>
						<button
							className='btn btn-primary dropdown-toggle'
							data-bs-toggle='dropdown'
						>
							File
						</button>
						<div className='dropdown-menu'>
							<div className='mx-2'>
								<input
									type='file'
									onChange={(e) => getFile(e.target.files[0])}
								/>
								<label>Import</label>
							</div>
							<button onClick={() => exportHtmlToDoc()} className='mt-2'>
								Save as Dox
							</button>
						</div>
					</span>

					<input id='filename-input' type='text' />

					<button type='button' className='mx-2' onClick={() => convet()}>
						<FontAwesomeIcon icon={faImage} className='fa-fw' />
					</button>

					<button className='mx-2' onClick={(e) => format('bold')}>
						<FontAwesomeIcon icon={faBold} className='fa-fw' />
					</button>

					<button className='mx-2' onClick={() => format('italic')}>
						<FontAwesomeIcon icon={faItalic} className='fa-fw' />
					</button>
					<button
						className='mx-2'
						onClick={() => format('insertunorderedlist')}
					>
						<FontAwesomeIcon icon={faList} className='fa-fw' />
					</button>
					<button className='mx-2' onClick={() => format('insertOrderedList')}>
						<FontAwesomeIcon icon={faListOl} className='fa-fw' />
					</button>
					<button className='mx-2' onClick={() => format('justifyLeft')}>
						<FontAwesomeIcon icon={faAlignLeft} className='fa-fw' />
					</button>
					<button className='mx-2' onClick={() => format('justifyFull')}>
						<FontAwesomeIcon icon={faAlignJustify} className='fa-fw' />
					</button>
					<button className='mx-2' onClick={() => format('justifyCenter')}>
						<FontAwesomeIcon icon={faAlignCenter} className='fa-fw' />
					</button>
					<button className='mx-2' onClick={() => format('justifyRight')}>
						<FontAwesomeIcon icon={faAlignRight} className='fa-fw' />
					</button>
					<button className='mx-2' onClick={() => format('underline')}>
						<FontAwesomeIcon icon={faUnderline} className='fa-fw' />
					</button>

					<button
						className='color-apply mx-2'
						type='button'
						onClick={() => createLink()}
						id='link'
					>
						<FontAwesomeIcon icon={faLink} className='fa-fw' />
					</button>
					<input
						className='color-apply mx-2'
						type='color'
						onChange={() => chooseColor()}
						id='myColor'
					/>
					<select
						id='input-font'
						className='mx-2'
						onChange={() => changeFont()}
					>
						<option>Normal</option>
						<option value='Arial'>Arial</option>
						<option value='Helvetica'>Helvetica</option>
						<option value='Times New Roman'>Times New Roman</option>
						<option value='Sans serif'>Sans serif</option>
						<option value='Courier New'>Courier New</option>
						<option value='Verdana'>Verdana</option>
						<option value='Georgia'>Georgia</option>
						<option value='Palatino'>Palatino</option>
						<option value='Garamond'>Garamond</option>
						<option value='Comic Sans MS'>Comic Sans MS</option>
						<option value='Arial Black'>Arial Black</option>
						<option value='Tahoma'>Tahoma</option>
						<option value='Comic Sans MS'>Comic Sans MS</option>
					</select>
					<select id='fontSize' onChange={() => changeSize()} className='mx-2'>
						<option>Font</option>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5</option>
						<option value='6'>6</option>
						<option value='7'>7</option>
						<option value='8'>8</option>
						<option value='9'>9</option>
						<option value='10'>10</option>
						<option value='11'>11</option>
						<option value='12'>12</option>
						<option value='13'>13</option>
						<option value='14'>14</option>
						<option value='15'>15</option>
					</select>
				</nav>
			</header>

			<MainContent doc={doc} />
			{/* <div className='showText'>{use && use.words}</div> */}
		</div>
	);
}
