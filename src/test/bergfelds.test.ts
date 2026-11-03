import { describe, expect, it } from "vitest";
import { business, enquiryMailto, validateEnquiry } from "@/lib/bergfelds";

describe("Bergfelds enquiry rules", () => {
  const valid = { description: "VVS", name: "Testperson", company: "Testföretag", contact: "test@example.se" };
  it("addresses enquiries only to order@bergfelds.se", () => {
    expect(enquiryMailto(valid)).toMatch(/^mailto:order@bergfelds\.se\?/);
    expect(decodeURIComponent(enquiryMailto(valid))).toContain("Förfrågan: VVS");
  });
  it("requires all four enquiry fields", () => {
    for (const key of Object.keys(valid)) expect(validateEnquiry({ ...valid, [key]: " " })).not.toBeNull();
  });
  it("accepts email or phone and rejects invalid contact details", () => {
    expect(validateEnquiry(valid)).toBeNull();
    expect(validateEnquiry({ ...valid, contact: "0240-410 210" })).toBeNull();
    expect(validateEnquiry({ ...valid, contact: "invalid" })).not.toBeNull();
  });
  it("keeps the supplied phone number and directions address", () => {
    expect(business.phone).toBe("0240-410 210");
    expect(business.directions).toContain("Gatubacken+9+771+42+Ludvika");
  });
});