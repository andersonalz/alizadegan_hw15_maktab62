SELECT * FROM equ.user;

select * from equ.user as a join equ.question as b on b.user_id = a.id where a.id=1;

select * from equ.user as a join equ.exam as b on b.user_id = a.id where a.id=1;

select * from equ.user as a join equ.question as b on b.user_id = a.id where b.type = "tashrihi" and a.id=1 ;

select * from equ.user as a join equ.question as b on b.user_id = a.id 
join equ.question_exam as c on c.question_id = b.id where c.score_qu > 3 and b.type = "testi"; 