require.config({
	
	paths:{
		"jquery": "../jquery-1.10.1.min",
		"swiper": "../plugin/swiper",
		"jquery.ui": "../plugin/jquery-ui",
		"ajax" : "../plugin/ajaxth",
		"temp" :　"../template/temp",
		"tempengine" : "../template/tempengine",
		"date" : "../plugin/date",
		"partemp" : "../template/partner",
	},
	shim:{
		"ajax":{
			exports: "ajax"
		}
	}
}) 