import { generateAvgListingSellPricePerSellerType, generatePercentualDistributionCarsByMake, generateTop5MostContactedListingPerMonth, generateTopThirtyPercentOfContactedListings } from './api/index';
import { getContactsFromCsv, getListingsFromCsv } from './tools';
/**
 * Ronalds Upeniekes, Autoscout 24 Coding challenge
 * 
 */



async function start() {
	const listingsObjectArray = await getListingsFromCsv();
	const contactObjectArray = await getContactsFromCsv();
	
	generateAvgListingSellPricePerSellerType(listingsObjectArray);
	
	generatePercentualDistributionCarsByMake(listingsObjectArray);

	generateTop5MostContactedListingPerMonth(contactObjectArray, listingsObjectArray);

	generateTopThirtyPercentOfContactedListings(contactObjectArray, listingsObjectArray);
}

start();



