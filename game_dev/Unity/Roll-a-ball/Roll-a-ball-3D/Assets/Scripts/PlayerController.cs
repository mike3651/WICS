using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class PlayerController : MonoBehaviour {	
	// keeps a reference to the rigidbody attached to this object
	private Rigidbody rb;

	// keeps reference to UI text component
	public Text countText;
	public Text winText;

	// keeps track of the speed of the ball, allows us to edit via-unity editor
	public float speed;

	// keeps track of the number of cubes this user has collected
	private int count;

	void Start() 
	{
		count = 0;

		// gets the rigid body component
		rb = GetComponent<Rigidbody>();

		winText.text = "";

		SetCountText ();
	}

	// called before physics calculation
	void FixedUpdate() 
	{
		float moveHorizontal = Input.GetAxis("Horizontal");
		float moveVertical = Input.GetAxis ("Vertical");

		// generates a new vector 3, determines direction of force
		Vector3 movement = new Vector3 (moveHorizontal, 0, moveVertical);

		rb.AddForce (movement * speed);
	}

	// checks for the collision of the game objects with trigger colliders
	void OnTriggerEnter(Collider other) 
	{
		// deactivate the game object if it is a pick up
		if (other.gameObject.CompareTag ("Pick Up")) 
		{
			other.gameObject.SetActive(false);
			count++;
			SetCountText();
		}
	}

	void SetCountText() 
	{
		countText.text = "Count: " + count.ToString ();
		if (count >= 10) 
		{
			winText.text = "You win!";
		}
	}
	                                    
}

