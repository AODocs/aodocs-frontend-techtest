# AODocs front-end technical test

This project is about assessing front-end developer skills.
The test is putting into practice real-world development tasks encountered at AODocs.

## Getting Started

### Prerequisites

For this project you should have the latest Long Term Support version of [Node.js and npm](https://nodejs.org/en/) installed on your computer.
Don't hesitate to use `nvm` for a quick update.
Then you can clone this repository and navigate to its root folder.

You should also have a Google account, with some files (at least 25) stored in [Google Drive](http://drive.google.com/).
If you don't have a Google account, [creating one](https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&flowName=GlifWebSignIn&flowEntry=SignUp) is free.

### Installing

In the root folder, run
```
npm install
```
to install all the npm packages needed for the project.

Then run
```
npm run serve
```
to start the local server which will serve the project.
It should open a tab in you browser on http://localhost:3000/.

## Language and framework

You can use either the main.js or main.ts file depending on your familiarity with Typescript.
By default the main.js file is used. If you want to use Typescript, open the index.html file and comment the main.js / uncomment the main.ts file.

You can use all the packages you want for this test:
- You can use any framework (or none) to achieve the objectives, but simpler solutions are always preferred
- Some objectives are better and more quickly achieved using specialized libraries.

## Test Objectives

The applicant should try to complete the objectives below in the listed order.

* List the first 25 [Files](https://developers.google.com/drive/api/v3/reference/files) from Google Drive for the currently logged-in Google user.
* Display these Files as a list with the following information: Title / Modification Date (displayed as relative time) / Thumbnail.<sup>[1](#myfootnote1)</sup>
* It should be possible to open a File in new tab by clicking on its thumbnail.
* It should be possible to select one or more Files in the list.
* Add an option to star/unstar the selected Files.
* Add pagination to display the next/previous page of Files.
* Bonus: Add a way to download the selected files as a ZIP archive.

<a name="myfootnote1">1</a>: You will need to use the [fields query parameter](https://developers.google.com/drive/api/v3/performance#partial-response) to retrieve the Modification date and the Thumbnail url.

## Useful link

* Link to Drive API: https://developers.google.com/drive/api/v3/reference/

## Notes

- Don't hesitate to split the commits in small, easy to read items
- Everything is important, including code style (indentation) and consistency
- Comments are really welcome!


