'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
	const router = useRouter()
	return (
		<a href='/'>
			<Image
				src='/images/logo.png'
				className='hidden md:block'
				height='100'
				width='100'
				alt='Logo'
			/>
		</a>
	)
}

export default Logo
