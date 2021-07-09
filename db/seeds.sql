INSERT INTO department (name)
VALUES 
  ('Sales'),
  ('Operations'),
  ('Customer Service'),
  ('Finance'),
  ('IT');

INSERT INTO roles (title, salary, department_id)
VALUES  
  ('Manager', 170000, 5),
  ('Manager', 110000, 3),
  ('Manager', 120000, 2),
  ('Manager', 110000, 1),
  ('Sales Rep', 50000, 3),
  ('Full Stack Developer', 80000, 4),
  ('Operations Associate', 60000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
  ('Kimberley', 'Thornton', 3, NULL),
  ('Abhishek', 'Jamwal', 1, NULL),
  ('Bradford', 'Manuel', 2, NULL),
  ('Minjeong', 'Kim', 6, 2),
  ('Hannah', 'Fu', 7, 1);