import { Schema, model } from "mongoose";

const GameSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Game = model("Game", GameSchema);

export default Game;
