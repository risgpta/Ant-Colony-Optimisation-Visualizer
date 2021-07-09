# Ant-Colony-Optimisation-Visualizer FOR TRAVELLING SALESMAN PROBLEM
Ant Colony Optimisation Visualizer for the famous Travelling Salesman Problem

IMPLEMENTATION: https://risgpta.github.io/Ant-Colony-Optimisation-Visualizer/

short:
The traveling salesman problem (TSP) is an algorithmic problem tasked with finding the shortest route between a set of points and locations that must be visited. Focused on optimization, TSP is often used in computer science to find the most efficient route for data to travel between various nodes.

To know more: https://en.wikipedia.org/wiki/Travelling_salesman_problem

You can play around with different parameters - ALPHA, BETA and EVAPORATION RATE OF PHERMONE to find your shortest path sooner!!

10 Ants (start from a city independently and make their tour) explore around with each click of "Start ACO..." and find the better path in every iteration!!
This NP Hard Problem uses heuristic approach to find better approximate solution

Probability for an ant to select a city = ((phermone amount deposited on a edge)^ALPHA*(distance of that edge)^BETA)/Sum of the Numerator factor for all edges(in path of the ant)


Probabilty is directly propotional to amount of phermone deposited and inversely proportional to the distance to be covered for the next city (heuristic).
This gives guided choice but randomization is also added to explore different paths! 

The solution will not be the best but it will be a better solution considering when we can have none due to its NP hardnes.
That's what approximate algorithms do!


<img width="1774" alt="Screen Shot 2021-06-30 at 11 18 48 PM" src="https://user-images.githubusercontent.com/34606242/124061028-cc4e0680-da4b-11eb-8b38-b058873f30ff.png">
On Show MAX

<img width="1115" alt="Screen Shot 2021-07-01 at 9 06 14 AM" src="https://user-images.githubusercontent.com/34606242/124061048-d1ab5100-da4b-11eb-80f1-352a21a4390b.png">

On Show Min
<img width="1139" alt="Screen Shot 2021-07-01 at 9 06 03 AM" src="https://user-images.githubusercontent.com/34606242/124061050-d2dc7e00-da4b-11eb-8541-04b832acb78b.png">

Path traced by ants
<img width="1226" alt="Screen Shot 2021-07-01 at 9 05 53 AM" src="https://user-images.githubusercontent.com/34606242/124061051-d2dc7e00-da4b-11eb-8345-54ff9154f686.png">



https://user-images.githubusercontent.com/34606242/125028168-2a5e9780-e0a5-11eb-80cb-0bc44a962389.mov



LINK -  https://en.wikipedia.org/wiki/Ant_colony_optimization_algorithms


Related github Repo - https://github.com/risgpta/Ant-Colony-Optimisation
