import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import mammoth from 'mammoth';

export default function Header() {
	const getFile = (e) => {
		console.log(e);
		var reader = new FileReader();
		reader.onloadend = function (event) {
			var arrayBuffer = reader.result;
			mammoth
				.convertToHtml({ arrayBuffer: arrayBuffer })
				.then(function (resultObject) {
					localStorage.setItem('doc', resultObject.value);
					console.log(resultObject);
				});
		};
		reader.readAsArrayBuffer(e);
	};

	return (
		<header>
			<nav className='row m-0 py-2'>
				<div className='mx-2 file'>
					<input type='file' onChange={(e) => getFile(e.target.files[0])} />
					<FontAwesomeIcon icon={faPlus} className='fa-fw' />
					<label>Import </label>
				</div>

				<div className='mx-2 file text-right'>
					<button>Export</button>
				</div>
			</nav>
		</header>
	);
}
