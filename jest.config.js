module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
	transformIgnorePatterns: ["<rootDir>/node_modules/"],
	reporters: ["default", "jest-stare"],
	testTimeout: 4000,
	collectCoverage: true,
	setupFiles: ["dotenv/config"],
};
