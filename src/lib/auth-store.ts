import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "customer" | "designer" | "contractor" | "admin";

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	avatar?: string;
	phone?: string;
	verified: boolean;
}

export const MOCK_USERS: User[] = [
	{
		id: "1",
		name: "Nguyễn Văn Anh",
		email: "anh@vertex.vn",
		role: "customer",
		phone: "0901234567",
		verified: true,
	},
	{
		id: "2",
		name: "Trần Minh Quân",
		email: "quan@vertex.vn",
		role: "designer",
		phone: "0912345678",
		verified: true,
	},
	{
		id: "3",
		name: "Lê Hoàng Dũng",
		email: "dung@vertex.vn",
		role: "contractor",
		phone: "0923456789",
		verified: true,
	},
	{
		id: "4",
		name: "Admin VERTEX",
		email: "admin@vertex.vn",
		role: "admin",
		phone: "0900000000",
		verified: true,
	},
];

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => boolean;
	loginAs: (role: UserRole) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			login: (email: string, _password: string) => {
				const user = MOCK_USERS.find((u) => u.email === email);
				if (user) {
					set({ user, isAuthenticated: true });
					return true;
				}
				const defaultUser = MOCK_USERS[0];
				set({ user: defaultUser, isAuthenticated: true });
				return true;
			},
			loginAs: (role: UserRole) => {
				const user = MOCK_USERS.find((u) => u.role === role);
				if (user) {
					set({ user, isAuthenticated: true });
				}
			},
			logout: () => set({ user: null, isAuthenticated: false }),
		}),
		{ name: "vertex-auth" },
	),
);
