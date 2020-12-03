export type AvgListingSellPricePerSellerTypeOutput = {
	seller_type: string,
	average_in_euro: string
};

export type PercentualDistributionCarsByMakeOutput = {
	make: string,
	distribution: string
};

export type AveragePriceTop30ContactedListingsOutput = {
	average_price: string
};

export type Top5ContactedListingsPerMonthOutput = {
	listing_id: number,
	make: string,
	selling_price: string,
	mileage: string,
	total_amount_of_contacts: number
};

export type MonthOutput = {
	date: string,
	listingOutput: Top5ContactedListingsPerMonthOutput[]
}