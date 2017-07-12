# QzQueryTools

A mini application to facilitate frequently-used database queries with parameter as web-based UI. Can be used as mini-helpdesk.

## Contents
1. [Installation](#installation)
2. [Screenshots](#screenshots)
2. [Configuration](#configuration)

<a name="installation"></a>
## Installation

You will need to have [node js](https://nodejs.org/) installed. And currently the system can only handle MySql queries, so you will need it too. 

Execute the following script:

```
git clone https://github.com/fendy3002/QzQueryTools.git QzQueryTools;

cd QzQueryTools;

npm install;

node exec.js prepare;

npm start;
```

<a name="screenshots"></a>
## Screenshots
<img alt="Query as table" width="100%" 
	src="https://user-images.githubusercontent.com/5449185/28112606-d6925762-6723-11e7-9931-8017b6369e3d.png"/>

<img alt="Modify result layout" width="100%" 
	src="https://user-images.githubusercontent.com/5449185/28112603-d31648fa-6723-11e7-93d2-005a2e7d943f.png"/>

<img alt="Show fullscreen and watch periodically" width="100%" 
	src="https://user-images.githubusercontent.com/5449185/28112585-bf6c7b26-6723-11e7-80e0-8d99b5b05683.gif"/>


<a name="configuration"></a>
## Configuration

Connection config is located at `server/storage/config/connections.js`. It is composed with list of database connections. Please note that connection name need to be unique.

### Queries

Queries is located at folder `server/storage/config/queries`. The query need to have a head section with the following format:

```
/*<head>{
	description: "Select list of employees",
	params: {
		"name" : "varchar",
		"id" : "int",
		"list" : "%"
	},
	availableTo: ["mysql"]
}</head>*/
```

* description: Describe what this query is about.
* params: Key value parameters that will be used in query. 
* availableTo: array of strings. Currently limited to mysql.

And sql query like:

```
-- <1:employee by name>
SELECT *
FROM employee 
WHERE name = @name;

-- <2:employee by id>
SELECT *
FROM employee 
WHERE id = @id;
```

The parameter `name` defined in head will be used in query as `@name`. The line `-- <2:employee by id>` will be used as query label.

### Example query

This app includes two query scripts that can be used as example. Both script are `get_employees_by_name.sql` and `get_employees_in_department.sql`, located inside `storage/config/queries/employees` folder.

The example use `employees` example database from MySql [https://github.com/datacharmer/test_db](https://github.com/datacharmer/test_db).