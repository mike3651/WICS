import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

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
      assertEquals("Test failed!", 4, stack.pop());
      stack.push(5);
      assertEquals("Test failed!", 5, stack.pop());      
   }
   
   /* Tests {@link MyStack#isEmpty()} */
   @Test 
   public void testIsEmpty() {
      assertEquals("Stack size is not right", true, stack.isEmpty());
      stack.push(5);
      assertEquals("Stack size is not right", false, stack.isEmpty());
      stack.pop();
   }
}