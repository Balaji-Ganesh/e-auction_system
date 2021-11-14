

# Errors resolving
1.  `npm start`
    ```
    for internal/modules/cjs/loader.js:638
    throw err;
    ^
    Error: Cannot find module ...```

    * Delete the node_modules directory
    * Delete the package-lock.json file
    * Run npm install
    * Run npm start

    OR

    rm -rf node_modules package-lock.json && npm install && npm start

    src: https://stackoverflow.com/questions/53545800/internal-modules-cjs-loader-js582-throw-err

    Error in connecting database..
        ```mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork```
2. ReferenceError: TextEncoder is not defined

    https://stackoverflow.com/questions/19697858/referenceerror-textencoder-is-not-defined

3. Error in connecting to database..
    * [Fix](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu-tarball/): Execute the following command 
    >```mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork```
    * Shows similar to..
    ```
    about to fork child process, waiting until server is ready for connections.
    forked process: 158271
    child process started successfully, parent exiting
    ```
    * ------------ for the one, who installed using *tar ball.
    * Now, try runnin the server again..
