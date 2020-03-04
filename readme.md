Description of the problem and the solution
The problem I was tasked with was making a service that allowed users to send emails
the solution was to use a backend to send the emails and frontend to make the information 
prettier to the user

Is the project focused on the backend, front end or full-stack
this project is full-stack but is mainly focused on the frontend

Outline of the technology and architectural decision you made
I used react for the frontend hosted the frontend on firebase. For the backend I used express
but I hosted two ways, as a firebase could function and with a digital ocean node js droplet

Trade-offs you made
I switched from mailgun to mailjet because mailgun required that I have a domain name to send 
emails to anyone besides myself. I tried to implement some unit
test but they are quite slow to run because with unit tester built in to react (jest)
simulates the browser by rendering the object for testing I am still looking for better 
alternatives. The next thing I did is implement the backend as a firebase cloud function 
so that I could use it with the firebase frontend instead of using the digital ocean 
node js droplet

How to build and test the project, ideally both are automated
To build and test the frontend of the project after cloning it from github run
"""
npm install
npm run test
npm run build
npm install -g serve
serve -s build
"""
to run the backend of the project after cloning it from github run
"""
npm install
node index.js
"""
these commands work for testing the react portion but I did not write any unit test
for the backend because it is a very short script. The frontend uses a firebase api
key for retrieving past emails and the backend uses several api keys for the email apis.
If you need those I can send them to you just shoot me an emails.

A defined branching model. How would people contribute features and bugs to your project?
For myself I added a test branch where I would do all my testing and then I would merge
those changes to the master branch and push them to github. If I was working with more 
people I would have them each make their own branch and have them work on individual 
features then push it to the test branch and once the features work I would push it to 
the master branch

Links to any other code you're proud of
https://github.com/djmasaka/sam

If your project is hosted live somewhere, add the link(Optional)
the emails may not the pass the spam filter of services like gmail so if it does not work you can use 
a fake email generator like http://www.fakemailgenerator.com/ for testing
the site is hosted here https://email-4a45a.firebaseapp.com/
the code for the frontend is here https://github.com/djmasaka/emailFrontend
the code for the backend is here https://github.com/djmasaka/expressEmailService