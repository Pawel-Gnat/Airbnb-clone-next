'use client'

import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
	return (
		<Link href='/'>
			<Image
				src='/images/logo.png'
				className='hidden md:block'
				height='100'
				width='100'
				alt='Logo'
			/>
		</Link>
	)
}

export default Logo
