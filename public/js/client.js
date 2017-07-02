console.log('the client.js is working');


var deletePost = document.querySelector(".delForm");

console.log('the js is working', deletePost);

// FIXME: The confirm on delete is not working

if(deletePost){
  console.log('there is a deletePost');
  deletePost.addEventListener("submit", function(event){
    console.log('the eventlistener was clicked');
    if(confirm("Are you sure?") !== true){
      console.log('the page was prevented from default');
      event.preventDefault();
    }
  })
}
