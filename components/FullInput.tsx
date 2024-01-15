import React, {  FC } from "react"


type FullInputPropsType = {
	callback: (valueInput: string) => void
	titleInput: string
	onKeyPressAddTask?: () => void
}

export const FuLLInput: FC<FullInputPropsType> = ({callback, titleInput, onKeyPressAddTask}) => {
	const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		callback(event.currentTarget.value)
	}
	const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key === 'Enter' && onKeyPressAddTask){
				onKeyPressAddTask()	
		}	
	}
	return(
		<>
			<input onChange={onChangeInputHandler} onKeyPress = {onKeyPressHandler} value={titleInput} />
		</>
	)
}