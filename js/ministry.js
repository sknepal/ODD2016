$(document).ready(function(){
init();
var ministry={};
var listOfMinistry=[];
var ministrySelected;
var ministryTotalBudget={}; 
// var ministryWithHighestBudget;
// var ministryWithLowestBudget;
// var ministryWithHighestGrant;
// var ministryWithLowestGrant;
// var ministryWithHighestLoan;
// var ministryWithLowestLoan;
var sortedBudgetList=[];
var ministryWithBudget={};
var listOfBudget=[];
function init(){
		var public_spreadsheet_url='https://docs.google.com/spreadsheets/d/1_1GM3Qz7IAb_9sjOQBO4-c4Qc_X3ncZIqiDUIS_Uza4/pubhtml';
		    tabletop = Tabletop.init( { key: public_spreadsheet_url,
                callback: showInfo,
                simpleSheet: true
         });
	}


	$('#ministryDropdownSelect').change(function(){
		ministrySelected= $('#ministryDropdownSelect').find(":selected").val();
			
			
		intoChart(String(ministrySelected));
		
		
    });	

function showInfo(data,tabletop){
	// ministryWithHighestLoan={"ministry": data[0].ministry, "highestForeignLoan": Number(data[0].totalforeignloan)};
	// ministryWithHighestGrant={"ministry":data[0].ministry, "highestForeignGrant":Number(data[0].totalforeigngrant)};
	for(var i=0;i<data.length;i++){
	// ministry[data[i].ministry]= [Number(data[i].gon), Number(data[i].totalforeigngrant),Number(data[i].totalforeignloan), Number(data[i].total)];
	ministry[data[i].ministry]=[ ['GON', Number(data[i].gon)],['Foreign Grant' ,Number(data[i].totalforeigngrant) ],
								['Foreign Loan', Number(data[i].totalforeignloan)] ];
	ministryTotalBudget[data[i].ministry]= [Number(data[i].total) ];
	//listOfBudget.push(Number(data[i].total));
	// if(Number(data[i].totalforeignloan)>ministryWithHighestLoan["highestForeignLoan"]) ministryWithHighestLoan={"ministry":data[i].ministry,"highestForeignLoan":Number(data[i].totalforeignloan)};
	// if(Number(data[i].totalforeigngrant)>ministryWithHighestGrant["highestForeignGrant"]) ministryWithHighestGrant={"ministry":data[i].ministry, "highestForeignGrant":Number(data[i].totalforeigngrant)}; 


	}
	// console.log(listOfBudget);
	// listOfBudget=listOfBudget.sort();
	// console.log(listOfBudget);
	listOfMinistry= Object.keys(ministry);

	var optionAsString="";
	for(var i=0;i<listOfMinistry.length;i++){
			optionAsString += " <option value='"+listOfMinistry[i]+"'> "+ listOfMinistry[i] +" </option>";
	}
	$('select[name="ministryDropdown"]').empty();
	$('select[name="ministryDropdown"]').html(optionAsString);
}



function intoChart(ministryName){
 console.log(ministry);
var dataToDisplay=ministry[ministryName];
console.log(dataToDisplay);
$("#totalBudget").html("Total Budget is " + ministryTotalBudget[ministryName]);

$('#container').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: 'Contents of Highsoft\'s '+ ministryName
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Total Amount',
            // data: [
            //     ['Bananas', 8],
            //     ['Kiwi', 3],
            //     ['Mixed nuts', 1],
            //     ['Oranges', 6],
            //     ['Apples', 8],
            //     ['Pears', 4],
            //     ['Clementines', 4],
            //     ['Reddish (bag)', 1],
            //     ['Grapes (bunch)', 1]
            // ]
            data:dataToDisplay
        }]
    });
}




	// function createPieChart(){
	// 	pieCharts=new Highcharts.Chart({
	// 		chart:{
	// 			renderTo:'container',
	// 			type:'pie'
	// 		},
	// 		title:{
	// 			text:'Ministry budget'
	// 		}
	// 	});
	// }

	// pieCharts.addSeries({
	// 	name:'hehe',
	// 	type:'pie',
	// 	options3d: {enabled:true,alpha:45},
	// 	// data:[
 //  //               ['Bananas', 8],
 //  //               ['Kiwi', 3],
 //  //               ['Mixed nuts', 1],
 //  //               ['Oranges', 6],
 //  //               ['Apples', 8],
 //  //               ['Pears', 4],
 //  //               ['Clementines', 4],
 //  //               ['Reddish (bag)', 1],
 //  //               ['Grapes (bunch)', 1]
 //  //           ]
 //  		data:['kera',23]
	// });



});