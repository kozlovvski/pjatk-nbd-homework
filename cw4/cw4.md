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

5. MATCH (p:Airport)<-[:ORIGIN]-(f) WITH p, count(f) as c RETURN p,c ORDER BY c DESC
<!-- Długość ścieżek ograniczona do 6 z powodu bardzo długiego czasu obliczeń -->
6. MATCH path = (origin:Airport { name:"LAX" })<-[r:ORIGIN|DESTINATION*..6]->(destination:Airport)
   WITH REDUCE(sum = 0, k IN [x IN NODES(path) WHERE 'Flight' IN LABELS(x)] |
   sum + [(k)<-[:ASSIGN]-(ticket) | ticket.price][0]
   ) AS cost, path
   WHERE cost < 3000
   RETURN path, cost
7. MATCH path = (origin:Airport { name:"LAX" })<-[:ORIGIN]-(t)<-[:ORIGIN|DESTINATION*..6]->(destination:Airport {name: "DAY"})
   UNWIND NODES(path) AS n WITH path, SIZE(COLLECT(DISTINCT n)) AS testLength WHERE testLength = LENGTH(path) + 1
   RETURN path
   WITH REDUCE(sum = 0, k IN [x IN NODES(path) WHERE 'Flight' IN LABELS(x)] | sum + [(k)<-[:ASSIGN]-(ticket) | ticket.price][0]) AS cost, path
   RETURN path, cost
   ORDER BY cost
