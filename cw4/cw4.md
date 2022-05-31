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
   