using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour {
	// reference to the player
	public GameObject player;

	// reference to the position relative to the player
	private Vector3 offset;

	// Use this for initialization
	void Start () {
		offset = transform.position - player.transform.position;
	}
	
	// Update is called once per frame, runs after all items have been processed
	void LateUpdate () {
		// continually sets the position of the camera to the proper position
		transform.position = player.transform.position + offset;
	}
}
