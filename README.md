# BoulderSlackers

CSCI Group Project

## Github Layout

- **Master branch:** Main branch with the current best project
- **Name Branches:** Current updated features individuals are working on for review or collaboration

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