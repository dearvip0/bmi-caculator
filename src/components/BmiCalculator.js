import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';

const BmiCalculator = ({ getBmiValue }) => {
	const [heightUnit, setHeightUnit] = useState('cm');
	const [weightUnit, setWeightUnit] = useState('kg');
	const [unit, setUnit] = useState('Metric');

	// const [count, setCount] = useState({
	// 	data: {
	// 		heightCount: '0',
	// 		weightCount: '0',
	// 		inchesCount: '0',
	// 	},
	// });

	const [count, setCount] = useState({
		heightCount: '0',
		weightCount: '0',
		inchesCount: '0',
	});

	const { heightCount, weightCount, inchesCount } = count;

	useEffect(() => {
		metricBMI(heightCount, weightCount);
		imperialBMI(heightCount, weightCount, inchesCount);
	}, [heightCount, weightCount, inchesCount]);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setCount((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const onSelectTag = (e) => {
		setUnit(e.target.value);
		if (e.target.value === 'Metric') {
			setHeightUnit('cm');
			setWeightUnit('kg');
		} else {
			setHeightUnit('ft');
			setWeightUnit('lb');
		}
	};

	const metricBMI = (height, weight) => {
		if (height > 0 && weight > 0) {
			const heightToMeter = height / 100;
			const bmi = weight / (heightToMeter * heightToMeter);
			getBmiValue(Math.round(bmi));
		}
	};

	const imperialBMI = (height, weight, inches) => {
		if (height > 0 && weight > 0 && inches > 0) {
			const heightToInches = height * 12 + parseInt(inches);
			const bmi = 703 * (weight / (heightToInches * heightToInches));
			getBmiValue(Math.round(bmi));
		}
	};

	const resetData = (e) => {
		e.preventDefault();

		setUnit('Metric');
		setCount({
			heightCount: '0',
			weightCount: '0',
			inchesCount: '0',
		});
		setHeightUnit('cm');
		setWeightUnit('kg');
	};

	return (
		<>
			<div className='bmi-inputs'>
				<div className='inputs-fields'>
					<div className=''>
						<span className='label-unit'>Unit</span>
						<div className='unit'>
							<select
								name='unit'
								value={unit}
								onChange={onSelectTag}
								className='form-control form-control-sm'>
								<option value='Metric'>Metric</option>
								<option value='Imperial'>Imperial</option>
							</select>
						</div>
					</div>
					<FormInput
						type='text'
						name='heightCount'
						title={`Height (${heightUnit})`}
						value={heightCount}
						onChange={onChangeInput}
					/>
					{unit === 'Imperial' ? (
						<FormInput
							type='text'
							name='inchesCount'
							title={` (in))`}
							value={heightCount}
							onChange={onChangeInput}
						/>
					) : (
						''
					)}

					<FormInput
						type='text'
						name='weightCount'
						title={`Weight (${weightUnit})`}
						value={weightCount}
						onChange={onChangeInput}
					/>
				</div>
				<button className='button' type='submit' onClick={resetData}>
					Reset
				</button>
			</div>
		</>
	);
};

export default BmiCalculator;
