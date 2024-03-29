'use client'

import Image from 'next/image'
import { format } from 'date-fns'

import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import useCountries from '@/app/hooks/useCountries'
import { useCallback, useMemo } from 'react'
import HeartButton from '../HeartButton'
import Button from '../Button'
import { useRouter } from 'next/navigation'

interface ListingCardProps {
	currentUser?: SafeUser | null
	data: SafeListing
	reservation?: SafeReservation
	onAction?: (id: string) => void
	disabled?: boolean
	actionLabel?: string
	actionId?: string
}

const ListingCard: React.FC<ListingCardProps> = ({
	currentUser,
	data,
	reservation,
	onAction,
	disabled,
	actionId = '',
	actionLabel,
}) => {
	const router = useRouter()
	const { getByValue } = useCountries()
	const location = getByValue(data.locationValue)

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()

			if (disabled) {
				return
			}

			onAction?.(actionId)
		},
		[onAction, actionId, disabled]
	)

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice
		}

		return data.price
	}, [reservation, data.price])

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null
		}

		const start = new Date(reservation.startDate)
		const end = new Date(reservation.endDate)

		return `${format(start, 'PP')} - ${format(end, 'PP')}`
	}, [reservation])

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className='col-span-1 group cursor-pointer'>
			<div className='flex flex-col gap-2 w-full'>
				<div className='aspect-square w-full relative overflow-hidden rounded-xl'>
					<Image
						fill
						alt='Listing'
						src={data.imageSrc}
						className='object-cover h-full w-full group-hover:scale-110 transition-transform'
					/>
					<div className='absolute top-3 right-3'>
						<HeartButton
							listingId={data.id}
							currentUser={currentUser}
						/>
					</div>
				</div>
				<p className='font-semibold text-lg'>
					{location?.region}, {location?.label}
				</p>
				<p className='font-light text-neutral-500'>{reservationDate || data.category}</p>
				<div className='flex flex-row items-center gap-1'>
					<p className='font-semibold'>$ {price}</p>
					{!reservation && <p className='font-light'>night</p>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	)
}

export default ListingCard
