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
