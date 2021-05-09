import { Player, ProfileIcon } from "../../models/player";
import { PlayerStats } from "../../models/player-stats";

export class PlayerInfo {
    private player: Player;
    public stats: PlayerStats;

    constructor(player: Player, stats: PlayerStats) {
        this.player = player;
        this.stats = stats;
    }

    get name(): string {
        return this.player.name;
    }

    get countryCode(): string {
        return this.player.countryCode.toLowerCase();
    }

    get profileIcon(): ProfileIcon {
        return this.player.profileIcon;
    }
}