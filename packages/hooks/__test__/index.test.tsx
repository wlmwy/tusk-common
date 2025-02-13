import { describe, expect, it } from "vitest";
import { useEventListener } from "..";

describe("hooks/index", () => {
  it("useEventListener should be exported", () => {
    expect(useEventListener).toBeDefined();
  });
  // it('useClickOutside should be exported',()=>{
  //   expect(useClickOutside).toBeDefined()
  // })
});
