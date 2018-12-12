# BoulderSlackers

CSCI Group Project

This is an application to advertise CU Events to CU students. 

Registration must be done with a '@colorado.edu' e-mail address. 

After logging in, you will be re-directed to the Home feed. There will be a listing of all events, with the soonest events listed first, that will occur on the current day and into the future. 

The top right of the feed has a 'logout' button which will move you back to the login screen. 
The left of the navigation bar also has button to the 'Create Event' page and the 'Edit Profile' page.



## Github Layout
### Features
- **Master branch:** Main branch with the current best project
- **Production branch:** 'master' branch for back-end team to work/test new features before merging to functional master branch
- **Heroku branch:** Branch that is pushed up to Heroku for deployment
- **Name branches:** Current updated features individuals are working on for review or collaboration

###Project structure
- Testing files are in the 'testing' folder in the 'logging.js' file.
- Project info holds the Meeting notes and Milestones.
    - The /ProjectInfo/Website directory contains the .html files produced by the front-end team
- 'database.js' controls the accessibility to the presql database
- 'server.js' is the primary file running the app when 'npm start' script is run


## Use of project

Start by cloning the repository into a working directory using 

'''
git clone <repo-URL>
'''

cd into the './BoulderSlackers/server/' directory.
Edit the 'database.js' file to point to your database. The default is a localhost postgres server on port 5432, 
with a database 'bsz', with the authorization: user-'postgres', password-'pass'. 

The postgres database is initialized with the 'database.sql' file in db/. ***Note: Resetting the database might require editting the file to remove the tables first***

Once the database is configured, run the following command to install the node dependencies for the project.

'''
npm install
'''

After installing the dependencies, and ensuring there are no errors in the terminal, run the following command to host
site on http://localhost:4000

'''shell
npm start
'''

## Workflow

### New Feature

1. git pull [-all]
    Sync branches from online. '-all' will sync all branches while no extra option will just sync active branch
2. git branch [feature_branch_name]
    Create a new branch in whitch to develope a new feature
3. git checkout [feature_branch_name]
    Switch to a branch to edit
4. git add . *and* git commit -m "message"
    **FREQUENTLY** commit to maintain a good update log
5. git checkout [your_main_branch] *and* git pull [-all] (*and maybe* git merge master)
    Update your main branch to most include other's changes
6. git checkout [feature_branch_name] *and* git merge [your_main_branch]
    Solve any conflicts between other updates since you originally branched
7. git checkout [your_main_branch]
    Move back to your main branch
8. git merge [feature_branch_name]
    Merge your changes into the main branch.
9. *if wanting peer review before merging to master* git push origin [your_main_branch]
    Push your new code to github so someone else can view and test your work