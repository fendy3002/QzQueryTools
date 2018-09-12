# Server Library Specification
## Usage

    const qzQuery = require('@fendy3002/query-tools');
    const fs = require('fs');
    const sequelize = require('sequelize');
    const db = new sequelize(/* database connection here */);

    const queryConfig = fs.readFileSync("getEmployee.xml", "utf8");
    const renderConfig = fs.readFileSync("getEmployee.html", "utf8");
    new Promise(qzQuery.server(db)(queryConfig, renderConfig))
    .then(({ data, template }) => {

    });

## Parameters

* queryConfig: string. Query configuration
* renderConfig: string. Template render configuration

## Return
### data

### template