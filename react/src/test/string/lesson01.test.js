// import { getStr } from "./lesson01";

import getStr from "../../common/js/code/string/lesson1";

test("revertByWorld:Let's take LeetCode contest", () => {
  expect(getStr("Let's take LeetCode contest")).toBe(
    "s'teL ekat edoCteeL tsetnoc"
  );
});
