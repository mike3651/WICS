public class MyStack {
   int size;
   Node top;   
   {
      size = 0;
      top = null;
   } 
   
   // simple push to stack 
   public void push(int n) {      
      if(top == null) {
         top = new Node(n);      
      } else {
         Node temp = top;
         Node newNode = new Node(n);
         newNode.next = temp;
         top = newNode;
      }
      size++;
   }
   
   // simple pop from stack
   public Node pop() {
      if(top == null) return null;
      else {
         Node tempMarker = peek();
         top = top.next;
         size--;
         return tempMarker;   
      }
   }
   
   // peeks at the top node
   public Node peek() {
      return top;
   }
   
   // checks to see if the stack is empty
   public boolean isEmpty() {
      return size == 0;
   }
   
   // returns the size of the stack
   public int getSize() {
      return size;
   }
   
   
   private class Node {
      private int value;
      
      // simple constructor
      public Node(int n) {
         value = n;
      }
      
      // returns the nodes value
      public int getValue() {
         return value;
      }
   }
   
}