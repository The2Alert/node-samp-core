import {Actor, BulletHitTypes, ClickSources, DialogResponse, EditObjectResponse, Pickup, Player, PlayerDisconnectReasons, PlayerStates, PlayerTextDraw, Position, Rcon, SampObject, SelectObjectTypes, TextDraw, Vehicle, Weapons} from "../..";

export interface ContextEvents {
    onInit(): any;
    onExit(): any;
    onActorStreamIn(actor: Actor, forPlayer: Player): any;
    onActorStreamOut(actor: Actor, forPlayer: Player): any;
    onObjectMoved(object: SampObject): any;
    onPlayerConnect(player: Player): any;
    onPlayerDisconnect(player: Player, reason: PlayerDisconnectReasons): any;
    onPlayerSpawn(player: Player): any;
    onPlayerDeath(player: Player, killer: Player, reason: Weapons): any;
    onPlayerText(player: Player, text: string): any;
    onPlayerCommandText(player: Player, cmdText: string): any;
    onPlayerRequestClass(player: Player, classId: number): any;
    onPlayerEnterVehicle(player: Player, vehicle: Vehicle, isPassenger: boolean): any;
    onPlayerExitVehicle(player: Player, vehicle: Vehicle): any;
    onPlayerStateChange(player: Player, newState: PlayerStates, oldState: PlayerStates): any;
    onPlayerEnterCheckpoint(player: Player): any;
    onPlayerLeaveCheckpoint(player: Player): any;
    onPlayerEnterRaceCheckpoint(player: Player): any;
    onPlayerLeaveRaceCheckpoint(player: Player): any;
    onPlayerRequestSpawn(player: Player): any;
    onPlayerObjectMoved(player: Player, object: SampObject): any;
    onPlayerPickUpPickup(player: Player, pickup: Pickup): any;
    onEnterExitModShop(player: Player, entered: boolean, interior: number): any;
    onPlayerSelectedMenuRow(player: Player, row: number): any;
    onPlayerExitedMenu(player: Player): any;
    onPlayerInteriorChange(player: Player, newInterior: number, oldInterior: number): any;
    onPlayerKeyStateChange(player: Player, newKeys: number, oldKeys: number): any;
    onPlayerUpdate(player: Player): any;
    onPlayerStreamIn(player: Player, forPlayer: Player): any;
    onPlayerStreamOut(player: Player, forPlayer: Player): any;
    onDialogResponse(player: Player, response: DialogResponse): any;
    onPlayerTakeDamage(player: Player, issuer: Player, amount: number, weapon: Weapons, bodyPart: number): any;
    onPlayerGiveDamage(player: Player, damaged: Player, amount: number, weapon: Weapons, bodyPart: number): any;
    onPlayerGiveDamageActor(player: Player, damaged: Actor, amount: number, weapon: Weapons, bodyPart: number): any;
    onPlayerClickMap(player: Player, pos: Position): any;
    onPlayerClickTextDraw(player: Player, clicked: TextDraw): any;
    onPlayerClickPlayerTextDraw(player: Player, clicked: PlayerTextDraw): any;
    onIncomingConnection(player: Player, ip: string, port: number): any;
    onTrailerUpdate(player: Player, vehicle: Vehicle): any;
    onPlayerClickPlayer(player: Player, clicked: Player, source: ClickSources): any;
    onPlayerEditObject(player: Player, isPlayerObject: boolean, object: SampObject, response: EditObjectResponse, offset: Position, rot: Position): any;
    onPlayerEditAttachedObject(player: Player, response: boolean, index: number, model: number, bone: number, offset: Position, rot: Position, scale: Position): any;
    onPlayerSelectObject(player: Player, type: SelectObjectTypes, object: SampObject, model: number, pos: Position): any;
    onPlayerWeaponShot(player: Player, weapon: Weapons, hitType: BulletHitTypes, hitId: number, coord: Position): any;
    onRconCommand(rcon: Rcon, cmd: string): any;
    onRconLoginAttempt(rcon: Rcon, ip: string, password: string, success: boolean): any;
    onVehicleSpawn(vehicle: Vehicle): any;
    onVehicleDeath(vehicle: Vehicle, killer: Player): any;
    onVehicleMod(player: Player, vehicle: Vehicle, component: number): any;
    onVehiclePaintjob(player: Player, vehicle: Vehicle, paintjob: number): any;
    onVehicleRespray(player: Player, vehicle: Vehicle, colors: [number, number]): any;
    onVehicleDamageStatusUpdate(vehicle: Vehicle, player: Player): any;
    onUnoccupiedVehicleUpdate(vehicle: Vehicle, player: Player, passengerSeat: number, newPos: Position, velocityPos: Position): any;
    onVehicleStreamIn(vehicle: Vehicle, forPlayer: Player): any;
    onVehicleStreamOut(vehicle: Vehicle, forPlayer: Player): any;
    onVehicleSirenStateChange(player: Player, vehicle: Vehicle, state: boolean): any;
}