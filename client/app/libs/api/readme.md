# DATA BASE 
### API.js
This is a set of various queries to connect and get data from the Google FireBase Store
##
### Faked DB
This is a faked DB created for the purpose to demonstrate my App with various users and pictures\
All metadata receives from:

* https://randomuser.me/
* https://picsum.photos/

I manually created JSON file and then upload it to the FireBase DB\
No real users or personal data.\
Metadata is open for read and write only for authorized users - I must `Sign Up => Sign in` to see the data.
##
### Usage
#### Fake seeds
This script is written on my onw\

#### Usage:
* Download `fakedDataBaseSeeds.js` to your folder
* Run in terminal:
```
cd <folder's path>
node fakedDataBaseSeeds
``` 
* Once script has finished the process in the same folder the file `fakedDB.json` will appear
* You can upload this fake DB to your server DB