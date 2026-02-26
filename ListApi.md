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
 - POST /request/send/interested/:userId
 - POST /request/send/ignored/:userId
 - POST /request/review/accepted/:requestId
 - POST /request/review/rejected/:requestId

## userRouter
 - GET /user/connections
 - GET /user/request/received
 - GET /user/feed  - feed API just show the all the users in the main page