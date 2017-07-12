/*<head>{
	description: "Get employees in department",
	params: {
		"name" : "varchar"
	},
	availableTo: ["mysql"]
}</head>*/

-- <1:Employees>
select a.*, c.dept_no, c.dept_name
from employees.employees a
	inner join employees.dept_emp b
		on b.emp_no = a.emp_no
	inner join employees.departments c
		on c.dept_no = b.dept_no
where c.dept_name like concat('%', @name, '%')
order by a.hire_date desc
limit 20;