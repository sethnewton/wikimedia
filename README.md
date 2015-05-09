Assignment:
As mentioned, we would like to present you with a technical task. This is not pass fail, rather 
a way of getting a better feel for your development skills and approach to problem solving.

This task is intended to take no longer than 1-2 hours. This task can seem a bit open ended, 
meaning neverending. At the end of the 1-2 hours if you would like to elaborate what you would do 
next, please feel free to do so. We would love to hear your thoughts on that.

Please reply to this message when you begin the task. At the end of the 2 hour block, please 
respond with a link to a git repository.

We hope that you are up for this and look forward to hearing from you.

The Task:
You are building an API for a mini-Wikipedia with only a single article called 'Latest_plane_crash'. 
Just after a plane crash happened, there is a surge of API requests for this article from app and desktop 
users (>20k req/s). As an approximation for some data massaging, each request for the article in your 
server needs to recursively calculate fibonacci(34).

At the same time, a lot of editors following the news are scrambling to update the page as details 
emerge (up to 10 attempted edits/s). Editing happens by downloading the current revision of 
the text, modifying it and posting it back to the API. The article contains HTML, and should be persisted 
stored as a plain file on disk. Your code will run on a single 12-core server.

Acceptence Criteria:
- Intention is to get a sense for dev skills, don't overengineer
- complete in 1-2 hours
- DONE. Git repo needed
- DONE. single article named "Latest_plane_crash"
- 20k req/s
  - How much can we handle with one server currently?... 
- DONE. each request recursively calculates fibonacci
- 10 edits per second 
- DONE. Persist the files as a plane file on disk
- DONE. Use all processors on the server

Generic Steps:
- Install node
- Install npm
- npm install express --save
- npm install cluster --save
- npm install multer --save

Steps:
1) DONE. Setup Github repo
2) DONE. Install node (if I don't already have it on here)
3) DONE. get a server running... use cluster and express most likely?
4) DONE. Make it use all processors.
5) DONE. Create Read .get()
     - DONE. function fibonacciDance()
     - DONE. Return the actual file
     - DEFERRED. Return a status code?... skip for now maybe?
6) DONE. Create Write .post()
   - DONE. multer?
7) DONE. Save Upload as filename-timestamp-rand(1,10), then move to filename

Activity Notes:
3:07: Git clone created, node/npm installed...need to get a server going in node.
3:14: Knocked out most of the initial setups... 
3:15: ... now need to make sure it hits all processors... 
3:16: ... get a feel for how many requests it can handle.
3:19: Running siege to see if it can handle requests.. I may be rusty on this command though.
      ... kinda failed on the above, will come back to it later
3:20: Going to tackle recursive fibonacci...
3:27: Done with fibo, moving onto returning file on .get.
3:28: Before the above, we need to make a file first.
3:31: 10k test file created... back to returning this file on .get
3:35: testing...
3:37: Retrieving file correctly now.
3:42: Committed to git.
3:43: Need to write a file from post.
3:48: I have the write code, need syntax to test with curl.
3:58: It's uploading correctly, now we'll want to... write file with some kind of revision'ish name
4:09: Done.. now let's move it over the "real" one.
4:22: Writing up Architecture specs... wasted 10 minutes thinking about "what next". Better to just write it out.
4:37: Cleaning up a bit.

Architecture Chicken Scratch Thoughts:
- Load Balancer in front checking for heartbeat on the servers
- N number of servers
- NFS volume mounted on the servers, high speed pipeline connecting servers to NFS mount
- Node.js with a worker per CPU, handling reads and writes in parallel.  
- Could use haproxy to route writes through a system dedicated totally to writes.
- I'm banking a lot on minimum network lag between the boxes and the NFS mount.  That might be a deal breaker here.
- I'm assuming that we'll have subdomain api.wikimedia.com/ pointing to this server.
- I'm using all of the processors on the machine with Cluster

Misc Thoughts:
- I can't think of a better way in this time frame to handle so many writes besides allowing the writing of distinct files and then mv them.  My code cp's them, but I think it'd be better to mv the file in this case rather than cp now that I'm thinking about it.  Ran out of time, however.
- I didn't properly spec out a REST API all the way so I could prove that I have chops rather than tech writing ability.  But pfft, anyone can write docs amiright!?
- This system allows use of all processors for gets.  The processors will fight eachother to react to the requests first.
- For posts, I don't have a perfect system here most likely.  However, if we make a copy of the uploaded filename-$timestamp-$somerandomnumber, and them mv it to filename... we get "close".
- I'd like to be able to test this, but couldn't a "good enough" test + write the code in 1-2 hours.  I used siege and it performed pretty well. 
- Due to a lack of tests and time, I can't properly confirm this will handle 20k requests per second (I'm guessing it won't).  I suspect it will handle 10 writes per second, but I have run out of time to test that as well.

Answered Questions
- Do we want to write synchronously? Answer: Probably not... at least not with Node's writeFileSync at least.
- How to handle revisioning?... out of scope? Answer: Did a very generic solution for this

Unanswered Questions:
- How fast can we write a file?
- Do we need multiple servers?.. or will one do?
- Fastest way to handle writes in node?  Is there even an answer to this question?
- How to handle session/ownership for file revisions?
- How to roll out updates to all the servers?
