# Amble APIs

## authRouter
 - POST /signup
 - POST /login
 - POST /logout
 
## profileRouter
 - GET /profile/view
 - PATCH /profile/edit
 - PATCH /profile/password   → like forgot password
 - DELETE /profile/delete

 ### → Status : ignored, interested, accepted, rejected

## requestRouter
 - POST /request/send/:status/:userId        " status → interested or ignored"
 - POST /request/review/:status/:requestId   " status → accepted or rejected"

## userRouter
 - GET /user/connections
 - GET /user/request/received
 - GET /user/feed  - feed API just show the all the users in the main page