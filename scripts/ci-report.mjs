import axios from "axios";
import { readFileSync } from "fs";
import moment from "moment";

function msToMinSec(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}

const pipelineUrl = process.env["PIPELINE_URL"] || "";
const webhookUrl = process.env["GCHAT_WEBHOOK_URL"] || "";
const inputFile = process.argv[2];
const report = readFileSync(inputFile, "utf8");
const reportJson = JSON.parse(report);

const stats = reportJson["stats"];
const startTime = stats["startTime"];
const duration = stats["duration"];
const expected = stats["expected"];
const skipped = stats["skipped"];
const unexpected = stats["unexpected"];
const flaky = stats["flaky"];
const total = expected + skipped + unexpected + flaky;

const workers = reportJson["config"]["metadata"]["actualWorkers"];
const formattedDuration = msToMinSec(duration);
const formattedStartTime = moment(startTime).format("MMMM Do YYYY, h:mm:ss a");

const card = {
  cardsV2: [
    {
      cardId: "playwright-report",
      card: {
        header: {
          title: "Playwright E2E",
          subtitle: `<b>Total</b>: ${total} tests • <b>Workers</b>: ${workers} • <b>Duration</b>: ${formattedDuration} • <b>Started at</b>: ${formattedStartTime}`,
        },
        sections: [
          {
            widgets: [
              {
                columns: {
                  columnItems: [
                    {
                      horizontalSizeStyle: "FILL_AVAILABLE_SPACE",
                      widgets: [
                        { decoratedText: { text: `✅ <b>Passed</b>: ${expected}` } },
                        { decoratedText: { text: `❌ <b>Failed</b>: ${unexpected}` } },
                      ],
                    },
                    {
                      horizontalSizeStyle: "FILL_AVAILABLE_SPACE",
                      widgets: [
                        { decoratedText: { text: `⟳ <b>Flaky</b>: ${flaky}` } },
                        { decoratedText: { text: `⏭ <b>Skipped</b>: ${skipped}` } },
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            widgets: [
              {
                buttonList: {
                  buttons: [
                    {
                      text: "Open Pipeline",
                      onClick: { openLink: { url: pipelineUrl } },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
};

// send payload to Google Chat
axios.post(webhookUrl, card);
