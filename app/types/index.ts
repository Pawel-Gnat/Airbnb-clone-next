import { Listing, Reservation, User } from '@prisma/client'

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
	createdAt: string
	updatedAt: string
	emailVerified: string | null
}

export type CountrySelectValue = {
	flag: string
	label: string
	latlng: number[]
	region: string
	value: string
}

export type IParams = {
	listingId?: string
	userId?: string
	authorId?: string
}

export type SafeListing = Omit<Listing, 'createdAt'> & {
	createdAt: string
}

export type SafeReservation = Omit<Reservation, 'createdAt' | 'startDate' | 'endDate' | 'listing'> & {
	createdAt: string
	startDate: string
	endDate: string
	listing: SafeListing
}
