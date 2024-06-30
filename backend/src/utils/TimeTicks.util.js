export default class TimeTicks{

    //generated by chatGPT

    static calc(baseTime, speed, decayRate = 0.1) {
            // Ensure the decay rate is a positive number
    if (decayRate <= 0) {
        throw new Error("Decay rate must be positive.");
    }

    // Apply the exponential decay formula
    const adjustedTime = baseTime * Math.exp(-decayRate * speed);

    // Ensure the time doesn't go below 1 second
    return Math.max(1, adjustedTime);
    }
}