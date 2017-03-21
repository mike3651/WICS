import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;


/* This class is used to test out the properties of mystack class
 *  
 *  @author Michael Wilson
 *  @version 1.0
 */
public class MyStackTest {
   private MyStack stack;
   
   
   /* Runs before each test */
   @Before 
   public void setUp() {
      stack = new MyStack();
   }
   
   /* Tests our defualt constructor */
   @Test
   public void testDefaultConstructor() {
      assertEquals(0, stack.getSize());
      assertEquals(null, stack.peek());
   }
   
   /* Tests {@link MyStack#pop()} */
   @Test
   public void testPop() {
      stack.push(4);
      assertEquals("Test failed!", 4, stack.pop().getValue());
      stack.push(5);
      assertEquals("Test failed!", 5, stack.pop().getValue());      
   }
   
   /* Tests {@link MyStack#isEmpty()} */
   @Test 
   public void testIsEmpty() {
      assertEquals("Stack size is not right", true, stack.isEmpty());
      stack.push(5);
      assertEquals("Stack size is not right", false, stack.isEmpty());
      stack.pop();
   }
   
   /* Tests {@link MyStack#getSize()} */
   @Test 
   public void testGetSize() {
      assertEquals("Stack size is not right", 0, stack.getSize());
      stack.push(5);
      assertEquals("Stack size is not right", 1, stack.getSize());
      stack.pop();
   }
}