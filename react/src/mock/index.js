import Mork from "mockjs";

import { test } from "./test";

Mork.mock(/\/home\/list/, test);

export default Mork;
