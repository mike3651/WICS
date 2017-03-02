/* This class represents an edge in a graph
 * There are no setter methods in this class since all of the 
 * fields are declared final. An edge can't change over time
 * 
 * ©Michael Wilson, 2017
 */
public class Edge {
	/* The source and destination nodes of this edge */
	private final Vertex mySrc, myDest;
	
	/* The unique ID of this edge */
	private final int myId;
	
	/* Constructs an edge
	 * 
	 * @param src The source vertex
	 * @param dest The destination vertex
	 * @param id The ID of this edge */
	public Edge(final Vertex src, final Vertex dest, final int Id) {
		mySrc = src;
		myDest = dest;
		myId = Id;
	}
	
	// GETTER METHODS //
	
	/* Method that gets the source of this edge
	 * 
	 * @return The source vertex */
	public Vertex getSource() {
		return mySrc;
	}
	
	/* Method that gets the destination of this edge
	 * 
	 * @return The destination vertex */
	public Vertex getDestination() {
		return myDest;
	}
	
	/* Method that gets the ID of this edge
	 * 
	 * @return The edge ID */
	public int getId() {
		return myId;
	}
	
}
