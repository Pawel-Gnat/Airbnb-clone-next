'use client'

import { IconType } from 'react-icons'

import { SafeUser } from '@/app/types'
import useCountries from '@/app/hooks/useCountries'
import Avatar from '../Avatar'
import ListingCategory from './ListingCategory'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../Map'), {
	ssr: false,
})

interface ListingInfoProp {
	user?: SafeUser | null
	category: { icon: IconType; label: string; description: string } | undefined
	description: string
	roomCount: number
	guestCount: number
	bathroomCount: number
	locationValue: string
}

const ListingInfo: React.FC<ListingInfoProp> = ({
	user,
	category,
	description,
	roomCount,
	guestCount,
	bathroomCount,
	locationValue,
}) => {
	const { getByValue } = useCountries()
	const coordinates = getByValue(locationValue)?.latlng

	return (
		<div className='col-span-4 flex flex-col gap-8'>
			<div className='flex flex-col gap-2'>
				<div className='text-xl font-semibold flex flex-row items-center gap-2'>
					<p> Hosted by {user?.name}</p>
					<Avatar />
				</div>
				<div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
					<span>{guestCount} guests</span>
					<span>{roomCount} rooms</span>
					<span>{bathroomCount} bathrooms</span>
				</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category.label}
					description={category.description}
				/>
			)}
			<hr />
			<p className='text-lg font-light text-neutral-500'>{description}</p>
			<hr />
			<Map center={coordinates} />
		</div>
	)
}

export default ListingInfo
