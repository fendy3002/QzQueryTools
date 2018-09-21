# Query Configuration Specification
## Extension: `.xml`
## Format

Single xml file can hold many sql queries. Each sql query are being wrapped by `<Q></Q>` tag. Use `<![CDATA[  ]]>` tag in body to avoid `>` or `<` symbol being interpreted as markup character. Example:
```xml
    <Q i="1" label="Employees">
    <![CDATA[
        select *
        from employees.employees a
        where (a.first_name like concat('%', @name, '%')
            or a.last_name like concat('%', @name, '%') or @name is null)
            and (a.first_name like concat('%', @first_name, '%') or @first_name is null)
            and (a.last_name like concat('%', @last_name, '%') or @last_name is null)
        limit 20;
    ]]>
    </Q>
```

Each query enclosed by `<Q></Q>` tag need to return 1 result set. If multiple result set returned, the one which will be used will be the last one, or which index being mentioned at `set` attribute (see below).

### `<Q>` tag attributes

* `i`: integer. one-based index or id of query. Will be used later at templating
* `label`: string. label to show at templating
* `set`: integer. zero-based index. Decide which result sets will be used. Do not set (or set to empty string) if only one result set is returned from query.