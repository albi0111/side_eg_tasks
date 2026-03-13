# Coding Challenge

Thank you for accepting the invitation to complete our coding challenge. 

This assignment is intended to evaluate your proficiency in Angular, .NET REST APIs, and databases.

# Instructions

## Current state

We have an existing Bike Catalogue application where we can view pictures of different kinds of bikes and details like their manufacturer, model, and price.

* `BikeShop.UI`: This is the frontend application built with Angular 17. It displays the list of bikes and their details. There is a 'My Favourites' section where users can add their favourite bikes. Currently, the list of bikes is stored locally in a JSON file in the frontend application.
* `BikeShop.API`: This project contains a .NET 9 backend API template, which has not yet been implemented.

Make sure you have Internet access when building the solution so that Node and NuGet packages can be downloaded.

## Tasks

### 1. Implement API

We want the data to be returned from an API and database in the backend.

* Please develop a .NET API in C# that returns the list of bikes.
* Design the API endpoints following REST principles.
* Adapt the API to use any database you prefer (for simplicity, we recommend SQLite or SQL Server Express).
* Organise the backend using Domain-Driven Design principles and SOLID practices.
* Update the Angular service to retrieve the list of bikes from the API instead of the hardcoded JSON file.
* *Implementing unit tests is a plus.*

**Important:** Consider that this application may have many concurrent users and multiple developers working on it simultaneously. Take into account aspects such as logging, validation, error handling, performance, readability, modularity, and testability when designing your solution.

### 2. Bug Fix
A bug has been reported with the 'My Favourites' feature. Users can currently add the same bike to My Favourites multiple times, which should not be allowed.

* Please refactor the code and make sure this feature is working correctly.

### 3. New Features

Our product team has requested new features: a **'Create'** page for adding new bikes and a **'Details'** page for displaying detailed information for each bike.

* Please implement a new Angular page and a corresponding API endpoint in .NET to allow new bikes to be added.
* Please implement a new Angular page to display the details of an individual bike when the bike information card is clicked.
* *Implementing unit tests is a plus.*

Our designer is on holiday, so you must come up with the design yourself!

### 4. Bonus Points

Please include a `SOLUTION.md` file explaining:

* Any design decisions or assumptions made during the implementation.
* Improvements you would make with more time.

## Evaluation Criteria

We will evaluate:

* Code quality and readability
* API design
* Angular implementation
* Bug fixing approach
* Testing (optional but appreciated)
* Overall structure and maintainability

This challenge is designed to take approximately 2–4 hours. Please focus on writing clean and maintainable code rather than implementing every possible improvement. The goal is to demonstrate your approach to designing clean, maintainable software rather than delivering a production-ready system.

## Submission

* Please upload your solution to a Git repository (GitHub/GitLab/Bitbucket) and send the repository link to the recruiter.