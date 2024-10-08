# User Stories

![Kanban](.\Images\KanbanBoardStart.png)

## Core features

### User story 1

"As a player, I'd like to be able to create an account, so my progress can be saved"

done:

- [x] React registration form
- [x] Formik/yup validation
- [x] new user service (auth service front end)
- [x] /newuser route (auth service back end)
- [x] user data stored on mondobd
- [x] front end testing
- [x] back end testing

### User story 2

"As a player, I'd like to be able to log into my account, so I can access my progress"

#### User story 2.1

"As an admin, I'd like to use an Auth token in a http only cookie, to keep the players data safe and reduce security risks"

#### User story 2.2

"As an admin, I'd like all routes not to do with creating an account or logging into an account to require a http only authorisation token, to ensure only the logged in player can access that data"

#### User story 2.3

"As an admin, I want all passwords to be stored in hashed, and not as plain text on the database, to minimise potential risk."

done:

- [x] React login form
- [x] login service (auth service front end)
- [x] /login route (auth service back end)
- [x] front end testing
- [x] back end testing

### User story 3

"As a user, I'd like to be able to change my password, if my password has gotten compromised"

done:

- [x] React account management page (change password section)
- [x] change password service (auth service front end)
- [x] /changepassword route (auth service back end)
- [x] front end testing
- [x] back end testing

### User story 4

"As a player, I'd like to be able to delete my account, if I wish to be forgotten"

done:

- [x] React account management page (Delete account section) with appropriate confirmations
- [x] delete account service (front end)
- [x] /delete route (auth service backend)
- [x] front end testing
- [x] back end testing

### User story 5

"As an admin user, I'd like to be able to see all of the accounts that have been created"

done:

- [x] React Admin page
- [ ] Only accessible by someone with an admin account
- [x] get account data service (front end admin service)
- [x] account data route (back end)
- [x] only admin users can access this route
- [x] account data securely fetched from database
- [x] front end testing
- [x] back end testing

### User story 6

"As an Admin user, i'd like to be able to set a user to admin, so I can promote users"

done:

- [x] option on admin page to promote a user to admin
- [x] promote account service (front end admin service)
- [x] promote account route (back end admin service)
- [x] front end testing
- [x] back end testing

### User story 7

"As an Admin, I'd like to be able to delete accounts, so I can remove bad players from the game"

done:

- [x] option on admin page to delete user accounts
- [x] delete account service (front end admin service)
- [x] delete account route (back end admin service)
- [x] front end testing
- [x] back end testing

### User story 8

"As an Admin, i'd like to be able to change the password of an account, if a user has lost theirs"

done:

- [x] option on admin page to change a user's password
- [x] change password service (front end admin service)
- [x] change password route (back end admin service)
- [x] front end testing
- [x] back end testing
  
### User story 23

"As a user, I want to be able to log out of the program, removing my access token, so I can control who has access to my account"

- [x] add log out button to header
- [x] add logout route to front end service
- [x] add logout route to backend service
- [x] front end testing
- [x] back end testing

### User story 24

"As a user, I want to be able to navigate the site, so I can use it effectively"

- [x] add navigation system on a header

### User story 9

"As a player, I'd like to see the games screen laid out like the wireframe"

- [x] Game screen layout matches the provided wireframe
- [x] User interface is responsive
- [x] front end testing

### User story 10

"As a player, I'd like to be able to get my games up to date data"

done:

- [x] Front end service to request data
- [x] Front end updates on receipt of data
- [x] getdata route
- [x] sends the users data
- [x] front end testing
- [x] back end testing

### User story 11

"As a player, I would like for parts to be randomly generated, over time,  so that I can have components to upgrade my salvage platform with"

done:

- [x] works out how many parts should have been generated since the last check
- [x] randomly generates parts based on stats
- [x] back end testing

### User story 12

"As a Player, i'd like my parts generated to not exceed the capacity  of the parts storage, so I am encourage to log back in regularly."

done:

- [x] check what capacity is available before generating parts, and only generate parts up to that amount
- [x] back end testing

### User story 13

"As a player, i'd like to be able to see all of the parts I have in storage, so I know what I have."

done:

- [x] front end can display all parts
- [x] front end testing

### User story 14

"As a player, I would like to be able to equip a part into a slot, moving the part that was in that slot into my part storage"

done:

- [x] front end allows user to equip a part to a slot
- [x] front end service for equipping the part (front end user service)
- [x] equip part route (back end user service)
- [x] front end testing
- [x] back end testing

### user story 25

"As a player, i'd like the parts I have equipped to impact my resource generations, so that my choices in them matter"

- [x] back end code to adjust the numbers
- [x] back end testing
  
### User story 17

"As a player, I would like the parts I have slotted to have an impact on how quickly I can gather resources and parts"

done:

- [x] add logic to the back end, which uses the time since the last time the user got their data to calculate how much of the various resources they have gathered since then.
- [x] add interface components which report the numbers so the user is aware of the effectiveness of their gear choices
- [ ] front end testing
- [x] back end testing

### User story 18

"As a player, I would like to be able to scrap parts in my parts storage, so I have capacity for new parts"

done:

- [x] interface component to scrap a part
- [x] scrap part service (front end user service)
- [x] scrap route (back end user service)
- [x] logic to ensure part scrappable
- [x] front end testing
- [x] back end testing

### User story 15

"As a player, I want a part to only be able to go into a single slot, so I only need to compare one component"

done:

- [x] interface designed to allow parts to only go into the correct slot
- [x] back end logic to ensure parts can only be equipped in the right place
- [x] front end testing
- [x] back end testing

implementation choice, players don't choose which slot it goes into, a part's type determines that.

### User story 16

"As a player, I'd like to be able to see what parts I have in storage, which could be equipped into a slot, so i can manage it easier"

done:

- [x] Selecting a slot on the front end, displays all the parts which could be equipped
- [ ] front end testing

### User story 20

"As a player I would like a power management system, to control which parts of the salvage rig are active"

done:

- [x] add power management tools to the interface
- [x] power management service (front end user service)
- [x] power management route (back end user service)
- [x] logic to verify users choice is valid
- [ ] testing front end
- [x] testing back end  

### User story 19

"As a player, I would like to be able to upgrade my part storage, so I can have more parts in storage before having to scrap them"

done:

- [ ] add upgrades section of the interface
- [ ] upgrades service (front end user service)
- [ ] upgrade route (back end user service)
- [ ] logic to ensure user meets the requirements
- [ ] front end testing
- [ ] back end testing

### User story 21

"As a player, I would like to choose between the magnet which gathers quantities of raw resources, the claw which increases the quality of spare parts that are found, or the scoop which has a mix of both, so I can choose what best suits my needs"

done:

- [x] front end reflects the users power choices
- [x] back end logic ensure only powered components contribute to resource generation
- [x] testing front end
- [x] testing back end

### User story 22

"As a player, I would like to be able to upgrade the power management system, so I have more power to work with and allowing me to have more resources being gathered"

done:

- [ ] add upgrades options for the power generation system
- [ ] additional logic to the back end for the upgrades
- [ ] allow players to power more than one component at a time
- [ ] logic to verify user's choice is valid
- [ ] front end testing
- [ ] back end testing
