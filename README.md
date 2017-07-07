# QzQueryTools

A mini application to facilitate frequently-used database queries with parameter as web-based UI. Can be used as mini-helpdesk.

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

## Example query

This app includes two query scripts that can be used as example. Both script are `get_employees_by_name.sql` and `get_employees_in_department.sql`, located inside `storage/config/queries/employees` folder.

The example use `employees` example database from MySql [https://github.com/datacharmer/test_db](https://github.com/datacharmer/test_db).