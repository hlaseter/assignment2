# Assignment 2
## Your README content here

Known Bugs:
Duplicate tweets appear. I attempt to filter these out by adding every tweet ID to a set called id_set, and then check containment of that set before adding another tweet to my allTweets list. When I print out the set, I don't see duplicates. However, my page displays duplicate tweets.

Bad image URL handling: The console throws an error for a bad image URL.

Sorting: I attempt to sort my tweets by date whenever they are added, but this does not work 