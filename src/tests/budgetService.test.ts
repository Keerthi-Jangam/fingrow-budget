import { getUserAlerts } from "../services/alertService";
import { Alert } from "../models/alert";

jest.mock("../src/models/Alert");

describe("Alert Service", () => {
  it("should return alerts for a user", async () => {
    const mockAlerts = ["Budget exceeded!", "Savings goal close to being met!"];
    (Alert.find as jest.Mock).mockResolvedValue(mockAlerts);

    const alerts = await getUserAlerts("testUserId");

    expect(alerts).toEqual(mockAlerts);
  });

  it("should handle errors when fetching alerts", async () => {
    (Alert.find as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch alerts")
    );

    await expect(getUserAlerts("testUserId")).rejects.toThrow(
      "Failed to fetch alerts"
    );
  });
});
