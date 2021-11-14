# e-auction_system
Current tasks:
****
Page designs
* Ashdeep: **Want to Auction?**
* Shiva: **Explore Auctions**
* Balaji: **How it works?**

****

## Steps to deploy the React project in Github (`gh-pages`)
**Pre-requisites**
    * Have `nodejs` installed and `git` and a new repository (or existing one).
**Steps** _(Showing right from the start of creating the project)_
1. `npm init react-app <name_of_application>`
2. `cd <name_of_application>`
3. Check that its done properly by `npm start` and `^C` to terminate.
4. `npm install gh-pages --save-dev`. It adds a development dependency as.. 
    ```JSON
        "devDependencies": {
            "gh-pages": "^3.2.3"
        }
    ```
5. In the `package.json` file (which will be in the current directory), add the following lines of code...(At the beginning of the file...)<br/>
    *   ```JSON
            {
                "homepage": "https://<username-of-github>.github.io/<repository-name>",
                "name": "e-auction_system",
                "version": "1.0.0",
                .....
            }
        ```
    * Then next, make following changes to `"script"` as follows...<br/>
        ```JSON
            "scripts": {
                "predeploy": "npm run build",
                "deploy": "gh-pages -d build",
                ...
            }
        ```
6. Initialize the git via `git init`.
7. Add the destination, where our project gets pushed
    `git remote add origin https://github.com/Balaji-Ganesh/e-auction_system.git`
8. Propose changes to the project.
9. Stage all the changes made `git add .`.
10. Commit the changes made `git commit -m <message>`.
11. Deploy the project via `npm run deploy` _--  this invokes the command in the `script`'s **`deploy` of **`package.json`_. For the first time, authentication takes place.
12. Push the local repository to cloud via `git push -u origin master` _`master` is the branch name_
13. Enable the `gh-pages` environment for the repository.
via gh-pages:
  https://youtu.be/F8s4Ng-re0E
In heroku:
  https://youtu.be/dn4mmfbletg

***
***
## Report of meetup n 14th November, 2021 , Sunday_2 (Childrens Day, in memory of former prime minister Pandit Jawahar lal Nehru's Birthday.)
Task division:
	
@ShivRaj's [track here..](https://github.com/Balaji-Ganesh/e-auction_system/projects/1#card-72826251)
   1. Auction's deadline handling, termination of event, declaring the winner.
	
@Ashdeep's [track here..](https://github.com/Balaji-Ganesh/e-auction_system/projects/1#card-72826277)
   1. Pass all the details to the database
	2. And **sort** out the auctions based on the `publishDate` and time
	
@BalajiGanesh's [track here..](https://github.com/Balaji-Ganesh/e-auction_system/projects/1#card-72826284)
   1. Designing the page of Viewing Auctions -- eJS 

Deadline:
	By the end of Wednesday - 17th November, 2021

**Conclusion:**
* Addressed a challenge of handling event completion and winner declaration.
* Overview of project implementation and DB details.
* Tasks division


Try forking the respository, and propose the changes and make a commit -- this way we can have the collaborative code.

