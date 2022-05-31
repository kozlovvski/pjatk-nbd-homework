1. MATCH (m:Movie) RETURN m
2. MATCH (hugo:Person {name: "Hugo Weaving"})-[:ACTED_IN]->(hugoWeavingMovies) RETURN hugoWeavingMovies
3. MATCH (hugo:Person {name: "Hugo Weaving"})-[:ACTED_IN]->(hugoWeavingMovies)<-[:DIRECTED]-(directors) RETURN directors
4. MATCH (hugo:Person {name: "Hugo Weaving"})-[:ACTED_IN]->(hugoWeavingMovies)<-[:ACTED_IN]-(coactors) RETURN coactors
<!-- zapytać czy można zwrócić 5 w jednej zmiennej -->
5. MATCH (matrix:Movie {title: "The Matrix"})<-[:ACTED_IN]-(p)-[:ACTED_IN]->(otherMovies) RETURN matrix, otherMovies
6. MATCH (p:Person)-[r:ACTED_IN]->(m) WITH p,count(r) as acted WHERE acted>0 RETURN p,acted
7. MATCH (p:Person)-[:WROTE]->(m), (p)-[:DIRECTED]->(m) RETURN p,m
8. MATCH (k:Person {name: "Keanu Reeves"})-[:ACTED_IN]->(m), (h:Person {name: 'Hugo Weaving'})-[:ACTED_IN]->(m) RETURN m
9. CREATE (CapAmerica:Movie {title: "Captain America: The First Avenger"}),
   (JoeJohnston:Person {name: "Joe Johnston"}),
   (JoeJohnston)-[:DIRECTED]->(CapAmerica),
   (ChristopherMarkus:Person {name: "Christopher Markus"}),
   (ChristopherMarkus)-[:WROTE]->(CapAmerica),
   (StephenMcFeely:Person {name: "Stephen McFeely"}),
   (StephenMcFeely)-[:WROTE]->(CapAmerica),
   (ChrisEvans:Person {name: "Chris Evans"}),
   (ChrisEvans)-[:ACTED_IN]->(CapAmerica),
   (SamuelLJackson:Person {name: "Samuel L. Jackson"}),
   (SamuelLJackson)-[:ACTED_IN]->(CapAmerica),
   (TommyLeeJones:Person {name: "Tommy Lee Jones"}),
   (TommyLeeJones)-[:ACTED_IN]->(CapAmerica),
   (HayleyAtwell:Person {name: "Hayley Atwell"}),
   (HayleyAtwell)-[:ACTED_IN]->(CapAmerica)

MATCH (HugoWeaving: Person) WHERE HugoWeaving.name="Hugo Weaving"
CREATE (HugoWeaving)-[:ACTED_IN]->(CapAmerica)
