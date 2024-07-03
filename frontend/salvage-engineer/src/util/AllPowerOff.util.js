

const AllPowerOff = (powerBox) => {
    powerBox.fabricator = false;
    powerBox.claw = false;
    powerBox.magnet = false;
    powerBox.scoop = false;    

    return powerBox;
}

export default AllPowerOff;