# Product-Info-App

About this Application -

It is having 2 Tabs in the index.html.

1) HOME - which is having a serch text box showing auto suggestion for the different products.Once a product is getting selected its detail information will come just below to that text box.The details include Product Id , Product Name, Quantity,Cost Price , Selling Price.Out of all these feilds only 2 fields are ediatble - Produtc Name and Selling Price.You can update these 2 fields by changing the text and then press enter,it will get updated in the database. Validations - i) Selling Price must be greater than or equal Cost Price. ii) Product Name cannot be blank.

2)EDIT - which is having a form which will add new product in the database.After filling all the data and press Enter or select "Add" button to add that product in the database. Validations -i) All the fields are required. ii) Selling Price must be greater than or equal Cost Price.

I have used following things to mak this happen.

1) Mongo DB for the database.

2) Node js , epress js for the server.

3) Bootstrap , Angular js for the front end.

Files informations -

1) index.html - It is a main page having 2 views in 2 different tabs

2) home.html - It is a separate view for the HOME tab.

3) edit.html - It is a separate view for the EDIT tab.

4) main.js - External javascript page having module,controllers,validations etc.

5) server.js - External javascript file which will take the request and send response back to browser.

Directory Structure -

1) Public -

a) edit.html

b) home.html

c) index.html

d) JS -

    i) main.js

2) server.js 
