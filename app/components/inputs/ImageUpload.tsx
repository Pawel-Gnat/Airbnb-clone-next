'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
	var cloudinary: any
}

interface ImageUploadProps {
	onChange: (value: string) => void
	value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url)
		},
		[onChange]
	)

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset='w1eikryb'
			options={{ maxFiles: 1 }}>
			{({ open }) => {
				return (
					<button
						onClick={() => open?.()}
						className='relative hover:opacity-70 transition-opacity border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'>
						<TbPhotoPlus size={50} />
						<p className='font-semibold text-lg'>Click to upload</p>
						{value && (
							<div className='absolute inset-0 w-full h-full'>
								<Image
									alt='Upload'
									fill
									style={{ objectFit: 'cover' }}
									src={value}
								/>
							</div>
						)}
					</button>
				)
			}}
		</CldUploadWidget>
	)
}

export default ImageUpload
