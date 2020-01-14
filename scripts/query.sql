/**/
SELECT pt.name as Name, m.amount as "Amount", s.name as "Size"
from inventory m
inner join size s on m.id_size = s.id
inner join "productType" pt on m."id_productType" = pt.id
 
/* Get trasanctions in the inventory */
select pt.name as "Name", m.amount as "Amount", s.name as "Size", o.name as "Operation", 
m."updatedAt" as "Date", u.username as "user"
from movement m
inner join size s on m.id_size = s.id
inner join operation o on m.id_operation = o.id
inner join "productType" pt on m."id_productType" = pt.id
inner join "user" u on m.id_user = u.id

/**/



 


