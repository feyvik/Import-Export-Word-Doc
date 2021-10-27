import React, { useState } from 'react';
import HTMLtoDOCX from 'html-to-docx';
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
	faPlus,
	faImage,
} from '@fortawesome/free-solid-svg-icons';
import mammoth from 'mammoth';
import MainContent from './MainContent';

const exportHtmlToDoc = async (htmlString) => {
	const fileBuffer = await HTMLtoDOCX(htmlString, null, {
		table: { row: { cantSplit: true } },
		footer: true,
		pageNumber: true,
	});

	const downloadUrl = URL.createObjectURL(fileBuffer);
	const link = document.createElement('a');
	link.href = downloadUrl;
	link.download = 'new_word_document.docx';
	link.target = '_blank';
	document.body.appendChild(link);
	link.click();
	link.remove();
};

export default function Header() {
	const [doc, setDoc] = useState();
	const mammothOptions = {
		convertImage: mammoth.images.imgElement(function (image) {
			return image.read('base64').then(function (imageBuffer) {
				return {
					src: 'data:' + image.contentType + ';base64,' + imageBuffer,
					style: 'width: 100%',
				};
			});
		}),
		styleMap: ['table => table.bordered', 'img => img.show'],
	};

	const getFile = (e) => {
		console.log(e);
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
	};
	const convet = (e) => {
		console.log(e);
		const reader = new FileReader();
		reader.onload = (e) => {
			const image = new Image();
			image.src = e.target.result;
			console.log(image.src);
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
		reader.readAsDataURL(e);
	};

	const format = (command, value) => {
		console.log(command, value);
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
		document.execCommand('color', false, size);
	};
	return (
		<div>
			<header>
				<nav className='text-center m-0 py-4 border'>
					<span className='mx-2 file'>
						<input type='file' onChange={(e) => getFile(e.target.files[0])} />
						<FontAwesomeIcon icon={faPlus} className='fa-fw' />
						<label>Import</label>
					</span>
					<span className='mx-2 file'>
						<button onClick={() => exportHtmlToDoc(doc)}>
							<FontAwesomeIcon icon={faPlus} className='fa-fw' />
							Export
						</button>
					</span>
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
					<span className='mx-2 file'>
						<input type='file' onChange={(e) => convet(e.target.files[0])} />
						<FontAwesomeIcon icon={faImage} className='fa-fw' />
						<label>Image</label>
					</span>
				</nav>
			</header>
			<MainContent doc={doc} />
		</div>
	);
}
