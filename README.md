Hi, welcome to my clone of Tumblr, Rumblr. Simply follow the link
below and create a profile.

https://rumblr.app

I began my coding journey at the beginning of last year. Around that time time
I had found a coding bootcamp called App Academy. App Academy is a 9 week 
in-person coding bootcamp, but they also offer their entire course for free
online. I followed this course at my own pace over the course of the last year.

The stack used to create this clone was MongoDB, Express, React, Node, GraphQL and Apollo.
My static file database is aws s3 with Cloudfront as the CDN. My database is MongoDB Atlas.
App Academy teaches two tech stacks throughout their course. They begin with Ruby and Ruby
On Rails with Postgresql and they end with the MERN stack. While I do enjoy Ruby On Rails
and look forward to possibly returning to it in the future, I decided to use the
MERNGA stack here for a few different reasons:

-The MERNGA stack is far less streamlined and forgiving then RoR. I felt that building
my first clone with this stack would be more of a challenge and would therefore
test my newly acquired knowledge while also offering plenty of opportunities to
learn new things along the way.

-Javascript. I wanted to learn as much of it as I could given that it's the backbone
of the web.

-After being introduced to GraphQL--as well as Apollo and caching generally--I was 
very intrigued and wanted to learn more.

-I had also become interested in NoSQL and DBMS and wanted to explore MongoDB more. The
added bonus of MongoDB was the ability to not have to write a migration every time I 
changed my database schema, which ended up being very frequently but rather painless.

---------------------------------------------------------------------------------------

I attempted to clone as many features as I could possibly handle during the past three months.
In the app you will see what is essentially the very basics of a fully functioning social
media application.

Highlighting just a few of the features I built, these two come to mind:

1) I built my own custom drag and drop for post and forms using both React, Node and
   vanilla javascript. To keep the look and feel of Tumblr I used a combination
   of image containers and text box containers. I leveraged the useEffect hook
   with custom object indexes to keep the image file upload array in sync with
   how the images were being displayed. Doing this ensured that the file uploads
   were always uploaded and returned in the order that they appeared within the post.
   
2) Tumblr has a style of post called a Chat post, and I built my own version of it.
   This was a great learning experience using Javascript ranges, selections and a
   little bit of regex. I used all three to make the Chat post function. When making
   a chat post everytime a colon is entered on a new line everything to the left of the colon
   is bolded. This experience actually led me to learning about rich text editors and eventually
   implementing one called ckEditor which I integrated through the app.
   
   
 ---------------------------------------------------------------------------------------
 
This has been a great experience. I've learned so much just over the course of the past three months.
Looking back at my codebase as I'm about to declare the first version of this app finished
I can already see countless areas for improvement. I also see countless lessons that I'm excited
to have learned and look forward to being able to build upon in the future.

I hope you enjoy Rumblr and I look forward to all the feedback I'll be getting in the future!

John










