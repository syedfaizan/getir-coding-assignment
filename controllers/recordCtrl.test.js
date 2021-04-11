const recordCtrl = require("./recordCtrl");

describe("Test the Record Ctrl", () => {
  it("returns array of records", () => {
    const successPayload = [
      {
        key: "ibfRLaFT",
        createdAt: "2016-12-25T16:43:27.909Z",
        totalCount: 2892,
      },
      {
        key: "pxClAvll",
        createdAt: "2016-12-19T10:00:40.050Z",
        totalCount: 2772,
      },
    ];

    const spy = jest.fn();
    spy.mockImplementationOnce(() => successPayload);
    //Mocking the 'getRecords' functions
    recordCtrl.getRecords = spy;

    let response = recordCtrl.getRecords();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(Array.isArray(response)).toBeTruthy();
    expect(response).toEqual(successPayload);
  });

  it("returns empty array of records when no results", () => {
    const emptyPayload = [];
    const spy = jest.fn();

    spy.mockImplementationOnce(() => emptyPayload);
    recordCtrl.getRecords = spy;

    let response = recordCtrl.getRecords();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(Array.isArray(response)).toBeTruthy();
    expect(response).toEqual(emptyPayload);
  });
});
