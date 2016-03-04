$(document).ready(function(){
	//var conceptName = $('#yearDropdown').find(":selected").text();
	var mainCounter=0;
	var categories=[];
	var organizationData=[];
	var listOfOrganization=[];
	
	var organizationSelected;
	var totalDonation=[];
	var organization_each={};
	var organization_total=[];
	var lineCharts;
	//console.log(organizationSelected);
	// $('#organizationDropdownSelect').change(function(){
	// 	organizationSelected= $('#organizationDropdownSelect').find(":selected").text();
	// 	init();
	// });
	init();
	
	
	// console.log(organizationSelected);

	
	$('#organizationDropdownSelect').change(function(){
		organizationSelected= $('#organizationDropdownSelect').find(":selected").val();
			createLineChart();
			createOverviewBarChart();
		intoChart(String(organizationSelected));
		overview();
		
    });	

	
	function init(){
		var public_spreadsheet_url='https://docs.google.com/spreadsheets/d/1NPIWzMRfK8-H8buko1k6RlBirfhPfvXBDyKh4Hepa6c/pubhtml';
		    tabletop = Tabletop.init( { key: public_spreadsheet_url,
                callback: showInfo,
                simpleSheet: true
         });
	}	
	function showInfo(data,tabletop){
		organization_total=[];
		for(i =1;i<tabletop.models.test.column_names.length;i++){
			categories.push(tabletop.models.test.column_names[i]);
		}
		for(i=0;i < data.length;i++){
		
		//console.log(typeof(data[i].organization));
			organization_each[data[i].organization] = [Number(data[i].year1),Number(data[i].year2),Number(data[i].year3),Number(data[i].year4)];
			//organization_total[data[i].organization]=[Number(data[i].total)];
			organization_total.push(Number(data[i].total));
		}
			listOfOrganization = Object.keys(organization_each);
			var optionAsString="";
		
			for(var i=0;i<listOfOrganization.length;i++){

				optionAsString += " <option value='"+listOfOrganization[i]+"'> "+ listOfOrganization[i] +" </option>";
			}
			$('select[name="organizationDropdown"]').empty();
			$('select[name="organizationDropdown"]').html(optionAsString);

	}

	function createLineChart(){
		lineCharts = new Highcharts.Chart({
			chart:{
				renderTo:'container',
				type:'line'
			},
			title:{
				text:''
			}
		});
	}

	function createOverviewBarChart(){
		barCharts=new Highcharts.Chart({
			chart:{
				renderTo:'container2',
				type:'bar'
			},
			title:{
				text:'Overview of organization'
			}
		})
	}

	function overview(){
		barCharts.xAxis[0].setCategories(listOfOrganization);

			barCharts.addSeries({
				name:"goo",
				type:'bar',
				data: organization_total //[25000,27000]
			})


	}

	function intoChart(name){		
		console.log(typeof(name));
		console.log(categories);
		lineCharts.xAxis[0].setCategories(categories);

		 //lineData = Number(organization[name]);
        console.log(organization_each[name]);
		lineCharts.addSeries({
			name:"goo",
			type:'line',
			data: organization_each[name]

		});
	 // $('#container').highcharts({
  //       chart: {
  //           type: 'line'
  //       },
  //       title: {
  //           text: 'Monthly Average Temperature'
  //       },
  //       subtitle: {
  //           text: 'Source: WorldClimate.com'
  //       },
  //       xAxis: {
  //           categories: categories
  //       },
  //       yAxis: {
  //           title: {
  //               text: 'Temperature (°C)'
  //           }
  //       },
  //       plotOptions: {
  //           line: {
  //               dataLabels: {
  //                   enabled: true
  //               },
  //               enableMouseTracking: false
  //           }
  //       },
  //       series: [{
  //           name: 'Tokyo',
  //           data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  //       }, {
  //           name: 'London',
  //           data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
  //       }]
  //   });
	}
});

