using UnityEngine;
using System.Collections;

public class Rotator : MonoBehaviour {


	// Update is called once per frame
	void Update () {
		// does a smooth rotation of an object
		transform.Rotate (new Vector3 (15, 30, 45) * Time.deltaTime);
	}
}
