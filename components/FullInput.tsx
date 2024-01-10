import {  FC } from "react"


type FullInputPropsType = {
	callback: (valueInput: string) => void
	titleInput: string
}

export const FuLLInput: FC<FullInputPropsType> = ({callback, titleInput}) => {
	const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		callback(event.currentTarget.value)
	}
	return(
		<>
			<input onChange={onChangeInputHandler} value={titleInput} />
		</>
	)
}