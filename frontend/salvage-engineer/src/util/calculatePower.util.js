

const CalculatePower = (newPowerBox) => {
    let totalPowerUsage = 0;
    if (newPowerBox.fabricator) totalPowerUsage++;
    if (newPowerBox.claw) totalPowerUsage++;
    if (newPowerBox.magnet) totalPowerUsage++;
    if (newPowerBox.scoop) totalPowerUsage++;
    return totalPowerUsage;
}

export default CalculatePower;