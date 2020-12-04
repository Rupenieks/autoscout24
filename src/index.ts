import { generateAvgListingSellPricePerSellerType, generatePercentualDistributionCarsByMake, generateTop5MostContactedListingPerMonth, generateTopThirtyPercentOfContactedListings } from './api/index';
import { getContactsFromCsv, getListingsFromCsv, outputCurrency } from './tools';
import { MonthOutput } from './types';
/**
 * Ronalds Upeniekes, Autoscout 24 Coding challenge
 * 
 */



async function start() {
	const listingsObjectArray = await getListingsFromCsv();
	const contactObjectArray = await getContactsFromCsv();
	
	console.table(generateAvgListingSellPricePerSellerType(listingsObjectArray));
	
	console.table(generatePercentualDistributionCarsByMake(listingsObjectArray));

	//@ts-ignore
	const top5MostContactedListings : MonthOutput[] = generateTop5MostContactedListingPerMonth(contactObjectArray, listingsObjectArray);
	
	top5MostContactedListings.forEach((outputItem : MonthOutput) => {
		console.log('Month: ' + outputItem.date);
		console.table(outputItem.listingOutput);
	});

	console.table([{
		average_selling_price: outputCurrency(generateTopThirtyPercentOfContactedListings(contactObjectArray, listingsObjectArray))
	}]);
}

start();



