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
	
	console.log('Average Listing Selling Price per Seller Type:');
	console.table(generateAvgListingSellPricePerSellerType(listingsObjectArray));
	
	console.log('Percentual distribution of available cars by Make:');
	console.table(generatePercentualDistributionCarsByMake(listingsObjectArray));

	console.log('Average price of the 30% most contacted listings:');
	console.table([{
		average_selling_price: outputCurrency(generateTopThirtyPercentOfContactedListings(contactObjectArray, listingsObjectArray))
	}]);

	//@ts-ignore
	const top5MostContactedListings : MonthOutput[] = generateTop5MostContactedListingPerMonth(contactObjectArray, listingsObjectArray);

	console.log('The Top 5 most contacted listings per Month:');
	top5MostContactedListings.forEach((outputItem : MonthOutput) => {
		console.log('Month: ' + outputItem.date);
		console.table(outputItem.listingOutput);
	});
}

start();



