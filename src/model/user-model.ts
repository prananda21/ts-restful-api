import { User } from "@prisma/client";

/**
 * Model must be created when the request have a request body.
 * if the request does not have a body or only have request headers, the model does not need to be created
 */

export type UserResponse = {
	username: string;
	name: string;
	token?: string;
};

export type CreateUserRequest = {
	username: string;
	name: string;
	password: string;
};

export type LoginUserRequest = {
	username: string;
	password: string;
};

export type UpdateUserRequest = {
	name?: string;
	password?: string;
};

export function toUserResponse(user: User): UserResponse {
	return {
		name: user.name,
		username: user.username,
	};
}
