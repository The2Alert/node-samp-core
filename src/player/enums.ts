export enum Weapons {
    BRASSKNUCKLE = 1,
    GOLFCLUB = 2,
    NITESTICK = 3,
    KNIFE = 4,
    BAT = 5,
    SHOVEL = 6,
    POOLSTICK = 7,
    KATANA = 8,
    CHAINSAW = 9,
    DILDO = 10,
    DILDO2 = 11,
    VIBRATOR	= 12,
    VIBRATOR2 = 13,
    FLOWER = 14,
    CANE = 15,
    GRENADE = 16,
    TEARGAS = 17,
    MOLTOV = 18,
    COLT45 = 22,
    SILENCED = 23,
    DEAGLE = 24,
    SHOTGUN = 25,
    SAWEDOFF = 26,
    SHOTGSPA = 27,
    UZI = 28,
    MP5 = 29,
    AK47 = 30,
    M4 = 31,
    TEC9 = 32,
    RIFLE = 33,
    SNIPER = 34,
    ROCKETLAUNCHER = 35,
    HEATSEEKER = 36,
    FLAMETHROWER	= 37,
    MINIGUN = 38,
    SATCHEL = 39,
    BOMB = 40,
    SPRAYCAN = 41,
    FIREEXTINGUISHER = 42,
    CAMERA = 43,
    PARACHUTE = 46,
    VEHICLE = 49,
    DROWN = 53,
    COLLISION = 54
}

export enum Keys {
    ACTION = 1,
    CROUCH = 2,
    FIRE = 4,
    SPRINT = 8,
    SECONDARY_ATTACK = 16,
    JUMP = 32,
    LOOK_RIGHT = 64,
    HANDBRAKE = 128,
    LOOK_LEFT = 256,
    SUBMISSION = 512,
    LOOK_BEHIND = 512,
    WALK = 1024,
    ANALOG_UP = 2048,
    ANALOG_DOWN = 4096,
    ANALOG_LEFT = 8192,
    ANALOG_RIGHT = 16384,
    YES = 65536,
    NO = 131072,
    CTRL_BACK = 262144,
    UP = -128,
    DOWN = 128,
    LEFT = -128,
    RIGHT = 128
}

export enum PlayerDisconnectReasons {
    TIMEOUT_CRASH,
    QUIT,
    KICK_BAN
}

export enum PlayerStates {
    NONE = 0,
    ONFOOT = 1,
    DRIVER = 2,
    PASSENGER = 3,
    EXIT_VEHICLE = 4,
    ENTER_VEHICLE_DRIVER = 5,
    ENTER_VEHICLE_PASSENGER = 6,
    WASTED = 7,
    SPAWNED = 8,
    SPECTATING = 9
}

export enum ClickSources {
    SCOREBOARD = 0
}

export enum EditObjectResponse {
    CANCEL = 0,
    FINAL = 1,
    UPDATE = 2
}

export enum SelectObjectTypes {
    GLOBAL = 1,
    PLAYER = 2
}

export enum BulletHitTypes {
    NONE = 0,
    PLAYER = 1,
    VEHICLE = 2,
    OBJECT = 3,
    PLAYER_OBJECT = 4
}

export enum PlayerMarkerModes {
    OFF = 0,
    GLOBAL = 1,
    STREAMED = 2
}

export enum SpecialActions {
    NONE = 0,
    DUCK = 1,
    USEJETPACK = 2,
    ENTER_VEHICLE = 3,
    EXIT_VEHICLE = 4,
    DANCE1 = 5,
    DANCE2 = 6,
    DANCE3 = 7,
    DANCE4 = 8,
    HANDSUP = 10,
    USECELLPHONE = 11,
    SITTING = 12,
    STOPUSECELLPHONE = 13,
    DRINK_BEER = 20,
    SMOKE_CIGGY = 21,
    DRINK_WINE = 22,
    DRINK_SPRUNK = 23,
    CUFFED = 24,
    CARRY = 25
}

export enum FightStyles {
    NORMAL = 4,
    BOXING = 5,
    KUNGFU = 6,
    KNEEHEAD = 7,
    GRABKICK = 15,
    ELBOW = 16
}

export enum WeaponSkills {
    PISTOL = 0,
    PISTOL_SILENCED = 1,
    DESERT_EAGLE = 2,
    SHOTGUN = 3,
    SAWNOFF_SHOTGUN = 4,
    SPAS12_SHOTGUN = 5,
    MICRO_UZI = 6,
    MP5 = 7,
    AK47 = 8,
    M4 = 9,
    SNIPERRIFLE = 10
}

export enum WeaponStates {
    UNKNOWN = -1,
    NO_BULLETS = 0,
    LAST_BULLET = 1,
    MORE_BULLETS = 2,
    RELOADING = 3
}

export enum PlayerVariableTypes {
    NONE = 0,
    INT = 1,
    STRING = 2,
    FLOAT = 3
}

export enum MapIconStyle {
    LOCAL = 0,
    GLOBAL = 1,
    LOCAL_CHECKPOINT = 2,
    GLOBAL_CHECKPOINT = 3
}

export enum CameraStyles {
    CUT = 2,
    MOVE = 1
}

export enum SpectateModes {
    NORMAL = 1,
    FIXED = 2,
    SIDE = 3
}

export enum RecordTypes {
    NONE = 0,
    DRIVER = 1,
    ONFOOT = 2
}