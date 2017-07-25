# QzQueryTools

[![Git Issues][issues-img]][issues-url]
[![Build][travis-img]][travis-url]

[![MIT license][license-img]][license-url]

QzQueryTools is a free, open source query and reporting tool. Used to facilitate frequently-used database queries with parameter as web-based UI and lightweight reporting. Can be used as mini-helpdesk or monitoring dashboard.

# Contents
1. [What this project is capable of](#description)
2. [Installation](#installation)
3. [Configuration](#configuration)

<a name="description"></a>
## What this project is capable of

QzQueryTools is developed to help organizing frequently-used queries to database. Some available use cases are:
- Getting the status of order, as well as it's components such as delivery and payment
- Getting row counts of every tables for debugging purpose
- Monitoring new opened helpdesk tickets in the last 24 h
- Generating sales report for last month

After configuration, this tools works in three (four) steps:
- Select the database connection
- Select the query to perform
- Fill the parameters if needed and perform query

Primarily designed for support, developer and QA. This tools can also be used by helpdesk to create simple monitoring / diagnosis interface even reports without much effort.

### Screenshots

<p align="center">
	<img alt="Query as table" width="70%" 
		src="https://user-images.githubusercontent.com/5449185/28112606-d6925762-6723-11e7-9931-8017b6369e3d.png"/>
</p>
<p align="center">
	<em>Selecting connection, choose query then fill the parameter is enough to invoke query.<em>
</p>


<p align="center">
	<img alt="Modify result layout" width="70%" 
		src="https://user-images.githubusercontent.com/5449185/28112603-d31648fa-6723-11e7-93d2-005a2e7d943f.png"/>
</p>
<p align="center">
	<em>The result layout can be modified using bootstrap's grid system, as well as displaying it in charts instead of table.<em>
</p>

<p align="center">
	<img alt="Show fullscreen and watch periodically" width="70%" 
		src="https://user-images.githubusercontent.com/5449185/28112585-bf6c7b26-6723-11e7-80e0-8d99b5b05683.gif"/>
</p>
<p align="center">
	<em>The watch module is useful to keep monitoring data. And it can directly be used fullscreen as monitoring dashboard<em>
</p>


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







[license-url]: https://github.com/fendy3002/QzQueryTools/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square

[issues-img]: https://img.shields.io/github/issues/fendy3002/QzQueryTools.svg?style=flat-square
[issues-url]: https://github.com/fendy3002/QzQueryTools/issues

[travis-img]: https://travis-ci.org/fendy3002/QzQueryTools.svg?branch=master
[travis-url]: https://travis-ci.org/fendy3002/QzQueryTools