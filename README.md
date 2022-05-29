# Find a GitHub Users Favourite Language
<img width="527" alt="favourite language display" src="https://user-images.githubusercontent.com/93338557/170873889-c2ef3197-8812-422c-b263-2bf2bc8536cd.png">

## Client Specification

- We would like you to build an application that allows users to enter an arbitrary Github username and be presented with a best guess of the Github user's favourite programming language.
- You may use any programming language, framework, or library.

## Setup

Copy the following code into your terminal and hit enter

```
git clone https://github.com/clovellbsc/github-users-favourite-language.git
```

Change directory into the project by copying the following code into your terminal and hitting enter

```
cd github-users-favourite-language
```

## Ensuring Dependencies Are Installed

If you do not have node installed on your device you can go to the [NPM documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm "NPM documentation")

If/once you have node installed on your device copy the following code into your terminal and hit enter

```
npm install
```

## Running The Application

Once you are ready to use the application type the following and hit enter
```
npm start
```

This should open the application in your browser at which point, you can select the textbox and type in the username of the github user that you wish to search. Once you click submit or hit enter you should see something like the following:

https://user-images.githubusercontent.com/93338557/170872850-ad0ddd42-2419-4494-bf7a-54734480d5e0.mp4

## Running Tests

This project has been tested with the React testing library and Jest. To run the tests you can copy the following into your terminal and hit enter:
```
npm test
```

when this has loaded it will provide you with the following options:

<img width="287" alt="react test" src="https://user-images.githubusercontent.com/93338557/170873311-777a5410-0459-4af2-9704-0cf3ddc2afdd.png">

To run all the tests type:
```
a
```

This will run all the tests and produce a result like this: 

<img width="548" alt="all tests passing" src="https://user-images.githubusercontent.com/93338557/170873442-a8cb397c-e56a-497b-82aa-4fb9d4e6f7c5.png">

## Technologies Used

- JavaScript - chosen programming language
- Git - version control
- React - front-end JavaScript library
- Jest - unit and feature testing, including coverage
- React Testing Library - library for testing React applications, which focuses on testing components from the end-user's experience
- Axios - a promise-based HTTP Client
- ESLint - linting

## My Approach

I approached this task, firstly by planning. This was to ensure I understood what the client wanted as their output and to ensure that I went about it in a measured way.

I decided to use React for this task. The reason behind this is that by utilising a React App, it made the project simple for the client to use without needing a more in depth technical knowledge. All they have to do is download the repository and once inside the repository they can type ```npm start``` and be faced with a simple to use and intuitive User Interface. 

With the client's specification of "We would like you to build an application that allows users to enter an arbitrary Github username and be presented with a best guess of the Github user's favourite programming language." there was no solid direction on how the client wanted me to decide on the user's favourite language. I started with looking into the Github API (Application Programming Interface). Once I had looked into the API, I looked at the endpoints available, which did not include a way to directly access a user's favourite language, however, there was an endpoint for finding a list of a user's repositories. Having looked into this, I saw that as part of the data returned from a repository, there was a language returned, which is the most used language of a repository. After identifying this, I believed that the best solution for identifying the user's favourite language would be to look at their repositories and iterate over them and find the most used language.

Once I had decided how I want use the github API, I looked more at how the data would be returned from this endpoint. I noticed that by default the data would be returned with just repositories that the user is the owner of, which I believed would be most appropriate as the user is most likely to make repositories in their favourite language. Next I looked and found that the repositories were sorted by name, which I did not think was most appropriate, due to the fact that this end point has a maximum of 100 repositories returned and should the user have begun doing a lot of Python but now their favourite language is Java then this might not be represented if the data is sorted by name. I looked into sending the Github API a query for sorting by updated to get the most recent repositories. I then saw that although the maximum number of repositories worked on is 100, the default is 30. Although this can be changed, I thought that 30 of the user's most recent repositories would be sufficient for this.

When making the application, I decided that there should be a heading to explain to the user what the app is for. I then decided the easiest way for the user to search would be with a text field for the username and a submit button when they are happy with their choice. I decided to add headings for the user's favourite language, this came out of the idea of catching edge cases. If the user had no repositories, there would be nothing to convey to the user that there is no language data. I then tested the edge case of if I typed a user that didn't exist, so in order to convey that the user does not exist, I implemented the language header to display this on a 404 error.

Another edge case, that I went back and forth on was from the client's specification, how they would wish for me to handle the possibility of multiple languages being favoured equally by the github user. At first I implemented a single language return no matter the number of equally used languages, however, if the client wanted to know the favourite language, I believed that for an accurate picture of the user's languages that it was best to provide all equally favoured languages. 
