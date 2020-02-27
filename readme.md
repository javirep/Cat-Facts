# CAT FACTS

Who doesn't like cats uh? :smile_cat: However, we know very little about them, for example, do you know that they spend 70% of their lives sleeping??? 

![](https://media.giphy.com/media/5aLrlDiJPMPFS/giphy.gif)

This is why we need to create an app for people to get more information about these lovely creatures. So let start right now!!

### ITERATION 1:

After years of research, we have discovered 2 fun-cat-facts that everyone should be aware of. If you go to ```starter-code > index.js``` you will see that there is an array called ```factsArray``` with our facts. Your first duty is to display these facts in the ```<ul>``` element of ```index.html```

### ITERATION 2: 

I know, I know, this might be too much cat information for an average human, maybe we should make that remove button work. So lets work on it, please make that button remove the last cat fact of the ```<ul>``` when clicked. 

### ITERATION 3:

But what about the cat lovers???? :heart_eyes_cat::heart_eyes_cat: we are building this web page so people can get overwhelmed by thousands and thousands of cat facts that they didn't know.

Fortunately there is an API ([you can find it here](http//catfacts.ninja)) that has that many cat facts. We have provided the basic url for you to make the calls to the API. So now you have everything you need to activate the add cat facts button and start displaying amazing cat facts. 

#### ITERATION 3.BONUS: 

It is great to have as many cat facts as possible, but its not that great if there are repeated ones right? So could you please make sure that we never add a repeated cat fact to the list?

<img src="./images/cat-bonus.png" alt="cat-bonus" width="200px" height="400px">

### ITERATION 4:

Amazing! I love reading all those cat facts that I didn't know!!! However, it's kind of annoying having to click the add button so many times. Wouldn't it be great if we could add multiple cat facts with just one click?? That would be pur-fect!

So in order to do it, our awesome API has a method to return several cat facts. For example, if we make a call to the following url: 

``` url = 'https://catfact.ninja/facts/?limit=3'```

It should return an object with 3 cat facts inside. And the good thing is that we can change that 3 for any number!! Even 1.000!!!

But first things first; Before adding multiple cats, our UX mates have suggested that we should let the user know that we are going to add that many number of facts, so could you implement a functionality that makes the text of the add button and remove button change their text to: "Add X cat facts" and "Remove X cat facts" where X is the number that the user selects in the input. (Hint: the onClick method won't be enough, maybe you need to check more [DOM events](https://www.w3schools.com/jsref/dom_obj_event.asp))

#### Iteration 4.2:

Now it's time for the party! let give the user the chance of adding multiple cat facts!! 

Please, don't use a for loop to call the cat facts multiple time, since making multiple calls will take a lot of extra time. You should better use the link before (```'https://catfact.ninja/facts/?limit=3'```) to make only one API call each time the user want to add more cat facts. 

Finally, we should give the option to the user to remove multiple elements from the list. Please, can you add this functionality to the app?

#### Iteration 4.2.Bonus:

Adding multiple cat facts is awesome, but we don't want them to be repeated. Can you make sure we don't add any repeated fact to the list??


## Time to practice!

Thank you very much to take the time to make this world a little bit better and more cat-friendly! You can check the answer (except for the itineration 4.2.Bonus) in the folder named solution. 

And please, do not forget to play with the code! :rocket: :dizzy:

