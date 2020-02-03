# Developer-Profile-Generator
(https://remyguts.github.io/Developer-Profile-Generator/)

Command-line application that dynamically generates a PDF profile from a GitHub username

## Purpose / User Story

AS A product manager

I WANT a developer profile generator

SO THAT I can easily prepare reports for stakeholders


# Functionality

When using the terminal, the user is prompted to enter their Github profile name, and favorite color. it then uses a Github API to generate user information ont a PDF file using an HTML template, as well as a functional website.  
### Content Flow

![Adventure (1)](https://user-images.githubusercontent.com/56744605/72667729-e5880200-39d3-11ea-8d2e-cd7bac57257b.png)

### Backend Functionality

![alt text](newassets/AdventureFunctionality.png "Functionality back end")

## User Interface

On Load you are prompted to create a Username and Password

![alt text](newassets/LaunchModalUsername.png "Create a Username and password")

Once you create you username and password you can see if you are logged in if you see your name in the top right corner

![alt text](newassets/UsernameDisplay.png "You are logged in")

After you login start your search using the search fields on the left

![alt text](newassets/SearchField.png "Start Search")

This will return results and they will show in the cards below on the left, allowing you to add them to a list in your adventure book on the right.

![alt text](newassets/AppendToAdventureBook.png "Search Results")

Once you created your list you can save everything to your adventure book under your account to view later

![alt text](newassets/AdventureBookComplete.png "Save to your Adventure Book")

## APIs

- Skyscanner
- TripAdvisor

## Styles

- CSS Bootstrap
- Font Awesome

## Project GitHub Participants

Remy Guts @remyguts
Kaitlyn Carlson @KaitlynCarlson
Marie Lenac @malicemarie
