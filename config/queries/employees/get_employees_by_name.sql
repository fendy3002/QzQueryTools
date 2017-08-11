<head>{
	description: "Get employees by name",
	params: {
		"name" : "varchar",
		"first_name" : "varchar",
		"last_name" : "varchar"
	},
	availableTo: ["mysql"]
}</head>

<Q i="1" label="Employees">
select *
from employees.employees a
where (a.first_name like concat('%', @name, '%')
	or a.last_name like concat('%', @name, '%') or @name is null)
	and (a.first_name like concat('%', @first_name, '%') or @first_name is null)
	and (a.last_name like concat('%', @last_name, '%') or @last_name is null)
limit 20;
</Q>

<Q i="2" label="Department">
select a.emp_no, a.first_name, a.last_name, c.dept_no, c.dept_name
from employees.employees a
	inner join employees.dept_emp b
		on b.emp_no = a.emp_no
	inner join employees.departments c
		on c.dept_no = b.dept_no
where (a.first_name like concat('%', @name, '%')
	or a.last_name like concat('%', @name, '%') or @name is null)
	and (a.first_name like concat('%', @first_name, '%') or @first_name is null)
	and (a.last_name like concat('%', @last_name, '%') or @last_name is null)
limit 20;
</Q>