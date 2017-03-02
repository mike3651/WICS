/* This class represents a common graph
 * The contents of the graph don't change over time
 *  
 *  ©Michael Wilson, 2017
 */

import java.util.*;

public class Graph {
	/* The set of edges */
	private final Set<Edge> myEdges;
	
	/* The set of vertices */
	private final List<Vertex> myVertices;
	
	/* Constructs a graph
	 * 
	 * @param edgeSet The edges associated with this graph
	 * @param vertexSet The vertices associated with this graph */
	public Graph(final Set<Edge> edgeSet, final List<Vertex> vertexSet) {
		myEdges = edgeSet;
		myVertices = vertexSet;
	}
	
	// GETTER METHODS //
	
	/* Gets the edges in this graph
	 * 
	 * @return The set of edges in the graph */
	public Set<Edge> getEdges() {
		return myEdges;
	}
	
	/* Gets the vertices in this graph
	 * 
	 * @return The set of vertices in the graph */
	public List<Vertex> getVertices() {
		return myVertices;
	}
}