import { Player, ProfileIcon } from "../../models/player";
import { PlayerStats } from "../../models/player-stats";
import { War } from "../../models/war";

export class PlayerInfo {
    private player: Player;
    stats: PlayerStats;
    history: War[];

    constructor(player: Player, stats: PlayerStats, history: War[]) {
        this.player = player;
        this.stats = stats;
        this.history = history
            .filter(h => h.participants.some(p => p.player.id == player.id))
            .sort((a,b) => b.date.getTime() - a.date.getTime())
            .slice(0, 20);
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