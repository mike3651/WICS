import java.util.*;
public class Questions {
   private static Stack<Integer> s, s2;
   
   static {
      s = new Stack<Integer>();
      for(int i = 5; i < 11; i++)
         s.push(i);
      s.push(0);
      
      s2 = new Stack<Integer>();
      for(int i = 7; i < 13; i++) 
         if(i != 11) 
            s2.push(i);            
   }

   public static void main(final String[] args) {   
//       System.out.println("The following is consecutive: " + isConsecutive(s));
//       printStack(s);      
//       System.out.println("The following is consecutive: " + isConsecutive(s2));
//       printStack(s2);
         System.out.println("Stack is sorted: " + isSorted(s));
   }  
   
   
   // problem 15
   private static boolean isSorted(Stack<Integer> s) {
      if(s.size() == 0 || s.size() == 1) return true;
      Queue<Integer> q = new LinkedList<Integer>();
      boolean marker = true;
      setUp(s, q);
      int compare = q.remove();
      while(!q.isEmpty()) {
         int temp = q.remove();
         if(compare > temp) marker = false;
         s.push(compare);
         compare = temp;
      }
      s.push(compare);
      return marker;
   }
   
   // problem 10
   private static boolean isConsecutive(Stack<Integer> s) {
      if(s.size() < 2) return true;
      Queue<Integer> q = new LinkedList<>();
      boolean marker = true;
      setUp(s, q);
      
      int compare = q.remove();
      while(!q.isEmpty()) {
         int temp = q.remove();
         if(compare != temp - 1) marker = false;
         s.push(compare);
         compare = temp;         
      }
      s.push(compare);
      return marker;      
   }
   
   private static void setUp(Stack<Integer> s, Queue<Integer> q) {
      s2q(s, q);
      q2s(q, s);
      s2q(s, q);
   }
   
   private static boolean equals(Stack<Integer> s1, Stack<Integer> s2) {
      if(s1.size() != s2.size()) return false;
      Stack<Integer> s3 = new Stack<Integer>();
      // remove the top elements from each stack
         // if they aren't equal, restore the stacks then return false;
         // push value to s3
         
      boolean marker = true;
      while(!s1.isEmpty()) {
         int s1Val = s1.pop();
         int s2Val = s2.pop();
         if(s1Val != s2Val) {
            s1.push(s1Val);
            s2.push(s2Val);
            marker = false;
            break;
         } else {
            s3.push(s1Val);
         }         
      }   
      while(!s3.isEmpty()) {
         int temp = s3.pop();
         s1.push(temp);
         s2.push(temp);   
      }
      return marker;    
   }
   
   private static void collapse(Stack<Integer> s) {
      Queue<Integer> q = new LinkedList<>();
      s2q(s, q);      
      while(!q.isEmpty()) {
         if(q.size() % 2 == 0) {
            int op1 = q.remove();
            int op2 = q.remove();
            int addition = op1 + op2;
            s.push(addition);
         } else s.push(q.remove());
      }
      s2q(s, q);
      q2s(q, s);
   }
   
   private static Stack<Integer> copyStack(Stack<Integer> s) {
      Queue<Integer> q = new LinkedList<>();
      Stack<Integer> s2 = new Stack<Integer>();
      s2q(s, q);
      q2s(q, s);
      s2q(s, q);
      while(!q.isEmpty()) {
         int value = q.remove();
         s.push(value);
         s2.push(value);
      }
      return s2;
   }
   
   private static void stutter(Stack<Integer> s) {
      Queue<Integer> q = new LinkedList<Integer>();
      s2q(s, q);
      while(!q.isEmpty()) {
         int tempVal = q.remove();
         s.push(tempVal);
         s.push(tempVal);
      }     
      s2q(s, q);
      q2s(q, s);
   }
   
   private static void q2s(Queue<Integer> q, Stack<Integer> s) {
      while(!q.isEmpty()) s.push(q.remove());
   }
   
   private static void s2q(Stack<Integer> s, Queue<Integer> q) {
      while(!s.isEmpty()) q.add(s.pop());
   }
     
   private static void splitStack(Stack<Integer> s) {
      // contents of stack --> queue
      Queue<Integer> q = new LinkedList<Integer>();
      while(!s.isEmpty()) q.add(s.pop());
      
      int qSize = q.size();
      for(int i = 0; i < qSize; i++) {
         int value = q.remove();
         if(value < 0) s.push(value);
         else q.add(value);
      }
      
      // push positives to the stack 
      while(!q.isEmpty()) s.push(q.remove());
   }
   
   
  
   // method that prints out the contents of a stack
   private static void printStack(Stack<Integer> s) {
      Stack<Integer> temp = new Stack<>();
      while(!s.isEmpty()) temp.push(s.pop());
      while(!temp.isEmpty()) {
         int val = temp.pop();
         System.out.print(val + " ");
         s.push(val);
      }
      System.out.println();
   } 
}