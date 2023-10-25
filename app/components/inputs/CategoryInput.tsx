'use client'

import { IconType } from 'react-icons'

interface CategoryInputProps {
	onClick: (value: string) => void
	selected: boolean
	label: string
	icon: IconType
}

const CategoryInput: React.FC<CategoryInputProps> = ({ onClick, selected, label, icon: Icon }) => {
	return (
		<button
			onClick={() => onClick(label)}
			className={`w-full rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition-colors ${
				selected ? 'border-black' : 'border-neutral-200'
			}`}>
			<Icon size={30} />
			<span className='font-semibold'>{label}</span>
		</button>
	)
}

export default CategoryInput
