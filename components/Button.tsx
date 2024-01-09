import React, {FC} from "react";

type ButtonPropsType = {
	title: string
	onclickHandler?: () => void
}

export const Button:FC<ButtonPropsType> = ({title, onclickHandler}) => {
	return(
		<button onClick={onclickHandler} >{title}</button>
	)
}
