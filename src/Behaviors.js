/**
 * Behaviors are applied to Actors by passing actors, target actors, and parameters into them.
 * @class Behaviors
 */
import {MapRange} from "./Convert";
import {UUID} from "./Generate";
import Vector3 from "./Vector3";
import Pool from "./Pool";
import Screen from "./Screen";

const key = UUID();
export default class Behavior {
    /**
     * init is a static method that is used to initialize the object pool
     */
    static init() {
		Pool.allocate(Vector3, key, Vector3.reset);
    }

    /**
     * seek() finds the distance between the actor and the targetLcation and applys a force to move the actor toward that target.
     * @param actor {Actor}
     * @param targetPosition {Vector3}
     * @param scaleForce {?number}
     */
    static seek(actor, targetPosition, scaleForce = 1) {
        var desired = Pool.getObject(key);
        var steer = Pool.getObject(key);

        Vector3.subtract(targetPosition, actor.location, desired);
        desired.normalize();
        desired.multiply(actor.maxSpeed);
        Vector3.subtract(desired, actor.velocity, steer);

        steer.limit(actor.maxForce);
        steer.multiply(scaleForce);
        actor.addForce(steer);

        Pool.returnObject(desired);
        Pool.returnObject(steer);
    }

    /**
     * arrive() works similarly to seek, but with the magnitude of the seek mapped to a power that is inversely proportionate to the magnitude of the distance between the actor and the target.
     * @param actor {Actor}
     * @param target {Vector3}
     * @param power {?number}
     * @param scaleForce {?number}
     */
    static arrive(actor, target, power = 50, scaleForce = 1) {
        var desired = Pool.getObject(key);
        var steer = Pool.getObject(key);
        Vector3.subtract(target, actor.location, desired);
        var mappedPower = MapRange(desired.magnitude(), 0, power, 0, actor.maxSpeed);
        desired.normalize();
        desired.multiply(mappedPower);
        Vector3.subtract(desired, actor.velocity, steer);
        steer.limit(actor.maxForce);
        steer.multiply(scaleForce);
        actor.addForce(steer);
        Pool.returnObject(desired);
        Pool.returnObject(steer);
    }

    /**
     * avoidAll() takes an array of obstacle actors and for each obstacle, the Actor will have the average escape vector of all the obstacles near it applied to it.
     * @param actor {Actor}
     * @param obstacles {Array.<Actor>}
     * @param avoidRadius {?number}
     * @param scaleForce {?number}
     */
    static avoidAll(actor, obstacles, avoidRadius = 80, scaleForce = 1) {
        var difference = Pool.getObject(key);
        var steer = Pool.getObject(key);
        var total = Pool.getObject(key);
        var count = 0;
        for (var o = 0; o < obstacles.length; o++) {
            var obstacle = obstacles[o];
            var distance = Vector3.dist(actor.location, obstacle.location);
            if ((distance > 0) && (distance < avoidRadius) && actor.id != obstacle.id) {
                Vector3.subtract(actor.location, obstacle.location, difference);
                difference.normalize();
                difference.divide(distance);
                total.add(difference);
                count++;
            }
        }
        if (count > 0) {
            total.divide(count);
            total.normalize();
            total.multiply(actor.maxSpeed);
            Vector3.subtract(total, actor.velocity, steer);
            steer.limit(actor.maxForce);
            steer.multiply(scaleForce);
            actor.addForce(steer);
        }
        Pool.returnObject(difference);
        Pool.returnObject(steer);
        Pool.returnObject(total);
    }

    /**
     * Uses a single obstacle in the avoidAll function
     * @param actor
     * @param target
     * @param avoidRadius
     */
    static avoid(actor, target, avoidRadius) {
        this.avoidAll(actor, [target], avoidRadius);
    }

    /**
     * constrain() will lock your actor to the provided area. Velocity will be inverted with no friction when an Actor hits the wall.
     * @param actor {Actor}
     * @param minWidth {number} Left
     * @param minHeight {number} Uo
     * @param maxWidth {number} Right
     * @param maxHeight {number} Bottom
     * @param margin {number} the amount of offset you want for these values. The margins work by subtracting from minimums and adding to maximums.
     */
    static constrain(actor, minWidth = 0, minHeight = 0, maxWidth = Screen.width, maxHeight = Screen.height, margin = 0) {
        minWidth -= margin;
        maxWidth += margin;
        minHeight -= margin;
        maxHeight += margin;

        if (actor.location.x < minWidth) {
            actor.velocity.x *= -1;
            actor.location.x = minWidth;
        }
        if (actor.location.y < minHeight) {
            actor.velocity.y *= -1;
            actor.location.y = minHeight;
        }
        if (actor.location.x > maxWidth) {

            actor.velocity.x *= -1;
            actor.location.x = maxWidth;
        }
        if (actor.location.y > maxHeight) {
            actor.velocity.y *= -1;
            actor.location.y = maxHeight;
        }

    }

    /**
     * wrap() will teleport your object to the opposite side of the screen where it left
     * @param actor {Actor}
     * @param minWidth {number} Left
     * @param minHeight {number} Uo
     * @param maxWidth {number} Right
     * @param maxHeight {number} Bottom
     * @param margin {number} the amount of offset you want for these values. The margins work by subtracting from minimums and adding to maximums.
     */
    static wrap(actor, minWidth = 0, minHeight = 0, maxWidth = Screen.width, maxHeight = Screen.height, margin = 0) {
        minWidth -= margin;
        maxWidth += margin;
        minHeight -= margin;
        maxHeight += margin;

        if (actor.location.x < minWidth) {
            actor.location.x = maxWidth;
        }
        if (actor.location.y < minHeight) {
            actor.location.y = maxHeight;
        }
        if (actor.location.x > maxWidth) {
            actor.location.x = minWidth;
        }
        if (actor.location.y > maxHeight) {
            actor.location.y = minHeight;
        }
    }

    /**
     * disableOutside will set your Actor.active parameter to "false" when it leaves the defined area
     * @param actor {Actor}
     * @param minWidth {number} Left
     * @param minHeight {number} Uo
     * @param maxWidth {number} Right
     * @param maxHeight {number} Bottom
     * @param margin {number} the amount of offset you want for these values. The margins work by subtracting from minimums and adding to maximums.
     */
    static disableOutside(actor, minWidth, minHeight, maxWidth, maxHeight, margin = 0) {
        minWidth -= margin;
        maxWidth += margin;
        minHeight -= margin;
        maxHeight += margin;

        if (actor.location.x < minWidth || actor.location.y < minHeight || actor.location.x > maxWidth || actor.location.y > maxHeight) {
            actor.active = false;
            actor.visible = false;
        }
    }

    /**
     * destroyOutside will set Actor.dead to true if it leaves the defined area;
     * @param actor {Actor}
     * @param minWidth {number} Left
     * @param minHeight {number} Uo
     * @param maxWidth {number} Right
     * @param maxHeight {number} Bottom
     * @param margin {number} the amount of offset you want for these values. The margins work by subtracting from minimums and adding to maximums.
     */
    static destroyOutside(actor, minWidth, minHeight, maxWidth, maxHeight, margin = 0) {
        minWidth -= margin;
        maxWidth += margin;
        minHeight -= margin;
        maxHeight += margin;
        if (actor.location.x < minWidth || actor.location.y < minHeight || actor.location.x > maxWidth || actor.location.y > maxHeight) {
            actor.dead = true;
        }
    }
}
Behavior.init();