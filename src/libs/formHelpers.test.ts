import { placeholder, step } from "./formHelpers"

test("placeholder", () => {
  expect(placeholder("uusd")).toBe("0.00")
  expect(placeholder("hAsset")).toBe("0.000000")
})

test("step", () => {
  expect(step("uusd")).toBe("0.01")
  expect(step("hAsset")).toBe("0.000001")
})
