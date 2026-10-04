import { test } from "node:test";
import assert from "node:assert/strict";
import { emi } from "../lib/finance.ts";
test("reducing balance EMI for 5 lakh at 12% over 36 months", () => {
  assert.ok(Math.abs(emi(500000, 12, 36) - 16607.15) < 0.02);
});
test("zero interest and invalid inputs remain finite", () => {
  assert.equal(emi(12000, 0, 12), 1000);
  for (const value of [0, -1, NaN, Infinity])
    assert.equal(emi(value, 12, 36), 0);
  assert.equal(emi(1000, -1, 12), 0);
  assert.equal(emi(1000, 12, 0), 0);
});
