# MusalaSoft-Project - ToDo web application

<!-- TABLE OF CONTENTS -->
## Contents
1. [About The Project](#about-the-project)
   - [Introduction](#introduction)
   - [Technologies used](#technologies-used)
   - [Features](#features)
   - [Built With](#built-with)
2. [Installation](#installation)
3. [Starting the app](#starting-the-app)
3. [Contact](#contact)




<!-- ABOUT THE PROJECT -->
## About The Project

[![Project Screen Shot]]

### Introduction
The To-Do Web Application is a full-stack project using React.js for the frontend and Java with Spring Boot and MySQL for the backend. It allows users to create, read, update, and delete (CRUD operations) their to-do tasks.

### Technologies used
1.	Frontend: The frontend of the application is built with React.js, a JavaScript library for building user interfaces. It makes use of the React Router library for routing and Axios for making HTTP requests to the backend.
2.	Backend: The backend of the application is built with Spring Boot, a Java-based framework for creating stand-alone, production-grade Spring based Applications.
3.	Database: The application uses a relational database for persisting data. Hibernate, an object-relational mapping (ORM) tool for the Java programming language, is used for mapping an object-oriented domain model to a relational database.
4.	Testing: Unit tests are written with JUnit and Mockito. Integration tests are done with the help of Spring Boot Test.

### Features

Authentication:
 - New users can create an account by providing their details including email, username, and password.
 - Existing users can log in using their username and password.

Task Management:
 - Create Task: Users can create a new task with a title and a description.
 - Read Task: Users can view their existing tasks.
 - Update Task: Users can update the details of their tasks.
 - Delete Task: Users can delete their tasks.


#### Built with
[![Java][Java.com]][Java-url]
[![Spring Boot][Spring.io]][Spring-Boot-url]
[![MySQL][MySQL.com]][MySQL-url]
[![React][React.js]][React-url]
<!-- [![Bootstrap][Bootstrap.com]][Bootstrap-url] -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Installation -->
## Installation

1. You need to have installed a MySQL server 5.7 and configure the port to 3306. https://dev.mysql.com/downloads/windows/installer/5.7.html

2. You need to install java JDK 17 - https://www.oracle.com/java/technologies/downloads/#jdk17-windows

3. You need to install Maven from the official Apache Maven website - https://maven.apache.org/download.cgi

4. You need to install NodeJS versions above 19 from the official website - https://nodejs.org/en

5. Now you can clone the repo
   ```sh
   git clone https://github.com/kristiyanstoykov/MusalaSoft-Project.git
   ```
6. Navigate to the to-do-list-backend folder and install the mvn packages with the command in the command prompt
   ```sh
   mvn clean install
   ```
7. Navigate to the to-do-list-frontend folder and install the npm packages with the command in the command prompt.
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Installation -->
## Starting the app

1. You have to start MySQL server

2. Then to start the backend navigate to the folder to-do-list-backend and run the command in the command prompt
   ```sh
   mvn spring-boot:run
   ```

3. Start the frontend - navigate to the folder to-do-list-frontend and run the command in the command prompt
   ```sh
   npm start
   ```
   Your browser should open automatically with the app

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact
Project Link: https://github.com/kristiyanstoykov/MusalaSoft-Project

David - david.nikiforov@abv.bg

Marko - marko.pejcic12321@gmail.com

Kristiyan - krisistoikov@gmail.com

Stanislav - stanislav2177@gmail.com

Stoyan - stoianstoikov@gmail.com

Zaro Nikiforov - znikiforov33@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[Java.com]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white
[Java-url]: https://www.java.com/
[Spring-Boot-url]: https://spring.io/projects/spring-boot
[Spring.io]: https://img.shields.io/badge/Spring-6db33f?style=for-the-badge&logo=spring&logoColor=white
[MySQL.com]: https://img.shields.io/badge/MySQL-ffffff?style=for-the-badge&logo=mysql&logoColor=black
[MySQL-url]: https://www.mysql.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com