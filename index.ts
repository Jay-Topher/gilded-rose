import { GildedRose, items } from "./src/gilded-rose";
import { logToFile, getLogText } from "./src/logText";
import repeatRequest from "./src/requests/yesNo";

const [updateCount, requestCount] = process.argv.splice(2);

if (!updateCount && !requestCount) {
  console.error(
    "Error: Please provide valid CLI arguments for update and request counts"
  );
  process.exit(1);
}

const shop = new GildedRose(items);

async function performCallsAndUpdate() {
  // initially empty log.txt
  logToFile("");
  let logText = getLogText();

  // while log.txt is empty or has some positive responses
  while (logText !== "0") {
    const newRequestTimes = Number(logText) === 0 ? requestCount : logText;
    const data = await repeatRequest(Number(newRequestTimes));
    logToFile(data.toString());
    logText = data.toString();
  }
  // update quality after all responses are negative
  shop.updateQuality();
}

const updateCountNum = Number(updateCount);
// perform calls for the amount specified
for (let i = 0; i < updateCountNum; i++) {
  performCallsAndUpdate();
}
