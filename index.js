/*
    LambdaTest selenium automation sample example
    Configuration
    ----------
    username: Username can be found at automation dashboard
    accessToken:  AccessToken can be generated from automation dashboard or profile section

    Result
    -------
    Execute NodeJS Automation Tests on LambdaTest Distributed Selenium Grid 
*/

import * as dotenv from "dotenv";
import { Builder, By } from 'selenium-webdriver';
dotenv.config();

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME;

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY;
console.log("Key.....",USERNAME, KEY)

// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';

async function searchTextOnGoogle() {
    // Setup Input capabilities

    const capabilities = {
        "browserName": "Chrome",
        "browserVersion": "latest",
        "LT:Options": {
            // "platformName": "Windows 10",
            name: 'Test 1', // name of the test
            build: 'NodeJS build', // name of the build
            "project": "Untitled",
            "w3c": true,
            "plugin": "node_js-node_js"
        }
    };

    // URL: https://{username}:{accessToken}@beta-hub.lambdatest.com/wd/hub
    const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

    // Setup and build selenium driver object
    const driver = new Builder()
        .usingServer(gridUrl)
        .withCapabilities(capabilities)
        .build();

    try {
        // Navigate to a URL, click on the first and second list items and add a new one in the list.
        await driver.get('https://lambdatest.github.io/sample-todo-app/');
        await driver.findElement(By.name('li1')).click();
        console.log("Successfully clicked first list item.");
        await driver.findElement(By.name('li2')).click();
        console.log("Successfully clicked second list item.");
        await driver.findElement(By.name('li5')).click();
        console.log("Successfully clicked fifth list item.");

        await driver.findElement(By.id('sampletodotext')).sendKeys('Complete Lambdatest Tutorial\n');
        await driver.findElement(By.id('addbutton')).click();
        console.log("Successfully added a new task.");
        await driver.findElement(By.name('li6')).click();
        console.log("Successfully clicked sixth list item.");
    } catch (err) {
        console.log("test failed with reason " + err);
        await driver.executeScript('lambda-status=failed');
    } finally {
        await driver.quit();
    }
}

searchTextOnGoogle();
