1. MATCH path = ShortestPath((s {name: 'Darjeeling'})-[*]->(f {name: 'Sandakphu'})) RETURN path
2. MATCH path = ShortestPath((s {name: 'Darjeeling'})-[*]->(f {name: 'Sandakphu'}))
   WHERE all(r IN relationships(path) WHERE r.winter="true")  
   RETURN path;
3. MATCH path = (s {name: 'Darjeeling'})-[*]->(f {name: 'Sandakphu'})
WITH REDUCE (total = 0, r in relationships(path) | total + r.distance) as cost, path
RETURN path, cost ORDER BY cost
<!-- zapytanie nr 4 zwraca graf pusty -->
4. MATCH path = (s {name: 'Darjeeling'})-[:twowheeler*]->(f)
   WHERE all(r IN relationships(path) WHERE r.summer="true")  
   RETURN path;

<!-- Na potrzeby następnych zadań z lotami tworzę następujące relacje -->

MATCH (o:Airport),
(d:Airport),
(f:Flight),
(t:Ticket),
path = (o)<-[:ORIGIN]-(f)-[:DESTINATION]->(d),
(f)<-[:ASSIGN]-(t)
WITH o, d, f, t
ORDER BY t.price
WITH o, d, f, collect(t.price) as tickets
CREATE (o)-[:FLIGHT_TO{flight: ID(f), prices: tickets}]->(d)

5. MATCH (p:Airport)<-[:ORIGIN]-(f) WITH p, count(f) as c RETURN p,c ORDER BY c DESC
6. <!-- Długość ścieżek ograniczona do 6 z powodu bardzo długiego czasu obliczeń -->

   MATCH (e:Airport {name: "LAX"}),
   p = (e)-[:FLIGHT_TO*..6]->(s:Airport)
   WHERE s.name <> "LAX"
   AND reduce(t = 0, r in relationships(p) | t + r.prices[0]) < 3000
   WITH p, s
   UNWIND relationships(p) as rel
   WITH p, s, collect(distinct rel) as distinctFlights
   WHERE size(distinctFlights) = size(relationships(p))
   WITH collect(distinct s) as destinations
   RETURN destinations, size(destinations) as numAirports

7. MATCH p = (e:Airport {name: "LAX"})-[:FLIGHT_TO*..7]->(s:Airport {name:"DAY"})
   WITH p, reduce(t = 0, r in relationships(p) | t + r.prices[0]) as totalPrice
   UNWIND relationships(p) as rel
   WITH p, totalPrice, collect(distinct rel) as distinctFlights
   WHERE size(distinctFlights) = size(relationships(p))
   RETURN p, totalPrice ORDER BY totalPrice
   <!-- Brak ścieżek o długości max 7 -->
   <!-- Do DAY da się dolecieć jedynie z MSP, do którego z kolei da się dolecieć jedynie z FSD, DLH oraz MOT, jednakże żaden lot nie kończy się w którymś z tych miast. Z tego powodu nie da się dolecieć z LAX do DAY -->

8. MATCH p = (e:Airport {name: "LAX"})-[:FLIGHT_TO*..7]->(s:Airport {name:"DAY"})
   WITH p, reduce(t = 0, r in relationships(p) | t + r.prices[0]) as totalPrice
   UNWIND relationships(p) as rel
   WITH p, totalPrice, collect(distinct rel) as distinctFlights
   WHERE size(distinctFlights) = size(relationships(p))
   RETURN p, totalPrice ORDER BY totalPrice LIMIT 1
   <!-- Odpowiedź jak wyżej – nie da się dolecieć z LAX do DAY -->

9. MATCH (a:Airport)<-[:ORIGIN|DESTINATION]-(f:Flight)
   WITH f.airline as airline, size(collect(distinct a)) as numAirports
   RETURN airline, numAirports

10. MATCH p = ()-[:FLIGHT_TO*2]->()
    UNWIND nodes(p) as nod
    with p, collect(distinct nod) as distinctNodes
    WHERE size(distinctNodes) = size(nodes(p))
    WITH p, reduce(t = 0, r in relationships(p) | t + r.prices[0]) as totalPrice
    RETURN p, totalPrice ORDER BY totalPrice LIMIT 1
