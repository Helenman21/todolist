import React, {FC} from "react";

type ButtonPropsType = {
	title: string
	onclickHandler?: () => void
	classes?: string
	isDisable?: boolean
}

export const Button:FC<ButtonPropsType> = ({title, onclickHandler, classes, isDisable}) => {
	return(
		<button onClick={onclickHandler} className = { classes } disabled={isDisable} >{title} </button>
	)
}
