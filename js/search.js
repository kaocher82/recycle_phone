function getData(){
  $('.TB_COLLAPSE').html("<caption>查詢結果</caption><thead><tr><th>公司</th><th>店家</th><th>地址</th><th>電話</th><th>地圖</th></tr></thead>");
  $('.loading_area').append("<img src='img/loading.gif'  style='width:350px;height:350px;'>");
  
  //style="display:block; margin:auto;"
  var data1, data2, data3, data4;
  var dataset = [];
    $.when(
  // Get the HTML
  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=0&$top=1000&format=json',
         success:function (data){
           
            data1 = data;
          }
  }),

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=1000&$top=1000&format=json',
         success:function (data){
            
            data2 = data;
          }
  }),

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=2000&$top=1000&format=json',
         success:function (data){
           data3 = data;
          }
  }),

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'http://opendata.epa.gov.tw/ws/Data/WRMobile/?$orderby=RecycleSiteId&$skip=3000&$top=1000&format=json',
         success:function (data){
           data4 = data;
          }
  })



  
 ).then(function(){
  dataset.push(data1);
  dataset.push(data2);
  dataset.push(data3);
  dataset.push(data4);

  //console.log(dataset[0][7]);

  function clearBox(elementID){
    $('.TB_COLLAPSE').html("<caption>查詢結果</caption><thead><tr><th>公司</th><th>店家</th><th>地址</th><th>電話</th><th>地圖</th></tr></thead>");
	 $('.loading_area').html("");
  }
  clearBox();


  var select1 = document.getElementById("selectCounty"); 

  var select2 = document.getElementById("selectCompany"); 

  var  array = [];
  Newarray = [];



  if(select1.value !== '' && select2.value == ''){
   for( i=0 ; i<4 ; i++){
      
      for(j=0 ; j<dataset[i].length ; j++)
        if (dataset[i][j].County == select1.value) {
          var address = "https://www.google.com.tw/maps/place/"+dataset[i][j].RecycleSiteAddress;
          console.log(address);
          $('.TB_COLLAPSE').append('<tr><td>'+dataset[i][j].RecycleCompany+'<td>'+dataset[i][j].RecycleSiteName+'</td><td>'+dataset[i][j].RecycleSiteAddress+'</td><td>'+dataset[i][j].RecycleSiteTel+'</td><td>'+'<a href = '+address+'>'+'<img src="img/map.png" /></a>'+'</td></tr>');
          console.log('bingo');

           for(k=0 ; k<dataset[i][j].RecycleSiteAddress.length ; k++ ){
             
              if (array[k] == "縣" || array[i] == "市")
                Newarray = array[k+1]
              if (array[k] == "區")
                Newarray = array[k]
                break;

           }

           console.log(Newarray)
    
        }   
        else{
          console.log('no result1');
        }
    }
    console.log(select2.value)
    console.log(select2.value)
 
    console.log('1')
  }


  else if(select1.value == '' && select2.value != ''){
    for( i=0 ; i<4 ; i++){
      
      for(j=0 ; j<dataset[i].length ; j++)
        if (dataset[i][j].RecycleCompany.indexOf(select2.value) > -1) {
          var address = "https://www.google.com.tw/maps/place/"+dataset[i][j].RecycleSiteAddress;
          console.log(address);
          $('.TB_COLLAPSE').append('<tr><td>'+dataset[i][j].RecycleCompany+'<td>'+dataset[i][j].RecycleSiteName+'</td><td>'+dataset[i][j].RecycleSiteAddress+'</td><td>'+dataset[i][j].RecycleSiteTel+'</td><td>'+'<a href = '+address+'>'+'<img src="img/map.png" /></a>'+'</td></tr>');
          
          
          console.log('bingo');
        }
        else{
          console.log('no result2');
        }
    }
    console.log(select2.value)
    console.log(select2.value)
 
    console.log('2')
  }
   
  else if(select1.value != '' && select2.value != ''){
    for( i=0 ; i<4 ; i++){
      
      for(j=0 ; j<dataset[i].length ; j++)
        if (dataset[i][j].RecycleCompany.indexOf(select2.value) > -1 && dataset[i][j].County == select1.value) {
          var address = "https://www.google.com.tw/maps/place/"+dataset[i][j].RecycleSiteAddress;
          console.log(address);
          $('.TB_COLLAPSE').append('<tr><td>'+dataset[i][j].RecycleCompany+'<td>'+dataset[i][j].RecycleSiteName+'</td><td>'+dataset[i][j].RecycleSiteAddress+'</td><td>'+dataset[i][j].RecycleSiteTel+'</td><td>'+'<a href = '+address+'>'+'<img src="img/map.png" /></a>'+'</td></tr>');
          console.log('bingo');
        }
        else{
          console.log('no result3');
        }
    }
    console.log(select1.value)
    console.log(select2.value)
   
    console.log('3')
  }
    
  
  });
  
}



