select * 
from heroku_b3548b4ef16b308.characterdb 
where Element = (select Element from heroku_b3548b4ef16b308.characterdb order by f_val DESC Limit 1)
order by f_val DESC



