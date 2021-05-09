import { ProfileIcon } from "../../models/player";

export class PlayerListModel {
    /**
     *
     */
    constructor(
        public id: number,
        public countryCode: string,
        public name: string,
        public wins: number,
        public loses: number,
        public winrate: number,
        public winStreak: number,
        public icon: ProfileIcon) {
        this.countryCode = countryCode.toLocaleLowerCase();
    }
}
