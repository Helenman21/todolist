import React, {FC} from "react";

type ButtonPropsType = {
	title: string
}

export const Button:FC<ButtonPropsType> = ({title}) => {
	return(
		<button>{title}</button>
	)
}
