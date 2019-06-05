/**
 *    The Actor class is used by Behaviors to apply behaviors to.
 *  @Class Actor
 */

import Vector3 from "./Vector3";
import {UUID} from "./Generate";

export default class Actor {
    /**
     * @constructor
     * @param className {string}
     * @param location {Vector3)
     */
    constructor(className = "Actor", location = new Vector3(0, 0, 0)) {
        this.type = className;
        this.active = true;
        this.visible = true;
        this.dead = false;
        this.id = UUID();
        this.location = location;
        this.velocity = new Vector3(0, 0, 0);
        this.acceleration = new Vector3(0, 0, 0);
        this.angle = 0;
        this.maxSpeed = 15;
        this.maxForce = 1;
    }

    /**
     * addForce() will add the vector you pass in to the acceleration
     * @param vector {Vector3}
     */
    addForce(vector) {
        this.acceleration.add(vector);
    }

    /**
     * update() will check to see if this actor is active, then call move(), then add the acceleration to the velocity, the velocity to the location, then reset the acceleration.
     */
    update() {
        if (this.active) {
            this.move();
            this.velocity.add(this.acceleration);
            this.location.add(this.velocity);
            this.acceleration.set(0, 0, 0);
        }
    }

    /**
     * move() is unused in the base class and is designed to be overridden. Anything in the move function will be applied before acceleration is added to velocity. See DOMActor for an example.
     */
    move() {

    }

    /**
     * render() checks if the actor is visible then calls the draw() function. See DOMActor for an example.
     */
    render() {
        if (this.visible) {
            this.draw();
        }
    }

    /**
     * draw() is empty in this class but can be extended to render itself in any rendering environment of your choice. See DOMActor for an example.
     */
    draw() {
        // override this function win your drawing code
    }

    /**
     * destroy() sets the Actor.dead state to true. This is used by the GameLoop class to clean up / remove dead objects.
     */
    destroy() {
        this.dead = true;
    }
}
