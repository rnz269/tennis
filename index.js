import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Helper to generate mm%2Fdd%2Fyyyy string for offset days
function getEncodedDate(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}%2F${dd}%2F${yyyy}`; // encode slashes as %2F
}

export async function fetchAvailability() {
  const results = [];
  const cookieString = [
    `PHPSESSID=${process.env.PENN_PHPSESSID}`,
    `isLoggedIn=1`,
    `__cf_bm=${process.env.PENN_CF_BM}`,
    `cf_clearance=${process.env.PENN_CF_CLEARANCE}`,
    `SessionExpirationTime=${process.env.PENN_SESSION_EXPIRATION}`,
  ].join("; ");

  for (let i = 0; i < 4; i++) {
    const dateParam = getEncodedDate(i);

    // Make the POST request for each date
    const response = await fetch(
      "https://penntennis.clubautomation.com/event/reserve-court-new?ajax=true",
      {
        method: "POST",
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-instana-l": "1,correlationType=web;correlationId=6c8393dd5b5571e2",
          "x-instana-s": "6c8393dd5b5571e2",
          "x-instana-t": "6c8393dd5b5571e2",
          "x-requested-with": "XMLHttpRequest",
          cookie: cookieString,
          Referer:
            "https://penntennis.clubautomation.com/event/reserve-court-new",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: `reservation-list-page=1&user_id=${process.env.USER_ID}&event_member_token_reserve_court=${process.env.EVENT_MEMBER_TOKEN}&current_guest_count=0&component=2&club=-1&location=-1&court=-1&host=${process.env.USER_ID}&add-new-child-to-guest_1=&add-new-child-to-guest_2=&add-new-child-to-guest_3=&add-new-child-to-guest_4=&add-new-child-to-guest_5=&add-new-child-to-guest_6=&add-new-child-to-guest_7=&add-new-child-to-guest_8=&add-new-child-to-guest_9=&add-new-child-to-guest_10=&add-new-child-to-guest_11=&add-new-child-to-guest_12=&add-new-child-to-guest_13=&add-new-child-to-guest_14=&add-new-child-to-guest_15=&date=${dateParam}&interval=60&timeFrom=1&timeTo=23&time-reserve=&location-reserve=&surface-reserve=&courtsnotavailable=&join-waitlist-case=0`,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Request failed (status: ${response.status}) for date ${dateParam}`
      );
    }

    // Convert response to text
    const text = await response.text();

    // Push result with decoded date (mm/dd/yyyy) for clarity
    results.push({
      date: decodeURIComponent(dateParam),
      data: text,
    });
  }

  return results;
}

/**
 * Your Lambda handler
 */
export const handler = async (event) => {
  try {
    // 1. Fetch results for the next 4 days
    const results = await fetchAvailability();

    // 2. Find which days DO NOT include the "no availability" string
    const daysWithAvailability = results
      .filter(
        (r) =>
          !r.data.includes("No available times based on your search criteria.")
      )
      .map((r) => decodeURIComponent(r.date)); // decode to mm/dd/yyyy

    if (daysWithAvailability.length > 0) {
      console.log("Availability found on:", daysWithAvailability.join(", "));

      // Optionally send an email with SES:
      /*
      const sesClient = new SESClient({ region: "us-east-1" });
      const emailParams = {
        Source: "YOUR_VERIFIED_FROM_EMAIL@example.com",
        Destination: {
          ToAddresses: ["rahul.nallappa@gmail.com"]
        },
        Message: {
          Subject: { Data: "Tennis Availability Alert!" },
          Body: {
            Text: {
              Data: `Hey, we found tennis availability on: ${daysWithAvailability.join(", ")}\nCheck it out here: https://penntennis.clubautomation.com/event/reserve-court-new`
            }
          }
        }
      };

      await sesClient.send(new SendEmailCommand(emailParams));
      */
    } else {
      console.log(
        "All four days show 'No available times based on your search criteria.'"
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success" }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

handler().then(() => {
  console.log("done executing");
});
