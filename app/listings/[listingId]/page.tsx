import { IParams } from '@/app/types'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/app/components/EmptyState'
import getReservations from '@/app/actions/getReservations'
import ListingClient from './ListingClient'

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params)
	const reservations = await getReservations(params)
	const currentUser = await getCurrentUser()

	if (!listing) return <EmptyState />

	return (
		<div>
			<ListingClient
				listing={listing}
				reservations={reservations}
				currentUser={currentUser}
			/>
		</div>
	)
}

export default ListingPage
