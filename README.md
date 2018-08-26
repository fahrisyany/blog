# blog

# BLOG Trafalgar

List of routes user:

| **Route** | **HTTP** | **Description**   | **Parameters**            |
| --------- | -------- | ----------------- | ------------------------- |
| /register | POST     | register new user | username, email, password |
| /login    | POST     | login user        | email, password           |

List of routes about Articles and Comments:

| **Route**                       | **HTTP** | **Description**                                    | **Parameters**                       |
| ------------------------------- | -------- | -------------------------------------------------- | ------------------------------------ |
| /users/showArticle              | GET      | Get all Articles                                   |                                      |
| /users/getComment/:articleId    | GET      | Get all Comments                                   | articleId                            |
| /users/showOneArticle/:id       | GET      | GET specified Article                              | article id                           |
| /users/showOwnArticle           | GET      | GET own Article                                    |                                      |
| /users/createArticle            | POST     | POST own Article(authenticated user only)          | articleTitle, articleBody,articleTag |
| /users/createComment/:articleId | POST     | POST Comment (authenticated user only)             | commentBody,articleId                |
| /users/editArticle/:id          | PUT      | Edit Specified Article (authenticated user only)   | articleTitle, articleBody            |
| /users/deleteArticle/:id        | DELETE   | DELETE Specified Article (authenticated user only) | article id                           |
| /users/deleteComment/:id        | DELETE   | DELETE Specified Comment (authenticated user only) | comment id                           |

| **Server**  | **Database**  |
| ----------- | ------------- |
| $ npm start | mLab          |
| $ npm test  | local mongoDB |

| **Client**      | **Location** |
| --------------- | ------------ |
| $ npm run serve | Local        |

| **TDD**    | **Location**  |
| ---------- | ------------- |
| $ npm test | local mongoDB |
| $ cd blog/server | Local |
| $ mocha | Local |
