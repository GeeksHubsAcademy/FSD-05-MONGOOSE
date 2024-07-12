import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
	{
		message: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
      path: 'User',
			required: true,
		}
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Comment = model("Comment", CommentSchema);

export default Comment;
