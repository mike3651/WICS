/* General graph theory class
 * 
 * ©Michael Wilson, 2017
 */

import java.util.*;

public class GraphClient {
	/* Keeps a reference to the graph */	
	private static final Graph myGraph;
	
	/* Using this static block to initialize the contents of the graph */
	static {
		/* First graph representation, has Euler circuit
		 a---b---c
		 |  | |  |
		 d---e---f
		 
		 */		
		int id = 0;
		List<Vertex> vertices = new ArrayList<Vertex>();
		for(int i = 0; i < 6; i++) {
			vertices.add(new Vertex((char)('a' + i)));
		}
		
		Set<Edge> edges = new HashSet<Edge>();
				
		edges.add(new Edge(vertices.get(0), vertices.get(1), id)); /* a --- b */
		id++;	
		edges.add(new Edge(vertices.get(0), vertices.get(3), id)); /* a --- d */
		id++;
		edges.add(new Edge(vertices.get(1), vertices.get(2), id)); /* b --- c */
		id++;
		edges.add(new Edge(vertices.get(2), vertices.get(5), id)); /* c --- f */
		id++;
		edges.add(new Edge(vertices.get(3), vertices.get(4), id)); /* d --- e */
		id++;
		edges.add(new Edge(vertices.get(4), vertices.get(5), id)); /* e --- f */
		id++;
		edges.add(new Edge(vertices.get(1), vertices.get(4), id)); /* b --- e */
		id++;
		edges.add(new Edge(vertices.get(1), vertices.get(4), id)); /* b --- e */
		
		/* update all of the degrees of each vertex respectively */
		for(Edge edge : edges) {
			edge.getDestination().incrementDegree();
			edge.getSource().incrementDegree();
		}
		
		/* Testing method that prints out all the vertex degrees
		 * a - 2
		 * b - 4
		 * c - 2
		 * d - 2
		 * e - 4
		 * f - 2 */
//		for(Vertex v: vertices) {
//			System.out.println(v.getName() + " - " + v.getDegree());
//		}
		
		myGraph = new Graph(edges, vertices);
	}
	
	/* Kicks off the program 
	 * 
	 * @param theArgs Arguments from the command line */
	public static void main(final String[] theArgs) {
		StringBuilder phrase1 = new StringBuilder();
		phrase1.append("The graph ");
		if (hasEulerPath()) {				
			phrase1.append("has a Euler path");
		} else {
			phrase1.append("doesn't have a Euler path");
		}
		System.out.println(phrase1.toString());
		
		StringBuilder phrase2 = new StringBuilder();
		phrase2.append("The graph ");
		if (hasEulerCycle()) {				
			phrase2.append("has a Euler cycle");
		} else {
			phrase2.append("doesn't have a Euler cycle");
		}
		System.out.println(phrase2.toString());
	}
	
	/* Method that checks to see if there exists a euler path in the grpah 
	 * 
	 * @return two odd degree vertices at most ? true : false */
	private static boolean hasEulerPath() {
		int numberOfOdds = 0;
		for(Vertex vertex : myGraph.getVertices()) {
			if(vertex.getDegree() % 2 == 1) {
				numberOfOdds++;
			}
		}
		return numberOfOdds < 3 ? true : false;
	}
	
	/* Method that checks to see as to whether or not the graph contains an Euler cycle
	 * 
	 * @return all vertices have an even degree ? true : false */
	private static boolean hasEulerCycle() {
		for(Vertex vertex : myGraph.getVertices()) {
			if(vertex.getDegree() % 2 == 1) {
				return false;
			}
				
		}
		return true;
	}
}
		