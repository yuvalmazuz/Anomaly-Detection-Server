# Overall view of the application and it's usage
Our application is an anomaly detection web app.
The user has to select two types of CSV files: one CSV file for learning and the other for anomalies and upload them.
We will mention that if the user selects unsuitable files the app will not upload these files.
In the next step, the user must choose an algorithm from the two: hybrid algorithm or linear algorithm.
In the last step the user will click on the upload button and we see in our web page the anomalies and in which line it happened.

**App content:**
We organized the application with the design pattern of MVC.
model- responsible for parsing the csv files data we got from the user, learn them and write the anomalies
view- Responsible for the entire display to the screen.
controller- responsible to connect between the model and the view. 


**Required installations for the project:**

* Download node.js version 16.0.0
* Install all the modules we need for running the server by typing the command "npm install" in the terminal.


**Installations instructions and initial run of the app:**

* Download the node.js version 16.0.0, after downloading, make sure that you have two CSV files: one  for learning and the second for anomalies.
* As mentioned before, install all the modules we need for running the server by typing the command "npm install" in the terminal.
* Connect to the server by typing "node app.js" command in the terminal.
* Connect to port 8080 on a web page. for example, using a google chrome browser, navigate to localhost:8080.
* After these steps, you should see the web application on your browser.
* Choose which algorithm you want to detect anomalies with.
* Choose two valid CSV files and click on upload. Afterwards, you'll be able to see the anomalies and each anomaly's properties on your screen.


Documentation files are located in a folder named **docs**<br>
Authors: Yuval Mazuz, Liran Bashari, Mika Tal, Doriel Fay.


Link to demo video [here](https://www.youtube.com/watch?v=T5MBmB8MVuo)

