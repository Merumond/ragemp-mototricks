// Author https://github.com/Merumond/ragemp-mototricks/

const localPlayer = mp.players.local;

// List of all motorcycles that can be used for stunts
const availableBikes = [
    mp.game.joaat("hakuchou2")
];

// Button key for tricks
const actionKey = 0x47;

// Minimum speed to perform a trick
const minSpeed = 50;

const animDict = "rcmextreme2atv";
const trickList = ["idle_a", "idle_b", "idle_c", "idle_d", "idle_e"];

function Check() {
    let vehicle = localPlayer.vehicle;
    if (vehicle) {
        if (availableBikes.includes(vehicle.model)) {
            if (vehicle.getSpeed() * 3.6 >= minSpeed) {
                localPlayer._cantrick = true;
                return;
            }
        }
    }
    localPlayer._cantrick = false;
};

function IsTricking() {
    if (typeof(localPlayer._trickAnimation) == 'undefined') return false;
    return localPlayer.isPlayingAnim(animDict, localPlayer._trickAnimation, 3);
};

function KeyBind() {
    if (IsTricking()) {
        localPlayer.clearTasks();
    }
    else {
        if (!localPlayer._cantrick) return;

        while (!mp.game.streaming.hasAnimDictLoaded(animDict)) {
            mp.game.streaming.requestAnimDict(animDict);
            mp.game.wait(1);
        }

        let trickAnim = trickList[Math.floor((Math.random() * trickList.length))];
        localPlayer._trickAnimation = trickAnim;

        localPlayer.taskPlayAnim(animDict, localPlayer._trickAnimation, 8.0, -8.0, -1, 0, 0, false, false, false);
    }
};

mp.keys.bind(actionKey, false, () => KeyBind());
setInterval(() => Check(), 1000);