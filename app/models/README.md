# CSE4050 Project5 Model Data

Since we don't have a backend database system to fetch model data from yet we stuff the model
data into the DOM so it will be accessible to the views. We add an object
property named 'cse4050models' to the DOM that contains the model data for the different views.

- 'cse4050models.taskModel()' - The model for the problem 1 - example view.

These models can be accessed from the React controller of the view under the window property.
For example:

    window.cse4050models.taskModel()

will access the task array so:

    window.cse4050models.taskModel()[0] === {"id":1, "type_id":1, "description":"Study javascript"}
