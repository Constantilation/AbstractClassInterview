--Таблица Students имеет поля StudentId, FirstName, LastName, Group и содержит информацию о студентах института. Таблица Exams имеет поля StudentId, ExamName, Result и содержит результаты экзаменов студентов.
--a) написать SQL запрос, который выводит имена и фамилии студентов у которых больше двух экзаменов с результатом меньше 3.
--b) написать SQL запрос, который выводит название групп, в которых таких студентов больше 10


--a)
SELECT students.FirstName, students.LastName, COUNT(students.studentId), students.studentId
FROM students INNER JOIN exams
                        ON students.studentId = exams.studentId
WHERE exams.Result < 3
GROUP BY Students.studentId, students.FirstName, students.LastName
HAVING COUNT(students.studentId) >= 2;

--b)
SELECT R.groups
FROM
     ((
         SELECT students.FirstName, students.LastName, COUNT(students.studentId), students.studentId
         FROM students INNER JOIN exams
         ON students.studentId = exams.studentId
         WHERE exams.Result < 3
         GROUP BY Students.studentId HAVING COUNT(students.studentId) >= 2
         ) as F
        JOIN students ON students.studentId = F.studentId) as R
GROUP BY R.groups
having count(R.groups) > 10
