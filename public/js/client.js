console.log('the client.js is working');


var deletePost = document.querySelectorAll(".delForm");

console.log('the js is working', deletePost);


if(deletePost){
  console.log('there is a deletePost');
  for (var i = 0; i < deletePost.length; i++) {
    deletePost[i].addEventListener('submit', function(event){
      console.log('the eventlistener was clicked');
      if(confirm("Are you sure you want to delete the post?") !== true){
        console.log('the page was prevented from default');
        event.preventDefault();
      }
    })
  }
}



var allLongDate = document.querySelectorAll('.publishDateLong');
console.log('the array of long dates', allLongDate);

if(allLongDate){
  for (var i = 0; i < allLongDate.length; i++) {
     allLongDate[i].textContent);
    let longDate = allLongDate[i].textContent;
    if(longDate.length > 0){
      let modDate = moment(longDate);
      allLongDate[i].textContent = modDate.format("LLLL");
    }
  }
}
