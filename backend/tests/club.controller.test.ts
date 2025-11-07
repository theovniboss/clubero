import {
	describe,
	it,
	expect,
	mock,
	beforeEach,
	afterEach,
	spyOn,
} from "bun:test";
import type { Request, Response } from "express";
import controller from "../controllers/club.controller";

// We will mock user.utils and club.service to isolate controller logic
import * as userUtilsModule from "../utils/user.utils";
import clubService from "../services/club.service";

// Helper to create mock Response
function createMockRes() {
	const res: Partial<Response> & { statusCode?: number; jsonData?: any } = {};
	res.status = mock((code: number) => {
		res.statusCode = code;
		return res as Response;
	}) as any;
	res.json = mock((data?: any) => {
		res.jsonData = data;
		return res as Response;
	}) as any;
	return res as Response & { statusCode?: number; jsonData?: any };
}

describe("club.controller", () => {
	let getUserIdSpy: any;
	let svcSpies: any;

	beforeEach(() => {
		getUserIdSpy = spyOn(
			(userUtilsModule as any).default,
			"getUserId"
		).mockReturnValue("user-123");

		svcSpies = {
			getAllClubs: spyOn(
				clubService as any,
				"getAllClubs"
			).mockResolvedValue([{ id: 1 }]),
			getClubs: spyOn(clubService as any, "getClubs").mockResolvedValue([
				{ id: 2, createdBy: "user-123" },
			]),
			getClub: spyOn(clubService as any, "getClub").mockResolvedValue({
				id: 1,
			}),
			createClub: spyOn(
				clubService as any,
				"createClub"
			).mockImplementation(async (club: any) => ({ id: 10, ...club })),
			updateClub: spyOn(
				clubService as any,
				"updateClub"
			).mockImplementation(async (id: number, club: any) => ({
				id,
				...club,
			})),
			deleteClub: spyOn(
				clubService as any,
				"deleteClub"
			).mockImplementation(async (id: number, createdBy: string) => ({
				id,
				deletedBy: createdBy,
			})),
		};
	});

	afterEach(() => {
		getUserIdSpy.mockRestore();
		Object.values(svcSpies).forEach((s: any) => s.mockRestore());
	});

	it("Should return 200 with all clubs", async () => {
		const req = {} as Request;
		const res = createMockRes();

		await (controller as any).getAllClubs(req, res);

		expect(res.statusCode).toBe(200);
		expect(res.jsonData).toEqual([{ id: 1 }]);
	});

	it("Should return 404 when getClubs has no results", async () => {
		const req = {
			headers: { authorization: "Bearer token" },
		} as unknown as Request;
		const res = createMockRes();

		getUserIdSpy.mockReturnValue("user-abc");
		svcSpies.getClubs.mockResolvedValueOnce([] as any);

		await (controller as any).getClubs(req, res);

		expect(getUserIdSpy).toHaveBeenCalled();
		expect(svcSpies.getClubs).toHaveBeenCalledWith("user-abc");
		expect(res.statusCode).toBe(404);
		expect(res.jsonData).toBeUndefined();
	});

	it("Should return 400 for getClub when id is NaN", async () => {
		const req = { params: { id: "abc" } } as unknown as Request;
		const res = createMockRes();

		await (controller as any).getClub(req, res);

		expect(res.statusCode).toBe(400);
	});

	it("Should return 404 when getClub not found", async () => {
		const req = { params: { id: "5" } } as unknown as Request;
		const res = createMockRes();

		svcSpies.getClub.mockResolvedValueOnce(null as any);

		await (controller as any).getClub(req, res);

		expect(res.statusCode).toBe(404);
	});

	it("Should create club with createdBy from user and return 200", async () => {
		const req = {
			body: { name: "Club X" },
			headers: { authorization: "Bearer token" },
		} as unknown as Request;
		const res = createMockRes();

		getUserIdSpy.mockReturnValue("user-999");

		await (controller as any).createClub(req, res);

		expect(getUserIdSpy).toHaveBeenCalled();
		expect(svcSpies.createClub).toHaveBeenCalledWith({
			name: "Club X",
			createdBy: "user-999",
		});
		expect(res.statusCode).toBe(200);
		expect(res.jsonData).toMatchObject({
			id: 10,
			name: "Club X",
			createdBy: "user-999",
		});
	});

	it("Should update club and set updatedBy from user", async () => {
		const req = {
			params: { id: "7" },
			body: { name: "Updated" },
			headers: { authorization: "Bearer token" },
		} as unknown as Request;
		const res = createMockRes();

		getUserIdSpy.mockReturnValue("user-upd");

		await (controller as any).updateClub(req, res);

		expect(svcSpies.updateClub).toHaveBeenCalledWith(7, {
			name: "Updated",
			updatedBy: "user-upd",
		});
		expect(res.statusCode).toBe(200);
	});

	it("Should return 400 for updateClub when id is NaN", async () => {
		const req = { params: { id: "nan" }, body: {} } as unknown as Request;
		const res = createMockRes();

		await (controller as any).updateClub(req, res);

		expect(res.statusCode).toBe(400);
	});

	it("Should delete club with createdBy from user", async () => {
		const req = {
			params: { id: "11" },
			headers: { authorization: "Bearer token" },
		} as unknown as Request;
		const res = createMockRes();

		getUserIdSpy.mockReturnValue("user-del");

		await (controller as any).deleteClub(req, res);

		expect(svcSpies.deleteClub).toHaveBeenCalledWith(11, "user-del");
		expect(res.statusCode).toBe(200);
	});

	it("Should return 400 for deleteClub when id is NaN", async () => {
		const req = { params: { id: "oops" } } as unknown as Request;
		const res = createMockRes();

		await (controller as any).deleteClub(req, res);

		expect(res.statusCode).toBe(400);
	});
});
