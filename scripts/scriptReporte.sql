select ot.name,s.name,  sum(mov.amount)
from movement mov
inner join "productType" ot on mov."id_productType" = ot."id"
inner join "size" s on mov.id_size = s."id"
where mov."createdAt" between '2020/01/19' and '2020/01/25'
group by ot.name, s.name
order by ot.name,s.name

select * from movement
where "createdAt" between '2020/01/19' and '2020/01/25'

update movement mov
set "createdAt" = '2020-01-04'
where mov.id = 28
 