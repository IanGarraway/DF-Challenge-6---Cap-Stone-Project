# Challenge 6 - Full-Stack Capstone Project

```ascii
  ..,.oooE777999V(;
                                  ...oooP779090(;''       ''''  I
                    ...ooB777979V;;''       .....=v}}=}=}=}}v==  5
               97?(;''     .........< .    . .:.:.:.:.`:;``;;;;;;;;<;;;<;<<<<<<<<<<
                 b ;           . : .:.:.:.`;;;;;;;;;;;<;;<;<<<<<<<<, I
                 `,`               . : :.:.:.:.`.`;;;;;;;;;;;;<;<;<<. 5
                  b ;                    . : .:.:.:.`;;;;;;;;;;;<;<;<: E
                  `,<                         . . .:.:.:.``;;;;;;;;;;. I
                   b :                             . . :.:.:.:.:.:.;;;. 5
                   `>;                                  . .:..:.:.:.`.:  |
                    b :                                      . . :.:.:.x T
                    `,;                                          . . .::  E
                     b :                                               _  !4
                     `r :                                   __.__,--,;'))))).
                      b :                         ___...--'; `))))))))' '' `>!9eOc
                      `r :              __,--:-;;;)))))))))))'' '' ' ' _. -'-'.`!9Eg.
                       L : . __.--_--:,)))))))))))'' ' '  _. ._.-'-'-'-'\-'\---\/\ ``Qu.
                       `,: !x;:)))))))) ')'' ' _ _._-.'\'\_\_-'\''-\'_'\-'\'\ -_\'-\-. 95n.
                        D` ))))'''  _ .___.-_:/-/\/-_\ /-_, /-,\ \-/_\/\,-\_/-\/-/--' ..v<]9o.
                      __b :<> -_\._/\,- ,_ -\ _/\-\ _-\ -_/-\,\/,-/\_/-_\'\--' .vvvvvvv}v}}x}]NEo.
                .ooPO%LOCu  `< `/\_ -:\/_/-/,\/,/-,/_,-/\ :_\:_-:__-'' ...vvvvvvvvvvvvxx}vx}}}}==No
              .oPO'       `y. `< ~-\ _\/\_,- \ , - ,___..--' .......>>vvvvvvvvx>vvvvvvvvvv)v~~~`         iuuuaE'
  .@tTL'                        `y,  `< .-vvv<<<<<<<<vvvvv=>~~~~`         _uuua'''
.&P'                              `L,  `>>><<<<><>v~>^` `        _uuug'
                                      `L,  ~~`          _uuua''
                                        `L,:    _uuua''
                                          `LaE''
```

## Introduction

The Full-Stack Capstone Project is in 2 parts.  First you must submit a proposal for your project idea.  Once your proposal is approved, you will build your project, submit the code and present your project to an audience on the final day of the Academy.  The context of the project is for you to decide and the ultimate scope of it is also up to you.  However, there are some requirements that your proposal and project must meet to be approved and to pass this final assessment.

## Non-negotiable Requirements

The following requirements must be met by your full-stack application and your proposal should clearly demonstrate how the project will meet them:

1) **N-Tier Architecture:** Your application must have a clear separation of concerns between the client, server and database.  This means that you should have a client-side application that communicates with a server-side application that communicates with a database.  You may choose to implement a Microservice Architecture if your application requires more that one server-side application.
2) **RESTful API:** Your server-side application must expose a *RESTful API* that the client-side application can consume.  This should be made in the *Model-Controller-Service* pattern.  This should be a ***Node.js/Express*** application.  You may also use your services to proxy other third-party APIs if you wish.
3) **Database:** Your server-side application must have a database that it communicates with.  You may choose to use a SQL or NoSQL database and appropriate packages that allow you to interact with the database.  ***MongoDB*** is the recommended database for this project but using an ***SQL*** database is also acceptable.
4) **CRUD Operations:** Your server-side application must implement CRUD operations.  This means that you must be able to Create, Read, Update and Delete data from the database.
5) **Client-Side Application:** Your client-side application must be a *Single Page Application* (SPA) that consumes the *RESTful API* exposed by the server-side application.  You must use ***React*** and build your own components, however, the use of *third-party libraries* IS allowed.  You can make third-party API calls from your client-side application if you wish but you must meet the CRUD requirements of the RESTful API.
6) **User Interface:** Your client-side application must have a user interface that is easy to use and navigate.  You can use a CSS framework to style your application and make it responsive, *Bootstrap* or *Tailwind* are the recommended libraries for this.
7) **Authentication:** Your application must have a way for users to sign up, log in and log out.  You must also have a way to verify that a user is logged in and only allow them to access certain parts of your application if they are logged in.
8) **Authorization:** Your application must have a way to restrict access to certain parts of your application to only certain users.  This means that you must have at least 2 roles in your application and restrict access to certain parts of your application based on the role of the user.
9) **Testing:** Your application must have tests for the server-side and client-side applications.  You must have at least **80% test coverage** for both the server-side and client-side applications through unit and integration tests, done where possible using TDD.  Coverage reports should be obtainable through a command in your `package.json` file.
10) **Deployment:** Your application must be deployed to a cloud service.  You may choose to deploy your client-side and server-side applications to the same cloud service or to different cloud services.  You must provide a link to your deployed application in your proposal.
11) **Documentation:** You should produce documentation for your project that covers the design of the application, how to set up the application, how to run the tests and how to deploy the application.  This should include a link to some form of Kanban/Scrum-type board that shows the progress of your project, a review/retro of the project and future development plans.

---

## Part 1: Proposal

### Proposal Requirements

Your proposal should be a markdown file called `proposal` that is added to the `documentation/proposal` folder in this repository.  It should include the following sections:

1) **Title:** The title of your project.
2) **Description:** A brief description of your project (the **WHAT!**)
3) **Context:** The context of your project.  This should include the problem that your project is solving (the **WHY!**) and the intended users of your project (the **WHO!**).
4) **Features**: A list of features that your project will have (the **HOW!**).  This should include the CRUD operations that your project will implement.
5) **User Interface**: A description of the user interface of your project.  This should include a wireframe of your project.
6) **Architecture**: A description of the architecture of your project.  This should include a diagram of the architecture of your project.
7) **RESTful Routing**: A list of the RESTful routes that your project will have, including the HTTP method, any headers and payloads expected in the request and the response that will be sent.
8) **Technologies**: A list of the technologies that you will use in your project, including external dependencies and testing tools.
9) **Deployment**: A description of how you will deploy your project, including the cloud service(s) that you will use and any environment variables needed.

### Proposal Submission

Your proposal should be submitted as a pull request to the repository titled `[Your Initials]-Proposal: [Your Project Title]`.  In addition to this, you should submit a link to the pull request in Noodle.  You must not start work on the actual code for your project until your proposal has been approved by your trainer. This will be done through a short 1-2-1 with your trainer where you will discuss your proposal and answer any questions that they may have.

---

## Part 2: Application

### Application Requirements

You should produce the application as per the proposal you have made, sticking to the agreed scope.  However, it may become apparent during the development of the application that the actual features of the application may need to be adjusted.  THIS IS FINE!  Your project needs to stay within the scope of technology and outlined requirements, but as long as you document the changes that you have made and, more importantly, WHY you have made them, then this is acceptable.  For example, if you find that you need a different service or route within a service to increase the scalability or readability of your code, then plan out the changes by producing the relevant routing diagrams, domain models and test plan and implement them.  Similarly, for any User Interface changes, produce the wireframes and update the component hierarchy and state diagrams.

Your application should be housed in this Mono-repo - you can deploy specific folders to different cloud services through appropriate configuration.  The User Interface should be a single React application in its own folder, any services should be created in their own folders.  Remember that the deployment service used should be ***free*** and should be able to accept sensitive information such as *API keys* and database URI and user information.

### Application Submission

Your application should be submitted as a pull request to the repository titled `[Your Initials]-Application: [Your Project Title]`.  In addition to this, you should submit a link to the pull request in Noodle.  You should also provide a link to your deployed application in the Noodle submission.  You must also provide a link to your documentation in the pull request.

---

## Assessment

Unlike the previous challenges, you will present your project for assessment in the final days of the Academy.  During this you will be expected to run a "Sprint Review" where you will demonstrate the project working in the cloud.  You will also be expected to run a "Sprint Retrospective" where you will discuss what went well, what didn't go well and what you would do differently next time.  You should demonstrate the testing of your application and show the coverage reports.  To conclude your presentation you should discuss the future development of the project and how you would improve it given more time.  

You will be given 10 minutes for your presentation, with a 5 minute buffer for questions from your trainer, other stakeholders and your peers.  You will be assessed on the following criteria:

1) **Proposal:** Did you meet the requirements of the proposal?  Did you stick to the agreed scope of the project?
2) **Architecture:** Did you implement a clear separation of concerns between the client, server and database?  Did you use the Model-Controller-Service pattern for your server-side application?
3) **RESTful API:** Did you expose a RESTful API that the client-side application could consume?  Did you implement CRUD operations?
4) **Client-Side Application:** Did you build a Single Page Application that consumed the RESTful API?  Did you use React and build your own components?
5) **User Interface:** Did you build a user interface that was easy to use and navigate?  Did you use a CSS framework to style your application?
6) **Authentication:** Did you have a way for users to sign up, log in and log out?  Did you have a way to verify that a user was logged in?
7) **Authorization:** Did you have a way to restrict access to certain parts of your application to only certain users?  Did you have at least 2 roles in your application?
8) **Testing:** Did you have tests for the server-side and client-side applications?  Did you have at least 80% test coverage for both the server-side and client-side applications?
9) **Deployment:** Did you deploy your application to a cloud service?  Did you provide a link to your deployed application in your proposal?
10) **Documentation:** Did you produce documentation for your project that covered the design of the application, how to set up the application, how to run the tests and how to deploy the application?
11) **Presentation:** Did you run a "Sprint Review" and "Sprint Retrospective" during your presentation?  Did you discuss the future development of the project?
12) **Code Quality:** Did you write clean, readable and maintainable code?  Did you follow the best practices of the technologies you used?
13) **Communication:** Did you communicate effectively with your trainer and other stakeholders?  Did you ask for help when you needed it?
14) **Problem Solving:** Did you solve problems effectively and efficiently?  Did you use the resources available to you to solve problems?
15) **Time Management:** Did you manage your time effectively?  Did you deliver the project on time and to the agreed scope?
16) **Scope Management:** Did you manage the scope of the project effectively?  Did you make changes to the project that were necessary and documented them effectively?

These assessment points are broadly in-line with the Digital Futures Progression Management Frameworks used in previous challenges.

---
