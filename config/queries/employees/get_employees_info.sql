/*<head>{
	description: "Testing sql query layout",
	params: {
	},
	layout: [{
		"row": [
			{"col-6": [
				{"rowc":
					{"summary": 
						{
							"script": 1,
							"fields": {
								"Active": "bool"
							}
						}
					}
				},
				{"rowc": 
					{"bar": 
						{
							"label": "# By Departments",
							"x": "Dept.",
							"y": "",
							"script": 2
						}
					}
				}
			]},
			{"col-6": [
				{"rowc": 
					{"bar": 
						{
							"label": "# By Age",
							"x": "Age",
							"y": "",
							"script": 3
						}
					}
				},
				{"rowc": 
					{"bar": 
						{
							"label": "# By Title",
							"x": "Title",
							"y": "",
							"script": 4
						}
					}
				}
			]}
		]
	}],
	availableTo: ["mysql"]
}</head>*/

-- <1:Summary>
SELECT 'No. of employees' as `label`, CAST(count(*) AS CHAR(20)) as `value`
FROM employees.employees UNION ALL
SELECT 'Oldest employee', min(birth_date) as `value`
FROM employees.employees UNION ALL
SELECT 'Youngest employee', max(birth_date) as `value`
FROM employees.employees UNION ALL
SELECT 'Latest hire', max(hire_date) as `value`
FROM employees.employees UNION ALL
SELECT 'No. of Male employee', count(*) as `value`
FROM employees.employees
WHERE gender = 'M' UNION ALL
SELECT 'No. of Female employee', count(*) as `value`
FROM employees.employees
WHERE gender = 'F';

-- <2:By Departments>
SELECT a.dept_name as `label`, count(*) as `value`
FROM employees.departments a
	INNER JOIN employees.dept_emp b
		ON a.dept_no = b.dept_no
WHERE b.to_date = '9999-01-01'
GROUP BY a.dept_no;

-- <3:By Age>
SELECT TIMESTAMPDIFF(YEAR,  a.birth_date, NOW()) as `label`, count(*) as `value`
FROM employees.employees a
GROUP BY TIMESTAMPDIFF(YEAR,  a.birth_date, NOW());

-- <4:By Title>
SELECT a.title as `label`, count(*) as `value`
FROM employees.titles a
WHERE a.to_date = '9999-01-01'
GROUP BY a.title;