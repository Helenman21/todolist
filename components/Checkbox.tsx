import React from 'react';
import PropTypes from 'prop-types';
import CheckBox  from '@mui/material/Checkbox';

type CheckboxPropsType = {
	checked: boolean
	onChange: (e: boolean) => void
}
export const CheckboxComponent = ({checked, onChange}:CheckboxPropsType) => {
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.currentTarget.checked)
	}
	return (
		<CheckBox checked={checked} onChange={onChangeHandler}/>
	);
};


