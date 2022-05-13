
(Select charName, k_val FROM heroku_b3548b4ef16b308.characterdb
order by k_val DESC
);
(SELECT Element, GROUP_CONCAT(charName), Sum(k_val) FROM heroku_b3548b4ef16b308.characterdb
group by Element
Order by Sum(k_val) DESC);
(select charName, k_val
from heroku_b3548b4ef16b308.characterdb 
where Element = (select Element from heroku_b3548b4ef16b308.characterdb group by Element order by Sum(k_val) DESC Limit 1)
order by k_val DESC);

(SELECT Weapon, GROUP_CONCAT(charName), Sum(k_val) FROM heroku_b3548b4ef16b308.characterdb
group by Weapon
Order by Sum(k_val) DESC);
(select charName, k_val
from heroku_b3548b4ef16b308.characterdb 
where Weapon = (select Weapon from heroku_b3548b4ef16b308.characterdb group by Weapon order by Sum(k_val) DESC Limit 1)
order by k_val DESC);

(SELECT Region, GROUP_CONCAT(charName), Sum(k_val) FROM heroku_b3548b4ef16b308.characterdb
group by Region
Order by Sum(k_val) DESC);
(select charName, k_val
from heroku_b3548b4ef16b308.characterdb 
where Region = (select Region from heroku_b3548b4ef16b308.characterdb group by Region order by Sum(k_val) DESC Limit 1)
order by k_val DESC);




