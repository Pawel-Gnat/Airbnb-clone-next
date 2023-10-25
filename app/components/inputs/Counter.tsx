'use client'

import { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CounterProps {
	onChange: (value: number) => void
	value: number
	title: string
	subtitle: string
}

const Counter: React.FC<CounterProps> = ({ onChange, value, title, subtitle }) => {
	const onAdd = useCallback(() => {
		onChange(value + 1)
	}, [value, onChange])

	const onReduce = useCallback(() => {
		if (value === 1) {
			return
		}

		onChange(value - 1)
	}, [value, onChange])

	return (
		<div className='flex flex-row items-center justify-center'>
			<div className='flex flex-col w-full'>
				<p className='font-medium'>{title}</p>
				<p className='font-light text-gray-600'>{subtitle}</p>
			</div>
			<div className='flex flex-row items-center gap-4'>
				<button
					onClick={onReduce}
					className='w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 hover:opacity-80 transition-colors'>
					<AiOutlineMinus />
				</button>
				<span className='font-light text-xl text-neutral-600'>{value}</span>
				<button
					onClick={onAdd}
					className='w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 hover:opacity-80 transition-colors'>
					<AiOutlinePlus />
				</button>
			</div>
		</div>
	)
}

export default Counter
