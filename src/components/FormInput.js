import React from 'react';
import PropTypes from 'prop-types';
const FormInput = (props) => {
	const { name, type, title, value, onChange } = props;
	return (
		<div className='input-groups'>
			<span className='label'>{title}</span>
			<div className='range-container'>
				<input
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					className='range-input'
					autoComplete='false'
				/>
			</div>
		</div>
	);
};

FormInput.prototype = {
	title: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.oneOf(['text']),
};

export default FormInput;
