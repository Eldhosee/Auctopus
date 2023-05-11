# Project Documentation

## Introduction

This project is a Django-based web application for managing product details. It allows users to create, read, update, and delete product details. The application uses a REST API for accessing product details programmatically and uses the PostgreSQL database for storage.

## Installation

1. Clone the project repository from GitHub:

    `git clone https://github.com/Eldhosee/Auctopus.git`
    
2. Create a virtual environment and activate it:
    
    `python3 -m venv env`
    
    `source env/bin/activate`
    
3. Install the project dependencies:

    `pip install -r requirements.txt`
    
4. Perform initial database setup:

    `python manage.py migrate`
    
## Configuration


  The project uses environment variables for configuration. Set the following variables in your environment or in a .env file:
  
  `SECRET_KEY=<your-secret-key>`
  
  `DEBUG=True`
  
  `DATABASE_URL=<your-database-url>`
  
  `ENGINE= <your-database>`
  
` NAME= <name-of-database>`

`USER= <user-of-database>`

`PASSWORD= <password-of-database>`

`HOST= <host>`

`PORT=<port>`


## Usage

To run the development server, use the following command:

`python manage.py runserver`

## Models

The Product model represents a product.
  Fields:

    1.Name:store the name of the product
    2.description:store the description of the product
    3. price:store the proce of the product
    
## Testing

  used Postman to test the APIs
  
  ### Test demo link
  
  https://drive.google.com/file/d/1bmyA-nzO7PEkqbCOysqlw9V01HwOw-do/view?usp=sharing
  
  
## Technologies used:
 
    1.Frontend : HTML,CSS Bootstrap, Javascript
    2.Backend: Django
    3.Databse: PostgreSQL database
    
## Working Demo

   https://drive.google.com/file/d/18XjTCHXTZYuk0KOxU56lEygqSc6F_80L/view?usp=share_link

  
  
  
    


    


