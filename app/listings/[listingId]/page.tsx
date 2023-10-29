import { IParams } from '@/app/types'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/app/components/EmptyState'
import ListingClient from './ListingClient'

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params)
	const currentUser = await getCurrentUser()

	if (!listing) return <EmptyState />

	return (
		<div>
			<ListingClient
				listing={listing}
				currentUser={currentUser}
			/>
		</div>
	)
}

export default ListingPage
