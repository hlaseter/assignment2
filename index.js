

const tweetUrl = 'http://ec2-54-172-96-100.compute-1.amazonaws.com/feed/random?q=noodle';

let id_set = new Set();
let allTweets = [];
let clear = 1;
let unpaused = 1;


function fetchTweets(){
   
  if (unpaused){


    fetch(tweetUrl)
      .then(res => res.json())
      
      .then((data) => {
        finalList = []
  
        data.statuses.forEach((item, i) => {
            if (!id_set.has(item.id)) {
               
                
                id_set.add(item.id);
                
                allTweets.push(item);

              }
            else{
                alert('it happened')
                console.log(item.id)
            }
        });


  //    allTweets = filterTweets(searchString);
  //      allTweets.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1);
      // console.log(id_set);
        refreshTweets(allTweets, clear);
        clear = 0;
        

      })

      .catch(err => {
        console.log(err);
      })
  }

}



function filterTweets(keyword){
  let filtered = [];
  if (!keyword) {
    return allTweets;
  } 
  
  else {
    allTweets.forEach((item, i) =>{
      if (item.text.toLowerCase().search(keyword.toLowerCase())!= -1){
        filtered.push(item);
      }
    });

    return filtered;
  }

}


let searchString = "";
const handleSearch = event => {
    if(unpaused){
    searchString = event.target.value.trim().toLowerCase();
    allTweets = filterTweets(searchString);
    refreshTweets(allTweets, 1);
    }
}

  



document.getElementById("searchbar").addEventListener("input", handleSearch)

function handlePause(){

    unpaused = !unpaused;

  }
  /**
   * Removes all existing tweets from tweetList and then append all tweets back in

   */
  const tweetContainer = document.getElementById('tweet-container');
  function refreshTweets(tweets, remove) {
      // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
      // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
      if (remove){
      while (tweetContainer.firstChild) {
          tweetContainer.removeChild(tweetContainer.firstChild);
     }}
  
      // create an unordered list to hold the tweets
      // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
      const tweetList = document.createElement("div");
      // append the tweetList to the tweetContainer
      // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
      tweetContainer.appendChild(tweetList);
    
      // all tweet objects (no duplicates) stored in tweets variable
     
      // filter on search text
      // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
      const filteredResult = filterTweets(searchString);
      // sort by date
      // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    
      filteredResult.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1);
      // execute the arrow function for each tweet
      // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
      filteredResult.forEach(tweetObject => {
          // create a container for individual tweet
         
  
          // e.g. create a div holding tweet content
          const twitterfeed = document.createElement("div");
          twitterfeed.classList.add('twitterfeed');
          const pic = document.createElement("div");
          pic.classList.add('profile-pic');
          const tweetWrapper = document.createElement("div");
          tweetWrapper.classList.add('tweet');
          const tweetContent = document.createElement("div");
          tweetContent.classList.add('tweet-content');
          const tweetInfo = document.createElement('div');
          tweetInfo.classList.add('tweet-info')
          const username = document.createElement("div");
          username.classList.add('poster-name')
          const handle = document.createElement("div");
          handle.classList.add('poster-handle');
          const date = document.createElement('div');
          date.classList.add('post-date');

     

 

          // create a text node "safely" with HTML characters escaped
          // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
          const tweetText = document.createTextNode(tweetObject.text);
          const tweet_id = document.createTextNode(tweetObject.id);
        
          const tweet_handle = document.createTextNode("@" + tweetObject.user.screen_name);
          const tweet_name = document.createTextNode(tweetObject.user.name);
          const full_date = tweetObject.user.created_at;
          const tweet_date = document.createTextNode(full_date.substring(4,10) + full_date.substr(full_date.length - 5));
          const ppic = tweetObject.user.profile_image_url;
       
          const profpic_url = document.createTextNode(ppic)
     
          // append the text node to the div
          var img = new Image();
        
                    twitterfeed.appendChild(pic);
          twitterfeed.appendChild(tweetWrapper);
            tweetWrapper.appendChild(tweetInfo);
            tweetWrapper.appendChild(tweetContent);
          tweetInfo.appendChild(handle);
          tweetInfo.appendChild(date);
          tweetInfo.appendChild(username);
          
        img.src = ppic;
        img.onerror = "this.onerror=null;this.src='img/no_photo.png';"
        pic.appendChild(img);
        twitterfeed.appendChild(pic);
        twitterfeed.appendChild(tweetWrapper);
          tweetWrapper.appendChild(tweetInfo);
          tweetWrapper.appendChild(tweetContent);
        tweetInfo.appendChild(handle);
        tweetInfo.appendChild(date);
        tweetInfo.appendChild(username);
        

        tweetContent.appendChild(tweetText);
         handle.appendChild(tweet_handle);
         username.appendChild(tweet_name);
         date.appendChild(tweet_date);

  
          // you may want to put more stuff here like time, username...
         
  
          // finally append your tweet into the tweet list
          tweetList.appendChild(twitterfeed);
      });
  }
document.getElementById("pause-feed").addEventListener("click", handlePause);  
                          

setInterval(function(){ 
    fetchTweets()   
}, 5000);