import { getAverage, getCountByCarMake, getCountBySellerType, getPercentage, getPriceSumBySellerType, outputCurrency } from "../tools";
import { Listing, Make, PercentualDistributionCarsByMakeOutput, Seller } from "../types";

/**
 * Class responsible for operations to do with the Listings
 */
export class ListingService{
	constructor() {

	}

	// Hardcoded in case if database values have typos or errors, report would produce
	// incorrect results. I.e BWM instead of BMW 
	carMakes = ['Audi', 'Mazda', 'Toyota', 'Renault', 'VW', 'Mercedes-Benz', 'Fiat', 'BMW'];
	sellerTypes = ['private', 'dealer', 'other'];

	getAvgSellingPricePerSellerType(listings : Listing[]) {
		const output = this.sellerTypes.map(type => ({
			seller_type: type, average_in_euro: outputCurrency(getAverage(this.getPriceSumBySellerType(type as Seller, listings), this.getCountBySellerType(type as Seller, listings)))
		}));

		return output;
	}

	getPercentDistributionCarsByMake(listings : Listing[]) {
		const output = this.carMakes.map(make => ({
			make: make, distribution: `${getPercentage(this.getCountByCarMake(make as Make, listings), listings.length)}%`
		}));

		output.sort((a, b) => parseFloat(b.distribution) - parseFloat(a.distribution));

		return output;
	}

	sortAscendingByDistribution(distributionOutput : PercentualDistributionCarsByMakeOutput[]) {
		return distributionOutput.sort((a, b) => parseFloat(b.distribution) - parseFloat(a.distribution));
	}

	getCountBySellerType(sellerType: Seller, listings: Listing[]): number {
		const segregatedListings = listings.filter(listing => listing.seller_type === sellerType);
		return segregatedListings.length;
	}
	
	getCountByCarMake(make: Make, listings: Listing[]): number {
		const segregatedListings = listings.filter(listing => listing.make === make);
		return segregatedListings.length;
	}
	
	getPriceSumBySellerType(sellerType: Seller, listings: Listing[]): number {
		const segregatedListings = listings.filter(listing => listing.seller_type === sellerType);
		return segregatedListings.reduce((prev, cur) => prev + cur.price, 0);
	}
}

