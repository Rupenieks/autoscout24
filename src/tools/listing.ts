import { Listing, Make, Seller } from "../types";

export function getCountBySellerType(sellerType: Seller, listings: Listing[]): number {
	const segregatedListings = listings.filter(listing => listing.seller_type === sellerType);
	return segregatedListings.length;
}

export function getCountByCarMake(make: Make, listings: Listing[]): number {
	const segregatedListings = listings.filter(listing => listing.make === make);
	return segregatedListings.length;
}

export function getPriceSumBySellerType(sellerType: Seller, listings: Listing[]): number {
	const segregatedListings = listings.filter(listing => listing.seller_type === sellerType);
	return segregatedListings.reduce((prev, cur) => prev + cur.price, 0);
}



